using PatientAdministrationSystem.Application.Services;

namespace PatientAdministrationSystem.Application.Interfaces;

public interface IHospitalsService
{
	List<HospitalResponse> getAll();
}