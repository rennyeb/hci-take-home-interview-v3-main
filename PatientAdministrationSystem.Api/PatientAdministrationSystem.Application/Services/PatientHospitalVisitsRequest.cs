namespace PatientAdministrationSystem.Application.Services;

public class PatientHospitalVisitsRequest
{
	public String? PatientLastNamePrefix { get; set; }
	public String? PatientFirstNamePrefix { get; set; }

	public Guid? HospitalId { get; set; }
}

