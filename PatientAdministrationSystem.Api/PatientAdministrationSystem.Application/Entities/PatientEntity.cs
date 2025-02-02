namespace PatientAdministrationSystem.Application.Entities;

public class PatientEntity : Entity<Guid>
{
    public String FirstName { get; set; } = null!;

    public String LastName { get; set; } = null!;

    public String Email { get; set; } = null!;

    public ICollection<PatientHospitalRelation>? PatientHospitals { get; set; }
}