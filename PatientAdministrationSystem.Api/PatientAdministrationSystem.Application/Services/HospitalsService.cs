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



	public HospitalResponse? getById(Guid HospitalId)
	{
		HospitalEntity? hospitalEntity = _repository.getById(HospitalId);
		if (hospitalEntity == null)
		{
			return null;
		}
		else
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

}

//TODO find all TODOs, all unused "using"... - is there a TODO marker for C# in visual studio?