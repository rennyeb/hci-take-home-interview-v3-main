using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;

namespace PatientAdministrationSystem.Application.Services;

public class VisitsService : IVisitsService
{

	private readonly IVisitsRepository _repository;

	public VisitsService(IVisitsRepository repository)
	{
		_repository = repository;
	}



	public VisitResponse? getById(Guid VisitId)
	{
		VisitEntity? visitEntity = _repository.getById(VisitId);
		if (visitEntity == null)
		{
			return null;
		}
		else
		{
			return new VisitResponse
			{
				//NB could use an auto-mapper to replace this field-by-field manual mapping
				Id = visitEntity.Id,
				CreatedTime = visitEntity.CreatedTime,
				UpdatedTime = visitEntity.UpdatedTime,
				Date = visitEntity.Date
			};
		}
	}

}
