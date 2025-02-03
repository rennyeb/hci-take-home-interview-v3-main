using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Repositories.Interfaces;

namespace PatientAdministrationSystem.Infrastructure.Repositories;

public class HospitalsRepository : IHospitalsRepository
{
	private readonly HciDataContext _context;

	public HospitalsRepository(HciDataContext context)
	{
		_context = context;
	}

	// Add logic here for your querying the data context

	/// <summary>
	/// Gets all the hospitals in the data store, ordered by name./// 
	/// </summary>
	/// <returns>all the hospitals in the data store, ordered by name</returns>
	public List<HospitalEntity> getAll()
	{
		return _context.Hospitals.OrderBy(hospital => hospital.Name).ToList();
	}

	/// <summary>
	/// Gets a hospital by its unique identifier, or null if not found.
	/// </summary>
	/// <param name="id">the unique identifer of the hospital</param>
	/// <returns>the hospital for the unique identifier provided</returns>
	public HospitalEntity? getById(Guid id)
	{
		return _context.Hospitals.Where(hospital => hospital.Id.Equals(id)).SingleOrDefault();
	}

}