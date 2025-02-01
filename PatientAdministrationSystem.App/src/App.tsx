import './App.css'

//TODO remove - go via the other ts file
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import TestComponent from "./TestComponent"
import TextInput from "./TextInput"
import { useState } from 'react';

//TODO remove anything unused

function App() {

  const [value, setValue] = useState(0);

  const [inputValue, setInputValue] = useState<string>("");

  const [responseValue, setResponseValue] = useState<string>("(not yet called)");

  const [isWaiting, setWaiting] = useState<boolean>(false);
  



  const handleInputChange = (value: string) => {
    setInputValue(value); // Update state with value from child component
  };


  //TODO better function names
  const handleButtonClick = () => {
    // console.log("button clicked, input value=" + inputValue)
    // alert("button clicked")

    //TODO display "waiting" logo

    //TODO how to set timeout?
    (async () => {

      setWaiting(true)

      const client = axios.create({
        baseURL: 'https://localhost:7260/',
      });


      //TODO test e.g. url not found, server down... or put in a TODO for more advanced
      //TODO perhaps accept a date/time range, validate that end isn't before start - do on client or server?
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        } as RawAxiosRequestHeaders,
      };
      //   const queryString: string = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
      try {
        //TODO use javascript/typescript features to set text from  variables
        const searchResponse: AxiosResponse = await client.get(`/api/patients/hi?name=` + inputValue);

        setResponseValue(searchResponse.data.name)

      } catch (err) {
        //TODO display an error on screen
        console.log(err);
      }

      //TODO enable/disable the button, as well
      setWaiting(false)

    })();


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

  return (
    <div>
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
            <tr>
              <td>
                <h1>React TypeScript Example</h1>
                <TextInput onInputChange={handleInputChange} onButtonClick={handleButtonClick} />
                <p>You typed: {inputValue}</p>
                <p>Response from server: <b>{responseValue}</b></p>
                {isWaiting?<p>waiting...</p>:<p/>}
              </td>
            </tr>

          </tbody>

        </table>

      </div>
    </div>
  )
}

export default App
