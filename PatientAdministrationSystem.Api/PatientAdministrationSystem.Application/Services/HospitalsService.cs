using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace PatientAdministrationSystem.Application.Services;

public class HospitalsService : IHospitalsService
{

	//TODO chante the repo
	private readonly IPatientsRepository _repository;

	public HospitalsService(IPatientsRepository repository)
	{
		_repository = repository;
	}

	public List<HospitalResponse> getAll()
	{
		List<HospitalResponse> hospitals = new List<HospitalResponse>();
		//TODO temp - use the repo instead, then sort - create a test for the sorting, see how to mock out behaviour in c#

		HospitalResponse hospital2 = new HospitalResponse();
		hospital2.Name = "Test2";
		hospital2.GUID = "Test2GUID";//TODO use a type for the guid, see what the entity does
		hospitals.Add(hospital2);

		HospitalResponse hospital1 = new HospitalResponse();
		hospital1.Name = "Test1";
		hospital1.GUID = "Test1GUID";//TODO use a type for the guid, see what the entity does
		hospitals.Add(hospital1);

		//TODO is there an equivalent of java streams which can stream the list of entities from the repo, map to responses, sort them and collate into a list, preferably an immutble one?

		//sort the list into a deterministic order
		//assume that no hospital has a null name
		hospitals.Sort((h1, h2) => h1.Name.CompareTo(h2.Name));

		return hospitals;

	}
}