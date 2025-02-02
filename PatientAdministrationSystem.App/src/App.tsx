import './App.css'

import apiClient from "./api/apiClient";

//TODO remove - go via the other ts file
import axios, { AxiosResponse } from 'axios';
import PatientVisitSearchCriteria from "./PatientVisitSearchCriteria"
import PatientVisitSearchResults from "./PatientVisitSearchResults"
import { useState } from 'react';

//TODO remove anything unused

//TODO put types somewhere else?  How to populate from the JSON response?
type Hospital = {
  name: string;
  hospitalId: string;
};

function App() {

  const ANY_HOSPITAL_WILDCARD: string = "*"

  const [error, setError] = useState<string>("");
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const [firstNamePrefix, setFirstNamePrefix] = useState<string>("");
  const [lastNamePrefix, setLastNamePrefix] = useState<string>("");

  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [hospitalOptions, setHospitalOptions] = useState([]);

  //TODO better types?  non null value?
  const [hospitalOption, setHospitalOption] = useState(null);

  const handleFirstNamePrefixChange = (value: string) => {
    setFirstNamePrefix(value); // Update state with value from child component
  }

  const handleLastNamePrefixChange = (value: string) => {
    setLastNamePrefix(value); // Update state with value from child component
  }

  //TODO better type
  const handleHospitalOptionChange = (value: any) => {
    setHospitalOption(value); // Update state with value from child component
  }

  onload = () => {

    //Retrieve the hospitals once at page load time
    //TODO move to a function?  should the async be outside or inside the function?
    (async () => {

      const client = apiClient;


      //TODO test e.g. url not found, server down... or put in a TODO for more advanced
      //TODO perhaps accept a date/time range, validate that end isn't before start - do on client or server?
      try {
        //TODO use javascript/typescript features to set text from  variables
        const hospitalsResponse: AxiosResponse = await client.get(`/api/hospitals`);


        //TODO use the right types
        const hospitals = hospitalsResponse.data.map((hospitalResponse: { name: any; id: any; }) => ({
          name: hospitalResponse.name,//TODO are these right?
          hospitalId: hospitalResponse.id
        }));

        //prepend the actual hospitals with a wildcard option
        hospitals.unshift({
          name: "(Any hospital)",
          hospitalId: ANY_HOSPITAL_WILDCARD
        });

        setHospitalOptions(hospitals);

      } catch (err) {
        //TODO display an error on screen
        console.log(err);
      }


    })();



  }


  //TODO put the search results in its own component

  //TODO better function names
  const handleButtonClick = () => {

    //TODO how to set timeout?
    (async () => {

      setLoading(true)
      setError("")
      setSearchExecuted(false)
      setSearchResults([])

      const client = apiClient;


      //TODO test e.g. url not found, server down... or put in a TODO for more advanced
      //TODO perhaps accept a date/time range, validate that end isn't before start - do on client or server?
      //   const queryString: string = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
      try {
        //TODO do lots of awaits in series


        //TODO use javascript/typescript features to set text from  variables
        //TODO encode the json payload - need a struct, but use raw json for now?
        //TODO does the response take a generic type?
        const patientHospitalVisitsResponse: AxiosResponse = await client.get(`/api/patients/hospitalVisits`, {
          params: {
            PatientFirstNamePrefix: normalise(firstNamePrefix),
            PatientLastNamePrefix: normalise(lastNamePrefix),
            HospitalId: hospitalOption === ANY_HOSPITAL_WILDCARD ? null : hospitalOption
          }
        });


        //look up the data for each entry in the response


        //TODO use strong type
        var theRows: any[] = [];

        //TODO a "no results found" message on screen

        /**
         * Note that there is a series of API calls below (to get display text for details of each visit) - 
         * a more sophisticated implementation could perform these queries in parallel, or get all these 
         * details along with the visits above by using something like GraphQL.
         */
        for (const patientHospitalVisitResponse of patientHospitalVisitsResponse.data) {

          //look up the hospital name
          var hospitalName: string;
          try {
            const hospitalResponse: AxiosResponse = await client.get(`/api/hospitals/${patientHospitalVisitResponse.hospitalId}`);

            hospitalName = hospitalResponse.data.name;
          } catch (err) {
            //TODO deal with other types of error
            hospitalName = "(Not found)"
          }

          //look up the patient name
          var patientFirstName: string;
          var patientLastName: string;
          try {
            const patientResponse: AxiosResponse = await client.get(`/api/patients/${patientHospitalVisitResponse.patientId}`);

            patientFirstName = patientResponse.data.firstName;
            patientLastName = patientResponse.data.lastName;
          } catch (err) {
            //TODO deal with other types of error
            patientFirstName = "(Not found)"
            patientLastName = "";
          }

          //look up the visit date
          var visitDate: Date;
          var visitDateString: string;
          try {
            const visitResponse: AxiosResponse = await client.get(`/api/visits/${patientHospitalVisitResponse.visitId}`);

            visitDate = new Date(visitResponse.data.date)

            //Format the date nicely
            visitDateString = visitDate.toLocaleDateString("en-IE", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            });


          } catch (err) {
            console.log(err)
            //TODO deal with other types of error
            visitDate = new Date(0);//low date value, to permit sorting against other populated dates
            visitDateString = "(Unknown)"
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
        setError(err.response.data)
      }

      //TODO enable/disable the button, as well
      setLoading(false)

    })();

  }


  const normalise = (input: string) => {
    if (!input) {
      return null;
    } else {
      input = input.trim();
      return input.length === 0 ? null : input;
    }
  }

  // const client = axios.create({
  //   baseURL: 'https://api.github.com',
  // });

  //TODO create structs for the return data


  //TODO should there be error handling?  what args does the async take?


  //TODO turn off server, see where to trap connection refused error, timeouts...

  //TODO could have a "clear" button which resets the form back to how it was at page load time


  //TODO put all this in a component
  return (
    <div>
      <img src="./public/hci-main-logo.svg" alt="HCI logo" />

      {/*TODO nice formatting - does the below do anything?*/}

      <div style={{ justifyContent: 'left', alignItems: 'center', height: '100vh' }}>
        <table>

          <tbody>

            {/* //TODO might not need to bother with a component?  Or have one component that does everything? */}
            {/* TODO remove unnecessary table stuff */}
            <tr>
              <td>
                <h1>Patient Visit Search</h1>
                <PatientVisitSearchCriteria onFirstNamePrefixChange={handleFirstNamePrefixChange} onLastNamePrefixChange={handleLastNamePrefixChange} onHospitalOptionChange={handleHospitalOptionChange} hospitalOptions={hospitalOptions} onButtonClick={handleButtonClick} />

                {/* TODO should use CSS styling for the colour */}
                <p style={{ color: 'red' }}>{error} </p>
                {isLoading ? <p>loading...</p> : <p />}
              </td>
            </tr>

            {/* TODO display search results in a table, maybe with fake hyperlinks (with an alert that shows how this would link to more info) */}

          </tbody>

        </table>



        {/* only show search results if a search has been performed */}
        {searchExecuted && (


          <div>

            <PatientVisitSearchResults searchResults={searchResults} />


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

        )}



      </div>
    </div>
  )
}

export default App
