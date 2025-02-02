import './App.css'

import apiClient from "./api/apiClient";

//TODO remove - go via the other ts file
import axios, { AxiosResponse } from 'axios';
import TextInput from "./TextInput"
import { useState } from 'react';

//TODO remove anything unused

//TODO why is everything called twice, according to the browser console?  Is it because of the async?  Or is it because of the "()" at the end of the function?

//TODO put types somewhere else?  How to populate from the JSON response?
type Hospital = {
  name: string;
  hospitalId: string;
};

function App() {

  const [error, setError] = useState<string>("");
  const [firstNamePrefix, setFirstNamePrefix] = useState<string>("");
  const [lastNamePrefix, setLastNamePrefix] = useState<string>("");

  //TODO temp
  const [rows, setRows] = useState([
    { visitId: 1, patientFirstName: 'John', patientLastName: 'Doe', hospitalName: "St Judes", visitDate: "2025-01-01" },
    { visitId: 2, patientFirstName: 'Jane', patientLastName: 'Smith', hospitalName: "St Judes", visitDate: "2025-01-01" },
    { visitId: 3, patientFirstName: 'Sam', patientLastName: 'Brown', hospitalName: "St Barts", visitDate: "2024-12-31" },
  ]);

  //TODO need the chosen hospital

  const [responseValue, setResponseValue] = useState<string>("(not yet called)");

  const [isWaiting, setWaiting] = useState<boolean>(false);

  const [hospitalOptions, setHospitalOptions] = useState([]);

  const handleFirstNamePrefixChange = (value: string) => {
    setFirstNamePrefix(value); // Update state with value from child component
  }

  const handleLastNamePrefixChange = (value: string) => {
    setLastNamePrefix(value); // Update state with value from child component
  }

  onload = () => {

    //Retrieve the hospitals once at page load time
    //TODO move to a function?  should the async be outside or inside the function?
    (async () => {

      const client = apiClient;


      //TODO test e.g. url not found, server down... or put in a TODO for more advanced
      //TODO perhaps accept a date/time range, validate that end isn't before start - do on client or server?
      //   const queryString: string = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
      try {
        //TODO use javascript/typescript features to set text from  variables
        const hospitalsResponse: AxiosResponse = await client.get(`/api/hospitals`);

        //TODO need to find out how to do this - might need to loop through?  get chatgpt to gen some code
        //TODO should hospital option be a component, with an onchoose/onclick or something?
        // var hospitals: Hospital[]=hospitalsResponse;


        //TODO use the right types
        const formattedOptions = hospitalsResponse.data.map((hospitalResponse: { name: any; guid: any; }) => ({
          value: hospitalResponse.name,//TODO are these right?
          label: hospitalResponse.guid
        }));

        //prepend the actual hospitals with a wildcard option
        formattedOptions.unshift({
          value: "(Any hospital)",
          label: null
        });

        //TODO remove
        console.log("formattedOptions: " + JSON.stringify(formattedOptions))

        setHospitalOptions(formattedOptions);

        //TODO create a structure and map it
        // console.log(hospitalsResponse.data);

      } catch (err) {
        //TODO display an error on screen
        console.log(err);
      }


    })();



  }


  //TODO better function names
  const handleButtonClick = () => {
    // console.log("button clicked, input value=" + inputValue)
    // alert("button clicked")

    //TODO display "waiting" logo

    //TODO how to set timeout?
    (async () => {

      setWaiting(true)
      setError("")
      setRows([])

      //TODO remove
      // const client = axios.create({
      //   baseURL: 'https://localhost:7260/',
      // });

      //TODO change "waiting" to "loading"

      const client = apiClient;


      //TODO test e.g. url not found, server down... or put in a TODO for more advanced
      //TODO perhaps accept a date/time range, validate that end isn't before start - do on client or server?
      //   const queryString: string = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
      try {
        //TODO do lots of awaits in series


        //TODO use javascript/typescript features to set text from  variables
        //TODO encode the json payload - need a struct, but use raw json for now?
        const patientHospitalVisitsResponse: AxiosResponse = await client.get(`/api/patients/hospitalVisits`, {
          params: {
            PatientFirstNamePrefix: normalise(firstNamePrefix),
            PatientLastNamePrefix: normalise(lastNamePrefix),
            //TODO pass in
            HospitalId: null
          }
        });

        console.log(patientHospitalVisitsResponse.data)

        //look up the data for each entry in the response


        //TODO use strong type
        var theRows: any[] = [];

        //TODO a "no results found" message on screen

        for (const visitResponse of patientHospitalVisitsResponse.data) {
          console.log("visitResponse: " + JSON.stringify(visitResponse))

          //TODO remove
          // patientHospitalVisitsResponse.data.forEach(visitResponse => {

          //look up the hospital name
          var hospitalName: string;
          try {
            //TODO deal with bad data - what if the hospital doesn't exist?
            const hospitalResponse: any = await client.get(`/api/hospitals/${visitResponse.hospitalId}`);
            // const hospitalResponse: AxiosResponse = await client.get(`/api/hospitals/${visitResponse.HospitalId}`);

            //TODO remove
            console.log("hospitalResponse: " + JSON.stringify(hospitalResponse))

            hospitalName = hospitalResponse.data.name;
          } catch (err) {
            //TODO deal with other types of error
            hospitalName = "(Not found)"
          }



          var row: any = {
            "visitId": visitResponse.visitId,
            "patientFirstName": visitResponse.visitId,
            "patientLastName": visitResponse.visitId,
            "hospitalName": hospitalName,
            "visitDate": visitResponse.visitId
          };
          theRows.push(row);

        }


        //TODO rename this set/var
        setRows(theRows);


        // setResponseValue(searchResponse.data.name)



      } catch (err) {
        //TODO might need to catch other types of error, too
        setError(err.response.data)
      }

      //TODO enable/disable the button, as well
      setWaiting(false)

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


  // (async () => {
  //   const config: AxiosRequestConfig = {
  //     headers: {
  //       'Accept': 'application/vnd.github+json',
  //     } as RawAxiosRequestHeaders,
  //   };
  //   const queryString: string = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
  //   try {
  //     const searchResponse: AxiosResponse = await client.get(`/search/users?${queryString}`, config);
  //     const foundUsers: githubFoundUser[] = searchResponse.data.items;

  //     const username: string = foundUsers[0].login;
  //     const userResponse: AxiosResponse = await client.get(`/users/${username}`, config);
  //     const user: githubUser = userResponse.data;
  //     const followersCount = user.followers;

  //     console.log(`The most followed user on GitHub is "${username}" with ${followersCount} followers.`)

  //   } catch (err) {
  //     console.log(err);
  //   }
  // })();


  //TODO should there be error handling?  what args does the async take?

  //TODO remove
  (async () => {
    const client = axios.create({
      baseURL: 'https://localhost:7260/',
    });


    //TODO test e.g. url not found, server down... or put in a TODO for more advanced
    //TODO perhaps accept a date/time range, validate that end isn't before start - do on client or server?
    // const config: AxiosRequestConfig = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   } as RawAxiosRequestHeaders,
    // };
    // //   const queryString: string = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
    try {
      //   // throw new Error("test2")
      //   const searchResponse: AxiosResponse = await client.get(`/api/patients/hi?name=zzz2`);
      //   // const foundUsers: githubFoundUser[] = searchResponse.data.items;
      //   //TODO how to get the response data?  Wrong header?
      //   // console.log("search response: " + JSON.stringify(searchResponse))
      //   console.log("data= " + JSON.stringify(searchResponse.data));

      //   //     // const username: string = foundUsers[0].login;
      //   //     // const userResponse: AxiosResponse = await client.get(`/users/${username}`, config);
      //   //     // const user: githubUser = userResponse.data;
      //   //     // const followersCount = user.followers;

      //   //     // console.log(`The most followed user on GitHub is "${username}" with ${followersCount} followers.`)

      //   console.log("here")
    } catch (err) {
      console.log(err);
    }
  })();




  // const config: AxiosRequestConfig = {
  //   headers: {
  //     'Accept': 'application/vnd.github+json',
  //   } as RawAxiosRequestHeaders,
  // };


  // async () => {
  //   const config: AxiosRequestConfig = {
  //     headers: {
  //       'Accept': 'application/vnd.github+json',
  //     } as RawAxiosRequestHeaders,
  //   };
  //   const queryString: string = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
  //   try {
  //     const searchResponse: AxiosResponse = await client.get(`/search/users?${queryString}`, config);
  //     const foundUsers: githubFoundUser[] = searchResponse.data.items;

  //     const username: string = foundUsers[0].login;
  //     const userResponse: AxiosResponse = await client.get(`/users/${username}`, config);
  //     const user: githubUser = userResponse.data;
  //     const followersCount = user.followers;

  //     console.log(`The most followed user on GitHub is "${username}" with ${followersCount} followers.`)
  //   } catch(err) {
  //     console.log(err);
  //   }  
  // }();

  //TODO turn off server, see where to trap connection refused error, timeouts...

  //TODO create a "clear" button


  //TODO put all this in a component
  return (
    <div>
      <img src="./public/hci-main-logo.svg" alt="HCI logo" />
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Implement me4</h1>
      </div> */}

      {/*TODO nice formatting*/}

      <div style={{ justifyContent: 'left', alignItems: 'center', height: '100vh' }}>
        <table>

          <tbody>
            {/* <tr>
              <th>input name</th>
            </tr>

            <tr>
              <td><input value="1234" /></td>
            </tr>

            <tr>
              <td><button onClick={() => myFunction('test')}> MyButton</button></td>
            </tr> */}

            {/* <tr>
            <td><TestComponent defaultName="Alice2" value="abc" /></td>
          </tr> */}


            {/* //TODO might not need to bother with a component?  Or have one component that does everything? */}
            {/* TODO remove unnecessary table stuff */}
            {/* //TODO react to hospital option change */}
            <tr>
              <td>
                <h1>Patient Visit Search</h1>
                <TextInput onFirstNamePrefixChange={handleFirstNamePrefixChange} onLastNamePrefixChange={handleLastNamePrefixChange} onButtonClick={handleButtonClick} hospitalOptions={hospitalOptions} />

                {/* //TODO pass the chosen hospital to the server too */}

                {/* //TODO remove */}
                {/* //TODO should use CSS styling for the colour */}
                <p style={{ color: 'red' }}>{error} </p>
                <p>You typed: {firstNamePrefix}  {lastNamePrefix}</p>
                <p>Response from server: <b>{responseValue}</b></p>
                {isWaiting ? <p>waiting...</p> : <p />}
              </td>
            </tr>

            {/* TODO display search results in a table, maybe with fake hyperlinks (with an alert that shows how this would link to more info) */}

          </tbody>

        </table>

        {/* TODO show/hide */}

        {/* TODO a more advanced implementation could support ascending/descending sort, and pagination */}

        {/* only show search results if a search has been performed */}


        {/* //TODO put back in */}
        {/* {rows ? ( */}

        <div>
          <h1>Search Results</h1>

          {rows.length ? (
            <table border={1}>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Hospital</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>

                {rows.map((row) => (
                  <tr key={row.visitId}>
                    {/* //TODO change to hyperlinks */}
                    {/* //TODO concatening for usability */}
                    <td>{row.patientFirstName} {row.patientLastName}</td>
                    <td>{row.hospitalName}</td>
                    {/* //TODO format dates nicely */}
                    <td>{row.visitDate}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          ) : "No results found.  Please check your search criteria and try again."}

        </div>


        {/* ):""} */}

      </div>
    </div>
  )
}

export default App
