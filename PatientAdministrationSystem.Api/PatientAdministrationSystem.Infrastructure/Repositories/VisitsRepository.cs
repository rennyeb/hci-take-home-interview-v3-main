using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
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

	public VisitEntity? getById(Guid id)
	{
		return _context.Visits.Where(hospital => hospital.Id.Equals(id)).SingleOrDefault();
	}

}