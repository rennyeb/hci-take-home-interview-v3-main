namespace PatientAdministrationSystem.Application.Services;

public class PatientResponse : EntityResponse<Guid>
{
	
	public string FirstName { get; set; } = null!;
	
	public string LastName { get; set; } = null!;
	
	public string Email { get; set; } = null!;

}