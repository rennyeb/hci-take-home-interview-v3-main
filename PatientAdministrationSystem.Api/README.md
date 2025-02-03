# Patiend Administrator System API


#TODO think through the structure of this document, edit in Eclipse?

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

###TODO existing entity design is completely untouched, there could be pre-existing business and/or technical reasons for it, and we don't necessarily want a migration.  That said, if this were a greenfield implementation, I would have the following observations:
###TODO structure of server?  Concerns about entity modelling?  Use of LINQ to avoid tying into a particular storage (or mock storage) implementation?

###TODO mention test data - I've augmented it, including some with intentionally bad foreign key relationships

###TODO design decision that APIs return minimal data, could be chatty, calls are done sequentially

###TODO  just return Guids so that the client can call more apis

### Code naming rules

The server code has been written according to the naming rules in https://google.github.io/styleguide/csharp-style.html.

NB low level of comments in both client and server code (in line with the starter code) - not sure of company standards and conventions
#TODO comment all the server APIs/controllers - the interfaces, anyway

#TODO might be good to use mocks in testing - I haven't

#TODO mention running PatientsApiTests, what could be added, tests directly for the service layer, mocking out storage, more test data - overhead of starting the web server - curl tests overlap a bit

#TODO there are some compile warnings in the C# test code which could be attended to.

#TODO use null-coalescing/null-conditional in various places, rerun tests

//TODO design decision to return a list rather than wrapping in a class that has a list as a member
