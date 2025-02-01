import React, { useState } from "react";


//TODO rename
//TODO tidy, document
interface TextInputProps {
  onInputChange: (value: string) => void;
  onButtonClick: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ onInputChange , onButtonClick}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onInputChange(newValue); // Send input value to parent component
  };

  const handleClick = () => {
    // alert(inputValue)
    onButtonClick();

  }

  return (
    <div>
      <label htmlFor="text-input">Enter Text: </label>
      <input
        id="text-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />

      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default TextInput;
