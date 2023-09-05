import React, { useState, ChangeEvent } from 'react';

export type InputProps = {
  type: 'text' | 'number' | 'password',
  name: string,
  label: string,
  initialValue: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  containerStyle?: string,
  placeholder?: string,
}

function Input({ initialValue, type, onChange, name, label, containerStyle, placeholder }: InputProps) {
  const [value, setValue] = useState<string>(initialValue);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
  }

  return (
    <label className={"flex flex-col " + containerStyle}>
      {label}
      <input
        value={value}
        placeholder={placeholder}
        onChange={onValueChange}
        type={type}
        name={name}
        autoComplete='off'
        className="h-10 bg-white
          border border-skyBase rounded px-2.5
          focus:border-skyDark focus:border focus:ring-0 focus:outline-none"
      />
    </label>
  );
}

export default Input;
