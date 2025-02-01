namespace PatientAdministrationSystem.Application.Entities;

public class HospitalEntity : Entity<Guid>
{
    public string Name { get; set; } = null!;

    public ICollection<PatientHospitalRelation>? PatientHospitals { get; set; }
}