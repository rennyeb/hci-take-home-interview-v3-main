namespace PatientAdministrationSystem.Application.Services;

/// <summary>
/// The response details of a patient hospital visit.
/// Note that the properties are a subset of those on PatientHospitalRelation.
/// </summary>
public class PatientHospitalVisitResponse
{

	//TODO when to use String vs string?  Check all the code

	public Guid HospitalId { get; set; }
	public Guid PatientId { get; set; }
	public Guid VisitId { get; set; }

}

