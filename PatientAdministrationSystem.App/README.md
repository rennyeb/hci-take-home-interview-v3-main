# Patient Admin Search

The document describes the REACT application for the "Patient Admin Search" coding exercise.

## Running the application

Start the REST API web server (see `../PatientAdministrationSystem.API/README.md`).

On the same machine, run `npm run dev` from the `PatientAdministrationSystem.App` directory (i.e. the directly containing this document).

Open the URL `http://localhost:5173/` in your brower.

## Unit tests

The application uses Jest for unit testing.

In the `PatientAdministrationSystem.App` directory, install Jest by running `npm install --save-dev @testing-library/react @testing-library/jest-dom jest ts-jest @types/jest`.

Again in the `PatientAdministrationSystem.App` directory, run `npm test` to run the sample unit tests in `PatientVisitSearchResults.test.tsx`.

Possibilities for improvement:
* A full set of unit tests would cover all the components, and would test facets of their layout and various logic in the application.
* End-to-end application testing could use a framework like Selenium to drive a browser.
* Check for vulnerabilities in the `npm` libraries - there currently appear to be: `#6 vulnerabilities (3 moderate, 3 high)`

## Implementation notes
The sections below detail some decisions made during the implementation in this coding exercise, some consequences and possibilities for improvement.

### Functionality
TODO
### Usability

TODO

### Performance

TODO

### Scalability

TODO

### Concurrency

TODO

### Security

TODO

### Legislation

TODO

### Robustness

TODO

### Accessibility

TODO

### Localisation

TODO



## Usability
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
* A "clear" button to return the screen to its freshly-loaded state.
* Highlight a field with a red box when it is in error (e.g. no data entered in the mandatory "Last name prefix" field).
* Avoid searches altogether by tracking the user's most recently-searched patients and/or "favourite" patients.
* The various fields in the search results could like to details of the patient (e.g. John Sweeney's details), hospital (e.g. Default Hospital's details), or visit (the "details" link shown on the page is currently not implemented).

##Localisation
e.g. date formats (get locale from browser), message language

##TODO audit