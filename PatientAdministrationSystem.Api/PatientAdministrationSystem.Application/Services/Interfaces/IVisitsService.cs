using PatientAdministrationSystem.Application.Services;

namespace PatientAdministrationSystem.Application.Interfaces;

public interface IVisitsService
{
	/// <summary>
	/// Gets a visit by its unique identifier, or null if not found.
	/// </summary>
	/// <param name="id">the unique identifer of the visit</param>
	/// <returns>the visit for the unique identifier provided</returns>
	VisitResponse? getById(Guid visitId);

}