using PatientAdministrationSystem.Application.Services;

namespace PatientAdministrationSystem.Application.Interfaces;

public interface IVisitsService
{
	VisitResponse? getById(Guid visitId);

}