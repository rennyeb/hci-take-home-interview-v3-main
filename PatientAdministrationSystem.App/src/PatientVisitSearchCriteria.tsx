import React, { useState } from "react";


//TODO tidy, document
interface PatientVisitSearchCriteriaProps {
  onFirstNamePrefixChange: (value: string) => void;
  onLastNamePrefixChange: (value: string) => void;
  onHospitalOptionChange: (value: any) => void;//TODO use option type
  onButtonClick: () => void;
  hospitalOptions: any[];//TODO better type
}


const PatientVisitSearchCriteria: React.FC<PatientVisitSearchCriteriaProps> = ({ onFirstNamePrefixChange, onLastNamePrefixChange, onHospitalOptionChange, onButtonClick, hospitalOptions }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [selected, setSelected] = useState(hospitalOptions[0]);

  const handleFirstNamePrefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFirstName(newValue);
    onFirstNamePrefixChange(newValue); // Send input value to parent component
  };

  const handleLastNamePrefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLastName(newValue);
    onLastNamePrefixChange(newValue); // Send input value to parent component
  };

  const handleHistoryOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelected(newValue);
    onHospitalOptionChange(newValue); // Send input value to parent component
  }

  const handleClick = () => {
    onButtonClick();
  }

  console.log("hospitalOptions " + JSON.stringify(hospitalOptions));

  return (
    <div>
      {/* //NB could set the surname as the default field for focus */}

      {/* //TODO not working */}
      {/* <form> */}
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
                value={lastName}
                onChange={handleLastNamePrefixChange}
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


              <select id="hospital" value={selected} onChange={handleHistoryOptionChange}>

                {/* dynamically add an option for each hospital */}
                {/* NB type-ahead might be nice, might be nice to keep the selection from last time */}
                {hospitalOptions.map((hospitalOption, index) => (
                  <option key={index} value={hospitalOption.hospitalId}>
                    {hospitalOption.name}
                  </option>
                ))}

              </select>
            </td>

            {/* NB could add date range to further filter down the visits, or something like "in the last week"/"in the last month"... */}

            {/* NB could have hyperlinks to the hospital details, patient details, visit details... */}
          </tr>
        </tbody>
      </table>
      <br />
      <button onClick={handleClick} type="submit">Search</button>
      {/* </form> */}
    </div>
  );
};

export default PatientVisitSearchCriteria;
