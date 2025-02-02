using PatientAdministrationSystem.Application.Services;

namespace PatientAdministrationSystem.Application.Interfaces;

public interface IPatientsService

//TODO design decision to return a list rather than wrapping in a class that has a list as a member
//TODO accept both empty string (once trimmed) and null as wildcards
//TODO do a case-insensitive substring search - create tests


{

	// Define your service interface here for use in your API and service

	/// <summary>
	/// Finds a patient by their unique identifier
	/// </summary>
	/// <param name="patientId">
	/// The unique identifier of the patient</param>
	/// <returns>Details of the patient, or null if not found</returns>
	PatientResponse? getById(Guid patientId);

	/// <summary>
	/// Retrieves a list of patient hospital visits based on the criteria in the request.
	/// Note that there are no order guarantees in the returned list - consumers of this API should perform their own sorting if required.
	/// This method may throw a PatientHospitalVisitException if the request is invalid.
	/// </summary>
	/// <param name="patientHospitalVisitsRequest">The search criteria to limit search results</param>
	/// <returns>The patient hospital visits matching the search critieria
	/// </returns>

	List<PatientHospitalVisitResponse> getPatientHospitalVisits(PatientHospitalVisitsRequest patientHospitalVisitsRequest);
}