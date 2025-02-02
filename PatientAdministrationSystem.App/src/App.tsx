import './App.css'

import { AxiosResponse } from 'axios';
import apiClient from "./api/apiClient";

import hospitalsService from "./services/hospitalsService";
import patientsService from "./services/patientsService";
import patientSearchService from "./services/patientSearchService";
import visitsService from "./services/visitsService";

import PatientVisitSearchCriteria from "./PatientVisitSearchCriteria"
import PatientVisitSearchResults from "./PatientVisitSearchResults"
import HospitalResponse from "./types/HospitalResponse";
import PatientResponse from "./types/PatientResponse";
import VisitResponse from "./types/VisitResponse";
import PatientHospitalVisitsRequest from "./types/PatientHospitalVisitsRequest";
import PatientHospitalVisitResponse from "./types/PatientHospitalVisitResponse";
import { useState } from 'react';

//TODO remove anything unused

function App() {

  const anyHospitalOption: HospitalResponse = {
    name: "(Any hospital)"
    //NB no hospitalId
  }

  const [error, setError] = useState<string>("");
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const [firstNamePrefix, setFirstNamePrefix] = useState<string>("");
  //temp TODO revert
  // const [lastNamePrefix, setLastNamePrefix] = useState<string>("");
  const [lastNamePrefix, setLastNamePrefix] = useState<string>("s");

  const [searchResults, setSearchResults] = useState([]);

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
    console.log(value);
    setHospitalSelectedOption(value); // Update state with value from child component
    console.log(hospitalSelectedOption);//TODO not updating properly
  }

  onload = () => {

    //Retrieve the hospitals once at page load time
    //TODO move to a function?  should the async be outside or inside the function?
    (async () => {


      //TODO test e.g. url not found, server down... or put in a TODO for more advanced
      //TODO perhaps accept a date/time range, validate that end isn't before start - do on client or server?
      try {

        const hospitalResponses: HospitalResponse[] = await hospitalsService.getHospitals();

        //prepend the actual hospitals with a wildcard option
        hospitalResponses.unshift(anyHospitalOption);

        //default to the "Any hospital" option
        setHospitalSelectedOption(anyHospitalOption)


        console.log(hospitalResponses);

        setHospitalOptions(hospitalResponses);

      } catch (err) {
        //TODO display an error on screen
        console.log(err);
      }


    })();

  }


  //TODO better function names
  const handleButtonClick = () => {

    //TODO how to set timeout?
    (async () => {

      setLoading(true)
      setError("")
      setSearchExecuted(false)
      setSearchResults([])


      //TODO test e.g. url not found, server down... or put in a TODO for more advanced
      //TODO perhaps accept a date/time range, validate that end isn't before start - do on client or server?
      //   const queryString: string = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
      try {

        const patientHospitalVisitsRequest: PatientHospitalVisitsRequest = {
          PatientFirstNamePrefix: normalise(firstNamePrefix),
          PatientLastNamePrefix: normalise(lastNamePrefix),
          HospitalId: hospitalSelectedOption?.hospitalId
        }

console.log(patientHospitalVisitsRequest)

        const patientHospitalVisitsResponses: PatientHospitalVisitResponse[] = await patientSearchService.getPatientHospitalVisits(patientHospitalVisitsRequest);


        //look up the data for each entry in the response


        //TODO use strong type
        var theRows: any[] = [];

        //TODO a "no results found" message on screen

        /**
         * Note that there is a series of API calls below (to get display text for details of each visit) - 
         * a more sophisticated implementation could perform these queries in parallel, or get all these 
         * details along with the visits above by using something like GraphQL.
         */
        for (const patientHospitalVisitResponse of patientHospitalVisitsResponses) {

          //look up the hospital name
          var hospitalName: string;

          const hospitalResponse: HospitalResponse = await hospitalsService.getHospital(patientHospitalVisitResponse.hospitalId);
          if (hospitalResponse) {
            hospitalName = hospitalResponse.name;
          } else {
            hospitalName = "(Not found)"//be resilient to data integrity issues
          }

          //look up the patient name
          var patientFirstName: string;
          var patientLastName: string;
          const patientResponse: PatientResponse = await patientsService.getPatient(patientHospitalVisitResponse.patientId);
          if (patientResponse) {

            patientFirstName = patientResponse.firstName;
            patientLastName = patientResponse.lastName;

          } else {
            //TODO deal with other types of error
            patientFirstName = "(Not found)"//be resilient to data integrity issues
            patientLastName = "";
          }

          //look up the visit date
          var visitDate: Date;
          var visitDateString: string;
          const visitResponse: VisitResponse = await visitsService.getVisit(patientHospitalVisitResponse.visitId);
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




          //TODO a type for the row
          var row: any = {
            "visitId": patientHospitalVisitResponse.visitId,
            "patientFirstName": patientFirstName,
            "patientLastName": patientLastName,
            "hospitalName": hospitalName,
            "visitDateString": visitDateString,
            "visitDate": visitDate
          };
          theRows.push(row);

        }

        //sort the rows by date descending
        theRows.sort((a, b) => b.visitDate - a.visitDate)


        //TODO rename this set/var
        setSearchResults(theRows)
        setSearchExecuted(true)



        // setResponseValue(searchResponse.data.name)



      } catch (err) {
        //TODO might need to catch other types of error, too
        console.log(err);
        //TODO check if axios error?  throw from service layer?
        setError(err.response.data)
      }

      //TODO enable/disable the button, as well
      setLoading(false)

    })();

  }


  //TODO need a return type
  const normalise = (input: string) => {
    if (!input) {
      return undefined;
    } else {
      input = input.trim();
      return input.length === 0 ? undefined : input;
    }
  }

  //TODO create structs for the return data


  //TODO should there be error handling?  what args does the async take?


  //TODO turn off server, see where to trap connection refused error, timeouts...



  //TODO put all this in a component - patient visit search
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
          onSearchButtonClick={handleButtonClick} />

        {/* TODO should use CSS styling for the colour */}
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

export default App
