using System.Linq.Expressions;
using PatientAdministrationSystem.Application.Entities;

namespace PatientAdministrationSystem.Application.Repositories.Interfaces;

public interface IVisitsRepository
{
	/// <summary>
	/// Gets a visit by its unique identifier, or null if not found.
	/// </summary>
	/// <param name="id">the unique identifer of the visit</param>
	/// <returns>the visit for the unique identifier provided</returns>
	public VisitEntity? getById(Guid id);


}