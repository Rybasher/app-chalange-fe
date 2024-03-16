import React, { ChangeEvent } from 'react';

interface CustomInputProps {
  type: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required: boolean;
  name: string;
  minLength?: number;
}
const inputClases = 'focus:outline-none mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-sky-400 focus:ring-sky-400 focus:border-sky-400 block w-full p-2.5 bg-gray-700 dark:bg-gray-700 border-gray-600 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400 text-white dark:text-white focus:ring-sky-400dark:focus:ring-sky-400 dark:focus:border-sky-400'
const CustomInput: React.FC<CustomInputProps> = ({ type, value, onChange, placeholder, required, name, minLength }) => {
  return (

    <input
      name={name}
      className={inputClases}
      required={required}
      type={type}
      value={value}
      onChange={onChange}
      minLength={minLength}
      placeholder={placeholder}
    />

  );
};

export default CustomInput;