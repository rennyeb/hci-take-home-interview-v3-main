import React, { useState } from "react";


//TODO rename
//TODO tidy, document
interface TextInputProps {
  onFirstNamePrefixChange: (value: string) => void;
  onButtonClick: () => void;
  hospitalOptions: string[];//TODO better type
}

const TextInput: React.FC<TextInputProps> = ({ onFirstNamePrefixChange, onButtonClick, hospitalOptions }) => {
  const [firstName, setFirstName] = useState<string>("");

  const handleFirstNamePrefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFirstName(newValue);
    onFirstNamePrefixChange(newValue); // Send input value to parent component
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
            {/* //TODO complain client side if this value not populated */}
            <td>Last Name prefix *:</td>
            <td>
              <input
                id="lastNamePrefix"
                type="text"
                placeholder='e.g. Smith or Smi'
              // value={lastName}
              // onChange={handleLastNamePrefixChange}
              />
            </td>
          </tr>
          <tr>
            <td>First Name prefix:</td>
            <td>
              <input
                id="firstNamePrefix"
                type="text"
                placeholder='e.g. John or Jo'
                value={firstName}
                onChange={handleFirstNamePrefixChange}
              />
            </td>
          </tr>

          <tr>
            <td>Hospital:</td>
            <td>


              {/* //TODO populate from state */}
              <select id="hospital">
                <option value="*">(Any hospital)</option>
                <option value="St. Mary's">St. Mary's</option>
              </select>

              {/* //TODO change to a drop-down that is populated at form load?  Include an entry of "any hospital", make sure they're sorted alphabetically, type-ahead might be nice, might be nice to keep the selection from last time */}
              {/* <input
                id="hospital"
                type="text"
                placeholder='e.g. Smith'
              // value={lastName}
              // onChange={handleLastNameChange}
              /> */}
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
