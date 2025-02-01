namespace PatientAdministrationSystem.Application.Entities;

public class PatientHospitalRelation
{
    public Guid PatientId { get; set; }

    public Guid HospitalId { get; set; }

    public Guid VisitId { get; set; }

    public PatientEntity Patient { get; set; } = null!;

    public HospitalEntity Hospital { get; set; } = null!;

    public VisitEntity Visit { get; set; } = null!;
}