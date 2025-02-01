import React, { useState } from "react";


//TODO rename
//TODO tidy, document
interface TextInputProps {
  onFirstNameChange: (value: string) => void;
  onButtonClick: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ onFirstNameChange, onButtonClick }) => {
  const [firstName, setFirstName] = useState<string>("");

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFirstName(newValue);
    onFirstNameChange(newValue); // Send input value to parent component
  };

  const handleClick = () => {
    // alert(inputValue)
    onButtonClick();

  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>First Name:</td>
            <td>
              <input
                id="firstName"
                type="text"
                placeholder='e.g. John'
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default TextInput;
