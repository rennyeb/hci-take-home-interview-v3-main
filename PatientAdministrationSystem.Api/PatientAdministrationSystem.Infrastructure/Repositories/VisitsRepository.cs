using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Repositories.Interfaces;

namespace PatientAdministrationSystem.Infrastructure.Repositories;

public class VisitsRepository : IVisitsRepository
{
	private readonly HciDataContext _context;

	public VisitsRepository(HciDataContext context)
	{
		_context = context;
	}

	/// <summary>
	/// Gets a visit by its unique identifier, or null if not found.
	/// </summary>
	/// <param name="id">the unique identifer of the visit</param>
	/// <returns>the visit for the unique identifier provided</returns>
	public VisitEntity? getById(Guid id)
	{
		return _context.Visits.Where(hospital => hospital.Id.Equals(id)).SingleOrDefault();
	}

}