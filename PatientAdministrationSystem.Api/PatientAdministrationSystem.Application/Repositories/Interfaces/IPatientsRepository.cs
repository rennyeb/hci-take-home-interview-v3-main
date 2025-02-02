using System.Linq.Expressions;
using PatientAdministrationSystem.Application.Entities;

namespace PatientAdministrationSystem.Application.Repositories.Interfaces;

public interface IPatientsRepository
{
	// Add interfaces here for your repository methods

	public PatientEntity? getById(Guid id);

	/// <summary>
	/// Searches for patients with the specified last name prefix (mandatory) and first name prefix (optional).
	/// The search is performed in a case-insensitive way, and surrounding whitespace is trimmed from the prefixes.  For example, a search with last name prefix "  SmI  " will find a patient by the name of "John Smith".
	/// </summary>
	/// <param name="lastNamePrefix">The starting letters of the patient's last name</param>
	/// <param name="firstNamePrefix">The starting letters of the patient's first name</param>
	/// <returns></returns>
	public List<PatientEntity> getByNamePrefixes(String lastNamePrefix, String? firstNamePrefix);

}