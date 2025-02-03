# Patient Administrator System API

This document describes the .NET web server for the REST APIs for the  "Patient Administrator System" coding exercise.

## Running the server

Open the `PatientAdministrationSystem.sln` file in Visual Studio and run the solution.  You may be prompted to install required packages into Visual Studio.

Note that the first time you run the solution, you may have to accept the security certificate for the server.

When you run the server, the Swagger page for the REST API should automatically open in a browser window.

## Testing the server

The application uses NUnit for unit testing.

Open the file `PatientAdministrationSystem.Api\PatientAdministrationSystem\Tests\PatientsApiTests.cs` in Visual Studio, right click and choose `Run Tests`.

Note that:
* The server must not be running, otherwise this command is not available.
* You may need to manually create the directory `PatientAdministrationSystem.Api\PatientAdministrationSystem.API` for the tests to pass.

You can informally test the server's REST APIs directly through the Swagger browser page.  There are also some sample curl commands in `CurlScripts.bat` which illustrate basic usage of the APIs.

Possibilities for improvement:
* A full set of unit tests would cover all the interfaces through all positive/negative paths, and could make use of tools like code coverage to ensure testing quality is high.
* Techniques like mocking may be useful to test various layers of the software without depending on others - in particular, to avoid the test overhead of starting and stopping the web server itself.
* There would need to be integration testing against a real data set (i.e. on a database).  Obtaining realistic data may prove challenging as actual customer data would include PII data which is unsuitable for use outside of end-customer staff who have been appropriately vetted and authorised to view such data.
* The curl scripts could be re-implemented in something more robust like PowerShell if required, and/or could have their output piped through a JSON pretty-printer for easier reading.

## Implementation notes
The sections below detail some decisions made during the implementation in this coding exercise, some consequences and possibilities for improvement.

### Functionality
The APIs are designed around their primary resources.

#### Simple retrieval APIs
There are simple retrieval APIs to read each of the following by their respective unique identifiers:
* Patient (`/api/patients/{patientId}`).
* Hospital (`/api/hospitals/{hospitalId}`).
* Visit (`/api/visits/{visitId}`).

There is also a simple API (`/api/hospitals`) to retrieve all the hospitals, in name order - this is used to populate the "Hospital visited" dropdown on the UI.

#### The patient/hospital visit search API

The most complex API (`PatientsController.getPatientHospitalVisits` at path `/api/patients/hospitalVisits`) is one to retrieve a list of visits by the given search criteria (last name prefix (mandatory), first name prefix (optional) and hospital visited (optional)).  This API:
* Validates that the mandatory parameter is populated.
* Uses a LINQ query to find all patients that match the search criteria.
* Retrieves the details of all visits by that patient, including only those to the specified hospital in the search criteria, or including all visits if no hospital has been specified.
* Returns the foreign keys of each visit (i.e. the links to the patient, hospital and visit date) in the response.  

Note that:
* The entity model allows visit information to be navigated to in different ways, in particular by patient or by hospital.  The current implementation retrieves the visit information by navigating by patient, on the assumption that each patient has relatively few visits compared to an overall hospital, and thus retrieval of visits by patient is likely to be more efficient.
* The API only returns keys to the related patient, hospital and visit - it is the responsibility of the caller (i.e. the REACT application) to call the simple read APIs to retrieve further details.  This approach keeps APIs small and each with a single responsibility, at the expense of the REACT application having a "chatty" set of interactions with the server when processing search results; alternative approaches would be to include the full related details in the search response at the risk of including unused data, or to use an approach like that of GraphQL where the caller is responsible for describing what related data is required in the API response.

### Entity Design
The implementation leaves the existing entity design untouched, on the grounds that it may be in place for pre-existing business or technical reasons, and changing it might introduce an unwanted data migration exercise.

That said, there are a number of features of the entity design which could be revisited:
* The naming of `PatientHospitalRelation` is not ideal - perhaps it should be renamed to something like `PatientHospitalVisit`.
* Similarly, the 0-m `PatientHospitals` properties on each of `HospitalEntity`,  `PatientEntity` and  `VisitEntity` are poorly named and could be something simpler like `Visits`.
* `VisitEntity` has a 0-m relationship with `PatientHospitalRelation` which does not make business sense.  In any case, the `Date` held on the `VisitEntity` more properly belongs on the `PatientHospitalRelation` (or, renamed, `PatientHospitalVisit`) structure, and the `VisitEntity` removed entirely.  In business terms, the date is an attribute of a patient's visit to a hospital, not a separate entity in its own right.
* Considering the `Date` further, its implementation is capable of storing a full date-time, but the test data suggests that a date-only is stored (and the rest of the current implementation uses this date-only assumption).  A more realistic modelling of a visit to a hospital might include an entry date-time (mandatory) and an exit date-time (optional), allowing the recording of both multi-day stays in hospital and also stays in hospital that are currently on-going (i.e. no exit date-time yet).  Changing this part of the model might have a considerable impact on the overall API and REACT application, though.
* The model does not appear to enforce foreign key constraints - for example, `Program.cs` includes additional test data for Wendy O'Connor which has a `HospitalId` and `VisitId` that do not link to any respective `HospitalEntity` and `VisitEntity` entities.  A production-strength application might choose to enforce foreign keys to ensure data quality, but possibly at the expense of database performance.
* `PatientHospitalRelation` doesn't store audit data like `CreatedTime` and `UpdatedTime` as it does not inherit from the `Entity` base class - this audit information might be useful for business purposes.

### Scalability

Without knowing anticipated data sizes and usage patterns, it is not possible to judge how well the server would scale.

The current implementation has no client-specific state, so horizontal scaling should be possible in theory.  Server node affiliation might be beneficial if the instrastructure level performs any kind of data caching (on the grounds that a user navigating around a client application is likely to hit the same data repeatedly).

### Performance

Some rarely-changing data (such as hospital names) could be cached so as not to require retrieval from the data store, but this would require a cache invalidation strategy.

Full testing on an appropriately large volume of data would need to be performed to see what kinds of database tuning might be required (e.g. a database index on `Patient.lastName` is almost certainly required, but this may not show up when the application is used with a small test database).  The SQL generated for LINQ queries might need to be analysed for efficiency (assuming the database is relational - it is possible that there might be a NoSQL data storage facility in place).  LINQ is useful for abstracting away the details of the underlying storage but that does not obviate the need for performance monitoring, analysis and action.

The "last name prefix" functionality as implemented could perform badly (e.g. if only a single letter is provided) and could even be weaponised as a denial-of-service attack against the server.  This would need to be revisited before this functionality could be put into a production environment.

### Concurrency

There has been no testing of how the application holds up under massive concurrent use.


### Security

The implementation does not take any security into account.

The APIs return data to any client that asks for it, without any verification on the client's authorisation to access such data.  If the APIs are in any way publicly available, then there is a very real risk of highly sensitive and/or PII data being exposed in a breach.

### Operability

There has been no consideration for how monitor the server for availability, errors and performance.  For example, repeated 404 errors from the simple retrieval APIs might indicate poor data quality and/or a malicious attack.

A more advanced server implementation might need to log various outputs for collection in some facility available to system operators, but also taking into account the sensitivity of the business information (in particular, patient details and their medical records).

Diagnosing production issues might require customer-approved procedures like "break glass" for company staff to access sensitive and/or PII data in production environments.

### Localisation

The server is hard-coded to return English-only error messages.

A more advanced server implementation could externalise the error messages and/or delegate the responsibility for formatting error messages to the REACT client (which can display them in language and locale settings appropriate to the user).

The case-insensitive nature of the patient/hospital visit search might need to be revisited in non-English languages, and might need enhancing (e.g. to ignore accents on search characters).

### Standards and conventions

Without knowledge of the company's coding standards and conventions, it is difficult to know whether the implementation passes code quality checks:
* The server code has been written according to the naming rules in `https://google.github.io/styleguide/csharp-style.html`.
* There are comments (and suggestions for improvement) here and there in the source.  The level of comments is in line with the starter source for the coding exercise.
* There are some compile warnings in the unit test code which could be addressed.  The main server code is free of warnings, though.
* Some places in the server code could benefit from more use of C# syntactic sugar, such as null-coalescing and/or null-conditional.
* It might be possible to expand the use of annotations in the server code so that the generated OpenAPI specification ("Swagger") is more descriptive.

