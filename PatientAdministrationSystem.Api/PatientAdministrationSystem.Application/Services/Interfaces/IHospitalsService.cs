using PatientAdministrationSystem.Application.Services;

namespace PatientAdministrationSystem.Application.Interfaces;

public interface IHospitalsService
{

	HospitalResponse? getById(Guid HospitalId);

}