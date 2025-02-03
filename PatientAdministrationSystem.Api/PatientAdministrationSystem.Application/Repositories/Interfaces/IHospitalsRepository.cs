using System.Linq.Expressions;
using PatientAdministrationSystem.Application.Entities;

namespace PatientAdministrationSystem.Application.Repositories.Interfaces;

public interface IHospitalsRepository
{
	// Add interfaces here for your repository methods

	/// <summary>
	/// Gets all the hospitals in the data store, ordered by name./// 
	/// </summary>
	/// <returns>all the hospitals in the data store, ordered by name</returns>
	public List<HospitalEntity> getAll();

	/// <summary>
	/// Gets a hospital by its unique identifier, or null if not found.
	/// </summary>
	/// <param name="id">the unique identifer of the hospital</param>
	/// <returns>the hospital for the unique identifier provided</returns>
	public HospitalEntity? getById(Guid id);


}