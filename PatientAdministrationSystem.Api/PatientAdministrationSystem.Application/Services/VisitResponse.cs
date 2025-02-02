namespace PatientAdministrationSystem.Application.Services;
public class VisitResponse : EntityResponse<Guid>
{
	public DateTime Date { get; set; }
}

