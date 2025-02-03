import './App.css'

import hospitalsService from "./services/hospitalsService";
import patientsService from "./services/patientsService";
import patientSearchService from "./services/patientSearchService";
import visitsService from "./services/visitsService";

import PatientVisitSearchCriteria from "./PatientVisitSearchCriteria"
import PatientVisitSearchResults from "./PatientVisitSearchResults"
import HospitalResponse from "./types/HospitalResponse";
import PatientHospitalVisitsRequest from "./types/PatientHospitalVisitsRequest";
import PatientHospitalVisitResponse from "./types/PatientHospitalVisitResponse";
import PatientHospitalVisitSearchResult from "./types/PatientHospitalVisitSearchResult"
import { useState } from 'react';

function App() {

  const anyHospitalOption: HospitalResponse = {
    name: "(Any hospital)"
    //NB no hospitalId
  }

  const [error, setError] = useState<string>("");
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const [firstNamePrefix, setFirstNamePrefix] = useState<string>("");
  const [lastNamePrefix, setLastNamePrefix] = useState<string>("");

  const [searchResults, setSearchResults] = useState<PatientHospitalVisitSearchResult[]>([]);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [hospitalOptions, setHospitalOptions] = useState<HospitalResponse[]>([]);
  const [hospitalSelectedOption, setHospitalSelectedOption] = useState<HospitalResponse>();

  const handleFirstNamePrefixChange = (value: string) => {
    setFirstNamePrefix(value); // Update state with value from child component
  }

  const handleLastNamePrefixChange = (value: string) => {
    setLastNamePrefix(value); // Update state with value from child component
  }

  const handleHospitalSelecteOptionChange = (value: HospitalResponse) => {
    setHospitalSelectedOption(value); // Update state with value from child component
  }

  onload = () => {

    //Retrieve the hospitals once at page load time
    (async () => {

      try {

        const hospitalResponses = await hospitalsService.getHospitals();

        //prepend the actual hospitals with a wildcard option
        hospitalResponses.unshift(anyHospitalOption);

        //default to the "Any hospital" option
        setHospitalSelectedOption(anyHospitalOption)

        setHospitalOptions(hospitalResponses);

      } catch (err) {
        console.log(err);
        setError("Error retrieving hospitals")
      }


    })();

  }


  const handleSearchButtonClick = () => {

    (async () => {

      setLoading(true)
      setError("")
      setSearchExecuted(false)
      setSearchResults([])


      //NB could accept a date/time range, server would need to validate that end isn't before start - and could validate in the app as well
      try {

        const patientHospitalVisitsRequest: PatientHospitalVisitsRequest = {
          PatientFirstNamePrefix: normalise(firstNamePrefix),
          PatientLastNamePrefix: normalise(lastNamePrefix),
          HospitalId: hospitalSelectedOption?.id
        }

        const patientHospitalVisitsResponses: PatientHospitalVisitResponse[] = await patientSearchService.getPatientHospitalVisits(patientHospitalVisitsRequest);

        //look up the data for each entry in the response
        const patientHospitalVisitSearchResults: PatientHospitalVisitSearchResult[] = [];

        /**
         * Note that there is a series of API calls below (to get display text for details of each visit) - 
         * a more sophisticated implementation could perform these queries in parallel, or get all these 
         * details along with the visits above by using something like GraphQL.
         */
        for (const patientHospitalVisitResponse of patientHospitalVisitsResponses) {

          //look up the hospital name
          var hospitalName: string;

          const hospitalResponse = await hospitalsService.getHospital(patientHospitalVisitResponse.hospitalId);
          if (hospitalResponse) {
            hospitalName = hospitalResponse.name;
          } else {
            hospitalName = "(Not found)"//be resilient to data integrity issues
          }

          //look up the patient name
          var patientFirstName: string;
          var patientLastName: string;
          const patientResponse = await patientsService.getPatient(patientHospitalVisitResponse.patientId);
          if (patientResponse) {

            patientFirstName = patientResponse.firstName;
            patientLastName = patientResponse.lastName;

          } else {
            patientFirstName = "(Not found)"//be resilient to data integrity issues
            patientLastName = "";
          }

          //look up the visit date
          var visitDate: Date;
          var visitDateString: string;
          const visitResponse = await visitsService.getVisit(patientHospitalVisitResponse.visitId);
          if (visitResponse) {
            visitDate = new Date(visitResponse.date)

            //Format the date nicely
            //NB should get the appropriate locale from the browser
            visitDateString = visitDate.toLocaleDateString("en-IE", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            });

          } else {
            visitDate = new Date(0);//low date value, to permit sorting against other populated dates
            visitDateString = "(Unknown)" //be resilient to data integrity issues
          }

          const patientHospitalVisitSearchResult: PatientHospitalVisitSearchResult = {
            visitId: patientHospitalVisitResponse.visitId,
            patientFirstName: patientFirstName,
            patientLastName: patientLastName,
            hospitalName: hospitalName,
            visitDateString: visitDateString,
            visitDate: visitDate
          };
          patientHospitalVisitSearchResults.push(patientHospitalVisitSearchResult);

        }

        //sort the rows by date descending
        patientHospitalVisitSearchResults.sort((a, b) => b.visitDate.getTime() - a.visitDate.getTime())


        setSearchResults(patientHospitalVisitSearchResults)
        setSearchExecuted(true)

      } catch (err) {

        if (err instanceof Error && 'apiMessage' in err) {
          setError((err as any).apiMessage)
        } else {
          //rethrow any other type of error
          console.log(err);
          throw err;
        }

      }

      //TODO enable/disable the button, as well
      setLoading(false)

    })();

  }

  //NB this should really be put in a component - patient visit search - rather than at the top level of the App
  //Leaving it here for simplicity for the sake of the coding exercise
  return (
    <div>
      <img src="./hci-main-logo.svg" alt="HCI logo" />

      <div>
        <h1>Patient Visit Search</h1>
        <PatientVisitSearchCriteria
          onFirstNamePrefixChange={handleFirstNamePrefixChange}
          onLastNamePrefixChange={handleLastNamePrefixChange}
          onHospitalSelectedOptionChange={handleHospitalSelecteOptionChange}
          hospitalOptions={hospitalOptions}
          onSearchButtonClick={handleSearchButtonClick} />

        {/* NB should use CSS styling for the colour */}
        <p style={{ color: 'red' }}>{error} </p>
        {isLoading ? <p>loading...</p> : <p />}
        {/* only show search results if a search has been performed */}
        {searchExecuted && (
          <PatientVisitSearchResults searchResults={searchResults} />
        )}

      </div>
    </div>
  )
}

const normalise = (input: string): string | undefined => {
  if (!input) {
    return undefined;
  } else {
    input = input.trim();
    return input.length === 0 ? undefined : input;
  }
}

export default App
