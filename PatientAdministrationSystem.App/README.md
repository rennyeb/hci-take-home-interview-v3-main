# Patient Admin Search

The document describes the REACT application for the "Patient Admin Search" coding exercise.

## Running the application

Start the REST API web server (see `../PatientAdministrationSystem.API/README.md`).

On the same machine, run `npm run dev` from the `PatientAdministrationSystem.App` directory (i.e. the directly containing this document).

Open the URL `http://localhost:5173/` in your brower.

## Testing the application

The application uses Jest for unit testing.

In the `PatientAdministrationSystem.App` directory, install Jest by running `npm install --save-dev @testing-library/react @testing-library/jest-dom jest ts-jest @types/jest`.

Again in the `PatientAdministrationSystem.App` directory, run `npm test` to run the sample unit tests in `PatientVisitSearchResults.test.tsx`.

For informal UI testing, here are some suggested scenarios to try:
* Search for last name prefix "sweeney" (in any case) to find a single search result.
* Search for last name prefix "S" to find multiple search results across different patients.
* Set the first name prefix and/or hospital visit and re-click the search button.
* Leave the last name prefix blank and attempt to search, and see the error message.
* Enter a last name that does not match any patients, to see how the application behaves when no search results are found.
* Set a break point on the server in `PatientsController.getPatientHospitalVisits` to see the loading message, and the search button disabled until the server API call completes.
* Search for last name prefix "O" to find a search result that has invalid foreign keys, to see how the application is robust in the face of bad quality data.

Possibilities for improvement:
* A full set of unit tests would cover all the components, and would test facets of their layout and various logic in the application.
* End-to-end application testing could use a framework like Selenium to drive a browser.
* Check for vulnerabilities in the `npm` libraries - there currently appear to be: `#6 vulnerabilities (3 moderate, 3 high)`

## Implementation notes
The sections below detail some decisions made during the implementation in this coding exercise, some consequences and possibilities for improvement.

### Functionality

The application allows the user to search all visits to the hospital by patients, limiting down the results by these criteria:
* The patient's last name, which can be specified fully or else the first few characters entered.  This data is mandatory and the application will display an error if no last name is entered by the user.
* The patient's first name, which again can be specified fully or else the first few characters entered.  This data is optional.
* The hospital that was visited, defaulting to "(Any hospital").

When the user clicks the "Search" button, the application will display a table of the visits matching the criteria entered, or a "not found" message if no matching visits are found.

### Usability
The user interface has been implemented with a number of usability considerations in mind:
* The form opens with focus on the last name prefix field, as it could well be the only field that the user will write text in.
* The search button is the default for the form, so the user can hit return rather than having to use the mouse.
* Name-prefix searching can be helpful when the user is not entirely sure how to spell the patient's names.
* Searches are case insensitive, lowering the burden on the user to get the casing right.
* The search terms have surrounding whitespace stripped, so as not to penalise the user if they inadvertently include surrounding spaces (e.g. copying and pasting from another application).
* The search results are returned latest date first, on the grounds that the user is likely to be more interested in recent visits.
* There is placeholder text for the search term fields to help the user understand appropriate values for the field.

Possibilities for improvement:
* Add further search criteria, e.g. date of birth, date range of visit.
* Search results could load as the user types (once the user is past e.g. three letters of surname) - saves the user from a click or key press for the search button, and gives more assurances that there isn't a mistake in the data.
* Pagination for when there are many search results.
* Remember the user's "favourite" hospital and default to filtering by that hospital.
* Ability to search/filter the retrieved list on screen (e.g. clicking the "Date" header to reverse the sort order).
* All the input fields should probably be disabled when a search is in progress.
* A "clear" button to return the screen to its freshly-loaded state.
* Highlight a field with a red box when it is in error (e.g. no data entered in the mandatory "Last name prefix" field).
* Avoid searches altogether by tracking the user's most recently-searched patients and/or "favourite" patients.
* The various fields in the search results could like to details of the patient (e.g. John Sweeney's details), hospital (e.g. Default Hospital's details), or visit (the "details" link shown on the page is currently not implemented).

### Scalability

The application does not attempt to limit the number of search results.  This could be problematic as the number of visits grow in the system, and a more advanced application might need to introduce pagination or some other method of keeping the search results displayed to a reasonable numbers, whilst still remaining helpful to the user.

The "prefix last name" search is probably too generous, and might need to be limited to a minimum number of characters, to avoid finding a large number of patients (and their associated visits).

### Concurrency

If the system records a new visit whilst the application search results are displayed, there is nothing to alert the user that there are new matching records.  This is in keeping with the majority of web applications.

There has been no testing of how the application holds up under massive concurrent use.

### Security

The implementation does not take any security into account.

In a real-world application, the user would need to be authenticated before being allowed access to this application.

It may be necessary to restrict which patient/hospital/visit details a particular user is allowed to view, based on their role or other demographics, especially in a multi-tenant application (it might be a serious breach of data privacy if a user from one health organisation could see information about patients visiting another health organisation, say).

A real-world application may also need to audit which reads a user has retrieved.

### Robustness

The application attempts to remain robust in the face of certain types of error:
* Failure to load the list of hospitals at start-up - an error message displays on the page:
* Attempt to display search results which have bad foreign key links - the application displays "(Unknown)" for the visit date, and/or "(Not found)" for the hospital name.

There may be other types of system availability issues which would require graceful handling by the application, and possibly a mechanismm for feeding back errors to the overall SaaS logs from the application.

### Accessibility

There has been a minimal nod to accessibility (e.g. alt text for the HCI logo) but no serious attempt to ensure that the application meets accessibility standards.

### Localisation

The application is hard-coded to use English only text, and the en-IE locale for date formatting.

A more advanced application could externalise the screen labels and error messages for translation into various locales, and could format e.g. dates based on the browser's locale or the user's preferences.

### Standard and conventions

Without knowledge of the company's coding standards and conventions, it is difficult to know whether the implementation passes code quality checks:
* The application source code has been placed in a directory structure which attempts to categorise the different types of source file.
* There are comments (and suggestions for improvement) here and there in he source.

