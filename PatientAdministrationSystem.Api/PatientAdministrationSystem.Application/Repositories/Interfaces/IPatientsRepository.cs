using System.Linq.Expressions;
using PatientAdministrationSystem.Application.Entities;

namespace PatientAdministrationSystem.Application.Repositories.Interfaces;

public interface IPatientsRepository
{
	// Add interfaces here for your repository methods

	public PatientEntity? getById(Guid id);

	//TODO the filtering could be placed in here, and also a get by id - is there something which can return a single record, or null?
	//TODO describe what this does, the parameters
	public IQueryable<PatientEntity> getByNamePrefixes(String lastNameSubstring, String? firstNameSubstring);

}