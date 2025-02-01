# Health Care Informed Engineering - Take home assessment

<p align="center">
  <img src="patient-search-repo-image.png">
</p>

We are a very practical team at Health Care Informed and this extends to the way that we work with you to find out if this team is a great fit for you. We want you to come away with a great understanding of the work that we actually do day to day and what it is like to work with us. 

So instead of coding at a whiteboard with someone watching over your shoulder under high pressure, which is not a thing we often do, we instead discuss code that you have written previously when we meet face to face.

The Brief:

“A Health Care Informed customer needs to be able to_ **_find patient visit information_** _at one of their hospitals. Create a simple web application using React, Typescript, C# that allows a customer to_ **_search_** _patient/hospital visit information and display results. The application should have a very simple styled UX, some simple API’s and leverages the data store and sample data provided”._

## Guidelines
 
* Don’t spend too long on it (~4 hours) and keep things simple. This is not a time limit just a guideline.
* Clone the repo and create your own GitHub repositiory. Please dont fork.
  * When you’re done, **send us a link to the Github project and the Loom** to vinny.lawlor@hci.care - it will be reviewed by engineering and the CTO within 2 days.


## Focus areas

### DO focus on:
  1. Solving the customer problem - understand the customer requirement and make sensible trade offs for feature quality versus **keeping it simple**.
  2. Structure your front and back end code well so it's clean, modular & well organised. Attention to detail important.
     1. Strong, best practice RESTful API design, API contracts that are clean and make sense
     2. Validation
     3. Error handling
  3. Testing: Add a single test to the backend & front end - add some comments for other things you'd test
  4. The deliverable is well packaged and easy for us to run (document in your readme.md)
  5. Share a screen recording with a short demo of the application (max 5 mins - can use [Loom](https://www.loom.com/)) so we can see what it looks like.
     * Bring us through the solution, talk us through how it solves the customer problem
     * Clearly communicate any assumptions you want to make, shortcuts you take etc.
     * Answer this question: What would you do if you had 1 more week on this? Where do you spend your time? 
  
### Don't worry about implementing:
  * Authentication
  * Styling


## Development howto guide
### PatientAdministrationSystem.App
1. FE Application in React / Typescript built on [Vite](https://vitejs.dev/guide/)
2. We've included an API client (Axios) in the `api` folder but feel free to use whatever you like
3. Run using:
   
```
cd PatientAdministrationSystem.App
npm install
npm run dev
```
 
### PatientAdministrationSystem.Api
* BE: .NET Core solution file containing API's and in-memory database with Entity Framework ready for implementation.
* Add functionality to the [PatientService](https://github.com/vinnyhci/hci-take-home-interview-v3/blob/main/PatientAdministrationSystem.Api/PatientAdministrationSystem.Application/Services/PatientsService.cs)/[IPatientService](https://github.com/vinnyhci/hci-take-home-interview-v3/blob/main/PatientAdministrationSystem.Api/PatientAdministrationSystem.Application/Services/Interfaces/IPatientsService.cs) (app/business layer) and PatientsRepository (data layer) that query the HCIDataContext (database) and add your API contracts to the [PatientsController](https://github.com/vinnyhci/hci-take-home-interview-v3/blob/main/PatientAdministrationSystem.Api/PatientAdministrationSystem/Controllers/PatientsController.cs). Please define strong interfaces here, return types etc.
