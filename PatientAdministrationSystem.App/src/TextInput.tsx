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
          <tr>
            <td>Last Name:</td>
            <td>
              <input
                id="lastName"
                type="text"
                placeholder='e.g. Smith'
                // value={lastName}
                // onChange={handleLastNameChange}
              />
            </td>
          </tr>
          <tr>
            <td>Hospital:</td>
            <td>
              {/* //TODO change to a drop-down that is populated at form load?  Include an entry of "any hospital", make sure they're sorted alphabetically, type-ahead might be nice, might be nice to keep the selection from last time */}
              <input
                id="hospital"
                type="text"
                placeholder='e.g. Smith'
                // value={lastName}
                // onChange={handleLastNameChange}
              />
            </td>

            {/* //TODO could add date range for visit */}

            {/* //TODO links to the hospital home page, patient home page, visit home page... */}
          </tr>
        </tbody>
      </table>
      <br />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default TextInput;
