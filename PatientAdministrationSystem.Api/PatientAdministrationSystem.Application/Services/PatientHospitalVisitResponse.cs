namespace PatientAdministrationSystem.Application.Services;

public class PatientHospitalVisitResponse
{

	//TODO note that this class is a subset of PatientHospitalRelation

	//TODO don't bother returning created/updated times - design decision - just return Guids so that the client can call more apis

	//TODO when to use String vs string?  Check all the code

	public Guid HospitalId { get; set; }
	public Guid PatientId { get; set; }
	public Guid VisitId { get; set; }

	//public DateTime Date{ get; set; }
	//TODO create APIs for getting the hospital, patient, visit based off a GUID, with suitable 404 if not found - could have a base class for EntityResponse
}

