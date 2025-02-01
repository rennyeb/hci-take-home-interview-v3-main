using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;

namespace PatientAdministrationSystem.Application.Services;

public class HospitalsService : IHospitalsService
{

	//TODO change the repo
	private readonly IHospitalsRepository _repository;

	public HospitalsService(IHospitalsRepository repository)
	{
		_repository = repository;
	}

	public List<HospitalResponse> getAll()
	{
		List<HospitalResponse>
				hospitalResponses = _repository.getAll().ConvertAll(historyEntity => new HospitalResponse() { Name = historyEntity.Name, GUID = historyEntity.Id }).ToList();

		//Sort the list into a deterministic order.
		//NB assumes that no hospital has a null name.

		//TODO what to do about null possibility?
		hospitalResponses.Sort((hospitalResponse1, hospitalResponse2) => hospitalResponse1.Name.CompareTo(hospitalResponse2.Name));
		return hospitalResponses;

		//TODO remove the below
		List<HospitalResponse> hospitals = new List<HospitalResponse>();
		//TODO temp - use the repo instead, then sort - create a test for the sorting, see how to mock out behaviour in c#

		HospitalResponse hospital2 = new HospitalResponse();
		hospital2.Name = "Test2";
		//hospital2.GUID =  "Test2GUID";//TODO use a type for the guid, see what the entity does
		hospitals.Add(hospital2);

		HospitalResponse hospital1 = new HospitalResponse();
		hospital1.Name = "Test1";
		//hospital1.GUID = "Test1GUID";//TODO use a type for the guid, see what the entity does
		hospitals.Add(hospital1);

		//TODO is there an equivalent of java streams which can stream the list of entities from the repo, map to responses, sort them and collate into a list, preferably an immutble one?

		//Sort the list into a deterministic order.
		//NB assumes that no hospital has a null name.
		hospitals.Sort((h1, h2) => h1.Name.CompareTo(h2.Name));

		return hospitals;

	}
}

//TODO find all TODOs, all unused "using"... - is there a TODO marker for C# in visual studio?