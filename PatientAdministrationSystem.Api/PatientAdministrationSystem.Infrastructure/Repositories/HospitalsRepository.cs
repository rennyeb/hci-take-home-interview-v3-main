using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
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
}