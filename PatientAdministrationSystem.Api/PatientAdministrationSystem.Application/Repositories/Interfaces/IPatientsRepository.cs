using System.Linq.Expressions;
using PatientAdministrationSystem.Application.Entities;

namespace PatientAdministrationSystem.Application.Repositories.Interfaces;

public interface IPatientsRepository
{
	// Add interfaces here for your repository methods

	public PatientEntity? getById(Guid id);

	//TODO describe what this does, the parameters
	public List<PatientEntity> getByNamePrefixes(String lastNameSubstring, String? firstNameSubstring);

}