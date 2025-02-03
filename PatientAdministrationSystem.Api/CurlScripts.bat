REM Sample curl commands to exercise the REST API.  Note that the JSON output is not pretty-printed.

REM ################## Hospitals ##################

REM list all hospitals (in alphbetical order by name)
curl https://localhost:7260/api/hospitals

REM retrieve a hospital by its ID
curl https://localhost:7260/api/hospitals/ff0c022e-1aff-4ad8-2231-08db0378ac98

REM fail to find a hospital with a non-existent ID - expect a 404 error
curl https://localhost:7260/api/hospitals/00000000-0000-0000-0000-000000000000

REM ################## Visits ##################

REM retrieve a visit by its ID
curl https://localhost:7260/api/visits/a7a5182a-995c-4bce-bce0-6038be112b7b

REM fail to find a visit with a non-existent ID - expect a 404 error
curl https://localhost:7260/api/visits/00000000-0000-0000-0000-000000000000

REM ################## Patients ##################

REM retrieve a patient by its ID
curl https://localhost:7260/api/patients/c00b9ff3-b1b6-42fe-8b5a-4c28408fb64a

REM fail to find a patient with a non-existent ID - expect a 404 error
curl https://localhost:7260/api/patients/00000000-0000-0000-0000-000000000000

REM ################## Patient Hospital Visits Search ##################

REM find all visits by patients with last name starting with "Swee"
curl "https://localhost:7260/api/patients/hospitalVisits?PatientLastNamePrefix=Swee"

REM find all visits by patients with last name starting with "Swee" and first name starting with "jo"
curl "https://localhost:7260/api/patients/hospitalVisits?PatientLastNamePrefix=Swee&PatientFirstNamePrefix=jo"

REM find all visits by patients with last name starting with "Swee" and first name starting with "NO"
curl "https://localhost:7260/api/patients/hospitalVisits?PatientLastNamePrefix=Swee&PatientFirstNamePrefix=NO"

REM find all visits by patients with last name starting with "Swee" at a non-existent hospital
curl "https://localhost:7260/api/patients/hospitalVisits?PatientLastNamePrefix=sw&HospitalId=00000000-0000-0000-0000-000000000000"

REM ################## GUID formatting errors ##################

REM GUID is invalid - expect a 400 error with an error message
curl https://localhost:7260/api/patients/not-a-guid