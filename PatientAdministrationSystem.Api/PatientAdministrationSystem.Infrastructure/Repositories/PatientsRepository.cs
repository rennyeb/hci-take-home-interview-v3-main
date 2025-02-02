using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Repositories.Interfaces;

namespace PatientAdministrationSystem.Infrastructure.Repositories;

public class PatientsRepository : IPatientsRepository
{
	private readonly HciDataContext _context;

	public PatientsRepository(HciDataContext context)
	{
		_context = context;
	}

	// Add logic here for your querying the data context
	public PatientEntity? getById(Guid id)
	{
		return _context.Patients.Where(patient => patient.Id.Equals(id)).SingleOrDefault();
	}

	public IQueryable<PatientEntity> getByNamePrefixes(String lastNamePrefix, String? firstNamePrefix)
	{

		//TODO test trimming - and also trim on the client

		return _context.Patients.Where(
			//NB against a real database, an index on last name should be able to cope with prefix searches

			//NB assumeds that the names on the database have already had any surrounding whitespace trimmed

			// case-insensitive prefix match on last name
			patient => patient.LastName.ToUpper().StartsWith(lastNamePrefix.Trim().ToUpper()) &&

			// case-insensitive prefix match on first name, if present
			(firstNamePrefix == null || firstNamePrefix.Trim().Length == 0 || patient.FirstName.ToUpper().Contains(firstNamePrefix.Trim().ToUpper()))

			).Include(patient => patient.PatientHospitals);
	}

}