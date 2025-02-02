import React from "react";

//TODO tidy, document
interface PatientVisitSearchResultsProps {
  searchResults: any[];//TODO better type
}

const PatientVisitSearchResults: React.FC<PatientVisitSearchResultsProps> = ({ searchResults }) => {

  //No events to handle

  return (
    <div>
      <h1>Search Results</h1>

      {searchResults.length ? (
        <table border={1}>
          <thead>
            {/* NB a more advanced implementation could support ascending/descending sorting options in the table headers , and pagination */}
            <tr>
              <th>Date</th>
              <th>Patient</th>
              <th>Hospital</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>

            {searchResults.map((searchResult) => (
              <tr key={searchResult.visitId}>
                {/* NB already sorted into date descending order for usability - user is likely to be more interested in more recent visits */}
                <td>{searchResult.visitDateString}</td>
                {/* Concatenate the full patient name - easier on the user */}
                <td>{searchResult.patientFirstName} {searchResult.patientLastName}</td>
                <td>{searchResult.hospitalName}</td>
                {/* NB a more advanced implementation would show full details of the visit, the patient's email address, etc. */}
                <td><a href="#" onClick={() => alert('Not yet implemented')}>details</a></td>
              </tr>
            ))}
          </tbody>

        </table>

      ) : "No results found.  Please check your search criteria and try again."}
    </div>
  );
};

export default PatientVisitSearchResults;
