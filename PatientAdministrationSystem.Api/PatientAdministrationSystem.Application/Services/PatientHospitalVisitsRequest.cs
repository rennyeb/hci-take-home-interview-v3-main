namespace PatientAdministrationSystem.Application.Services;

public class PatientHospitalVisitsRequest
{
//TODO explain how each of these are optional
	public Guid? HospitalId { get; set; }
	public String? PatientFirstName { get; set; }
	public String? PatientLastName { get; set; }

}

