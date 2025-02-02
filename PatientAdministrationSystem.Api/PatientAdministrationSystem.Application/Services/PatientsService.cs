using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;
using System.Diagnostics;
using System.Linq.Expressions;

namespace PatientAdministrationSystem.Application.Services;

public class PatientsService : IPatientsService
{
	private readonly IPatientsRepository _patientsRepository;
	public PatientsService(IPatientsRepository patientsRepository)
	{
		_patientsRepository = patientsRepository;
	}

	// Define your patient search logic here based on the interface method definition

	public PatientResponse? getById(Guid patientId)
	{
		PatientEntity? patientEntity = _patientsRepository.getById(patientId);
		if (patientEntity == null)
		{
			return null;
		}
		else
		{
			return new PatientResponse
			{
				//NB could use an auto-mapper to replace this field-by-field manual mapping
				Id = patientEntity.Id,
				CreatedTime = patientEntity.CreatedTime,
				UpdatedTime = patientEntity.UpdatedTime,
				FirstName = patientEntity.FirstName,
				LastName = patientEntity.LastName,
				Email = patientEntity.Email
			};
		}
	}


	//TODO use null-coalescing/null-conditional in various places, rerun tests

	public List<PatientHospitalVisitResponse> getPatientHospitalVisits(PatientHospitalVisitsRequest patientHospitalVisitsRequest)
	{
		//TODO validate that at least part of surname is present, create an exception type, catch in controller and return a bad request with info

		List<PatientHospitalVisitResponse> patientHospitalVisits = new List<PatientHospitalVisitResponse>();

		//validate that the required data is present
		if (patientHospitalVisitsRequest.PatientLastNamePrefix == null)
		{
			throw new PatientHospitalVisitException("The prefix for the patient's last name must be populated");
		}

		//iterate through every patient that matches on name prefixes
		foreach (PatientEntity patientEntity in _patientsRepository.getByNamePrefixes(patientHospitalVisitsRequest.PatientLastNamePrefix, patientHospitalVisitsRequest.PatientFirstNamePrefix))
		{
			//iterate through every patient/hospital relationship for the patient - there should be relatively few records for each patient, but if we start to find that patients have a large number of records, then for database query efficiency
			//we may need to retrieve only the first chunk of records (and indicate that more are available), or insist on further filtering details (e.g. date ranges)

			Debug.WriteLine(patientEntity.LastName);
			Debug.WriteLine(patientEntity.PatientHospitals.Count);
			//Iteration causes the relation to load
			foreach (PatientHospitalRelation patientHospitalRelation in patientEntity.PatientHospitals)
			{
				//get the keys to the hospital/patient/visit - the client can call further server APIs to get the details of each of these
				//TODO the client could do multiple async calls in parallel, but to keep things simple this implementation will do them sequentially

				//filter further on hospital, if required
				//TODO test this with curl, add curl scripts to source control, mention in implementation notes
				//TODO could have detailed logging about what is filtered in/out - but need to be careful that the logs do not contain sensitive information from production environments
				if (patientHospitalVisitsRequest.HospitalId == null || patientHospitalRelation.HospitalId.Equals(patientHospitalVisitsRequest.HospitalId))
				{
					PatientHospitalVisitResponse patientHospitalVisitResponse = new PatientHospitalVisitResponse();
					patientHospitalVisitResponse.HospitalId = patientHospitalRelation.PatientId;
					patientHospitalVisitResponse.PatientId = patientHospitalRelation.HospitalId;
					patientHospitalVisitResponse.VisitId = patientHospitalRelation.VisitId;
					patientHospitalVisits.Add(patientHospitalVisitResponse);

				}

			}
		}

		return patientHospitalVisits;
	}

}