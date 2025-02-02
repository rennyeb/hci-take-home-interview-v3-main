using PatientAdministrationSystem.Application.Services;

namespace PatientAdministrationSystem.Application.Interfaces;

public interface IPatientsService
{
	PatientResponse? getById(Guid patientId);

	// Define your service interface here for use in your API and service


	//TODO mention throws PatientHospitalVisitException
	//TODO design decision to return a list rather than wrapping in a class that has a list as a member
	//TODO accept both empty string (once trimmed) and null as wildcards
	//TODO do a case-insensitive substring search - create tests
	//TODO sort into a deterministic order
	//TODO make the request and all its data optional - is there an elvis-like operator in c#?
	List<PatientHospitalVisitResponse> getPatientHospitalVisits(PatientHospitalVisitsRequest patientHospitalVisitsRequest);
}