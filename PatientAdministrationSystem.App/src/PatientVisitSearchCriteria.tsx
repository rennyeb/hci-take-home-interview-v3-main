import HospitalResponse from "./types/HospitalResponse";
import React, { useState } from "react";

interface PatientVisitSearchCriteriaProps {
  onFirstNamePrefixChange: (value: string) => void;
  onLastNamePrefixChange: (value: string) => void;
  onHospitalSelectedOptionChange: (value: HospitalResponse) => void;
  onSearchButtonClick: () => void;
  hospitalOptions: HospitalResponse[];
}

const PatientVisitSearchCriteria: React.FC<PatientVisitSearchCriteriaProps> = ({ onFirstNamePrefixChange, onLastNamePrefixChange, onHospitalSelectedOptionChange, onSearchButtonClick, hospitalOptions }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [selectedHospital, setSelectedHospital] = useState<HospitalResponse>(hospitalOptions[0]);

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

  const handleHistorySelectedOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue: HospitalResponse = JSON.parse(event.target.value);
    setSelectedHospital(newValue);//TODO is local state actually required?
    onHospitalSelectedOptionChange(newValue); // Send input value to parent component
  }

  const handleSearchButtonClick = () => {
    onSearchButtonClick();
  }

  return (
    <div>

      <form>
        <table>
          <tbody>
            <tr>
              {/* NB could include client-side validation if this value not populated, highlight the field in red, etc.
            
            For now, leaving to the server to validate and return an error message. */}
              <td>Last Name prefix *:</td>

              {/* //NB set the last name as the default field for focus */}
              <td>
                <input
                  id="lastNamePrefix"
                  type="text"
                  placeholder='e.g. Smith or Smi'
                  value={lastName}
                  onChange={handleLastNamePrefixChange}
                  autoFocus
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


                <select id="hospital" value={JSON.stringify(selectedHospital)} onChange={handleHistorySelectedOptionChange} style={{ width: "100%" }}>

                  {/* dynamically add an option for each hospital */}
                  {/* NB type-ahead might be nice, might be nice to keep the selection from last time */}
                  {hospitalOptions.map((hospitalOption, index) => (
                    <option key={index} value={JSON.stringify(hospitalOption)}>
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
        <button onClick={handleSearchButtonClick} type="submit">Search</button>
      </form>

      {/* NB could have a "clear" button which resets the form back to how it was at page load time */}

    </div>
  );
};

export default PatientVisitSearchCriteria;
