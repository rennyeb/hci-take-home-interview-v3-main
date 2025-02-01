namespace PatientAdministrationSystem.Application.Entities;

public class VisitEntity : Entity<Guid>
{
    public DateTime Date { get; set; }

    public ICollection<PatientHospitalRelation>? PatientHospitals { get; set; }
}