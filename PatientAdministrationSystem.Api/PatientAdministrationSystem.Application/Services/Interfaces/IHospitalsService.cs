using PatientAdministrationSystem.Application.Services;

namespace PatientAdministrationSystem.Application.Interfaces;

public interface IHospitalsService
{
	/// <summary>
	/// Gets all the hospitals in the system, ordered by name./// 
	/// </summary>
	/// <returns>all the hospitals in the system, ordered by name</returns>
	List<HospitalResponse> getAll();

	/// <summary>
	/// Gets a hospital by its unique identifier, or null if not found.
	/// </summary>
	/// <param name="id">the unique identifer of the hospital</param>
	/// <returns>the hospital for the unique identifier provided</returns>
	HospitalResponse? getById(Guid hospitalId);

}