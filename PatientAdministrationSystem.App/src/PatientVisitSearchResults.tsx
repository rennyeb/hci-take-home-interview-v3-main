import React, { useState } from "react";



//TODO tidy, document
interface PatientVisitSearchResultsProps {
  searchResults: any[];//TODO better type
}


//TODO rename
const PatientVisitSearchResults: React.FC<PatientVisitSearchResultsProps> = ({ searchResults }) => {

  
  //TODO is state not required?
  const [theSearchResults, setSearchResults] = useState(searchResults);

  //No events to handle

  return (
    <div>
      hi
    </div>
  );
};

export default PatientVisitSearchResults;
