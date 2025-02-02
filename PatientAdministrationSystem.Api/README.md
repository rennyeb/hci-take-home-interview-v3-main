# Patiend Administrator System API

## Running the server
Open the PatientAdministrationSystem.sln file in Visual Studio and run the solution.

Note that the first time you run the solution, you may have to accept the security certificate for the server.

When you run the server, the Swagger page for the REST API should automatically open in a browser window.

## Testing

### Swagger page
You can exercise the REST API directly using the Swagger page.

### Unit tests
There are unit tests in TODO, execute them by TODO.

### Sample curl scripts
There are also some curl scripts in .\CurlScripts.bat which you can run to informally execise the various REST APIs.

These could be reimplemented in something more robust like PowerShell if required, and/or could have their output piped through a JSON pretty-printer for easier reading.

###TODO structure of server?  Concerns about entity modelling?  Use of LINQ to avoid tying into a particular storage (or mock storage) implementation?

###TODO mention test data - I've augmented it, including some with intentionally bad foreign key relationships