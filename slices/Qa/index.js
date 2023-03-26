import React, { useState, useEffect } from 'react';
import { PrismicRichText } from '@prismicio/react';

/**
 * @typedef {import("@prismicio/client").Content.QaSlice} QaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<QaSlice>} QaProps
 * @param { QaProps }
 */
const Field = ({ label, children }) => {
  return (
    <label>
      <span className="text-sm text-slate-500">{label}</span>
      {children}
    </label>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}) => {
  return (
    <Field label={label}>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-none border-b border-slate-200 py-3 pr-7 pl-3 text-slate-800 placeholder-slate-400"
      />
    </Field>
  );
};
const getApiResult = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('answers from movieGPT(under construction)');
    }, 1000);
  });
};

const Qa = ({ slice }) => {
  const [inputValue, setInputValue] = useState('');
  const [apiResult, setApiResult] = useState(null);

  useEffect(() => {
    getApiResult().then((result) => {
      setApiResult(result);
    });
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

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
      <Field label="API Result:">
        <p className="text-slate-800">{apiResult}</p>
      </Field>
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