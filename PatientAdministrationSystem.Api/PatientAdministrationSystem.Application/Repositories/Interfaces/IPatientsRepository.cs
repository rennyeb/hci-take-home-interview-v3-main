using System.Linq.Expressions;
using PatientAdministrationSystem.Application.Entities;

namespace PatientAdministrationSystem.Application.Repositories.Interfaces;

public interface IPatientsRepository
{
	// Add interfaces here for your repository methods

	/// <summary>
	/// Gets a patient by its unique identifier, or null if not found.
	/// </summary>
	/// <param name="id">the unique identifer of the patient</param>
	/// <returns>the patient for the unique identifier provided</returns>
	public PatientEntity? getById(Guid id);

	/// <summary>
	/// Searches for patients with the specified last name prefix (mandatory) and first name prefix (optional).
	/// The search is performed in a case-insensitive way, and surrounding whitespace is trimmed from the prefixes.  For example, a search with last name prefix "  SmI  " will find a patient by the name of "John Smith".
	/// </summary>
	/// <param name="lastNamePrefix">The starting letters of the patient's last name</param>
	/// <param name="firstNamePrefix">The starting letters of the patient's first name</param>
	/// <returns>all the patients whose first and last names start with the prefixes supplied (in a case-insensitive way)</returns>
	public List<PatientEntity> getByNamePrefixes(String lastNamePrefix, String? firstNamePrefix);

}