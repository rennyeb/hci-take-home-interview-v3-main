using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;

namespace PatientAdministrationSystem.Application.Services;


public class HospitalsService : IHospitalsService
{

	private readonly IHospitalsRepository _repository;

	public HospitalsService(IHospitalsRepository repository)
	{
		_repository = repository;
	}

	public List<HospitalResponse> getAll()
	{
		return _repository.getAll().Select(hospital => createResponse(hospital)).ToList();

	}

	public HospitalResponse? getById(Guid hospitalId)
	{
		HospitalEntity? hospitalEntity = _repository.getById(hospitalId);
		if (hospitalEntity == null)
		{
			return null;
		}
		else
		{
			return createResponse(hospitalEntity);

		}
	}

	private HospitalResponse createResponse(HospitalEntity hospitalEntity)
	{
		return new HospitalResponse
		{
			//NB could use an auto-mapper to replace this field-by-field manual mapping
			Id = hospitalEntity.Id,
			CreatedTime = hospitalEntity.CreatedTime,
			UpdatedTime = hospitalEntity.UpdatedTime,
			Name = hospitalEntity.Name
		};
	}
}
