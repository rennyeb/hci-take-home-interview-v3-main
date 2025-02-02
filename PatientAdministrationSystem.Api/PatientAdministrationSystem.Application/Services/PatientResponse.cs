namespace PatientAdministrationSystem.Application.Services;

public class PatientResponse : EntityResponse<Guid>
{
	
	public String FirstName { get; set; } = null!;
	
	public String LastName { get; set; } = null!;
	
	public String Email { get; set; } = null!;

}