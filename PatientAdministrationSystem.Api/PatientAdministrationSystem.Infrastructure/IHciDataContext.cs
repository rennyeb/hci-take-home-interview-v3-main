using PatientAdministrationSystem.Application.Entities;
using Microsoft.EntityFrameworkCore;

namespace PatientAdministrationSystem.Infrastructure;

public interface IHciDataContext
{
    DbSet<PatientEntity> Patients { get; set; }

    DbSet<HospitalEntity> Hospitals { get; set; }

    DbSet<VisitEntity> Visits { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}