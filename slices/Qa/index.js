import React, { useState, useEffect } from 'react';
import { PrismicRichText } from '@prismicio/react';

/**
 * @typedef {import("@prismicio/client").Content.QaSlice} QaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<QaSlice>} QaProps
 * @param { QaProps }
 */
const Field = ({ label, children }) => {
  return (
    <div className="flex flex-col items-start mb-4">
      <span className="text-sm text-slate-500 mb-1">{label}</span>
      <div className="bg-gray-200 px-4 py-2 rounded-lg shadow-sm">
        <div className="text-sm text-gray-800">{children}</div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  onChange,
  value,
}) => {
  return (
    <Field label={label}>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-none border-b border-slate-100 py-3 pr-7 pl-3 text-slate-500 placeholder-slate-600"
        onChange={onChange}
        value={value}
      />
    </Field>
  );
};





//add a function to call the api with the text from the input field as the question for the api.



const Qa = ({ slice }) => {
  const [inputValue, setInputValue] = useState('');
  const [movieName, setMovieName] = useState('');
  const [posterUrl, setPosterUrl] = useState(null);
  const [apiResult, setApiResult] = useState('');

  const handleInputChange = (e) => {

    setInputValue(e.target.value);
  };

  const handleClick = async () => {
    try {
      console.log(inputValue)
      //call the api with the input value using a post request
      const response = await fetch('https://bc5c-2001-4479-8203-9c00-68bf-3a10-2b4f-bb03.ngrok-free.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_question: inputValue }),
      });
      const data = await response.json();
      console.log(data)
      setApiResult(data.answer);
      setMovieName(data.movie_name)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (movieName) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=deb3b2c6baa50e563eebd48f6a6b8f16&query=${movieName}`)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            setPosterUrl(`https://image.tmdb.org/t/p/w500/${data.results[0].poster_path}`);
          }
        })
        .catch(error => console.log(error));
    }
  }, [movieName]);

  return (
    <section>
      <span>{slice.primary.questions}</span>

      <InputField
        label="question"
        name="question"
        placeholder="Can you recommend me a movie about human fight aliens"
        onChange={handleInputChange}
      />
      <Field label="You asked:">
        <p className="text-slate-800">{inputValue}</p>
      </Field>
      <Field label="Answers:">
        <p className="text-slate-800">{apiResult}</p>
      </Field>
      {posterUrl && (
        <div className="w-40 h-60 mb-4 mx-auto">
          <img src={posterUrl} alt="Movie poster" className="w-full h-full object-contain" />
        </div>
      )}
      <button
        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Ask MovieGPT
      </button>


      <style jsx>{`
    section {
      max-width: 600px;
      margin: 4em auto;
      text-align: center;
    }
    .title {
      color: #8592e0;
    }
  `}</style>
    </section>
  );
};



export default Qa;