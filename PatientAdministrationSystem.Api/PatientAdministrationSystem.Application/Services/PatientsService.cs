using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;

namespace PatientAdministrationSystem.Application.Services;

public class PatientsService : IPatientsService
{
	private readonly IPatientsRepository _repository;
	public PatientsService(IPatientsRepository repository)
	{
		_repository = repository;
	}

	// Define your patient search logic here based on the interface method definition

	public PatientResponse? getById(Guid patientId)
	{
		PatientEntity? patientEntity = _repository.getById(patientId);
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


	public List<PatientHospitalVisitResponse> getPatientHospitalVisits(PatientHospitalVisitsRequest patientHospitalVisitsRequest)
	{
		List<PatientHospitalVisitResponse> patientHospitalVisits = new List<PatientHospitalVisitResponse>();

		//validate that the required data is present
		if (patientHospitalVisitsRequest.PatientLastNamePrefix == null)
		{
			throw new PatientHospitalVisitException("The prefix for the patient's last name must be populated");
		}

		//iterate through every patient that matches on name prefixes
		foreach (PatientEntity patientEntity in _repository.getByNamePrefixes(patientHospitalVisitsRequest.PatientLastNamePrefix, patientHospitalVisitsRequest.PatientFirstNamePrefix))
		{
			//iterate through every patient/hospital relationship for the patient - there should be relatively few records for each patient, but if we start to find that patients have a large number of records, then for database query efficiency
			//we may need to retrieve only the first chunk of records (and indicate that more are available), or insist on further filtering details (e.g. date ranges)
			foreach (PatientHospitalRelation patientHospitalRelation in patientEntity.PatientHospitals)
			{
				//get the keys to the hospital/patient/visit - the client can call further server APIs to get the details of each of these

				//filter further on hospital, if required
				//NB could have detailed logging about what is filtered in/out - but need to be careful that the logs do not contain sensitive information from production environments
				if (patientHospitalVisitsRequest.HospitalId == null || patientHospitalRelation.HospitalId.Equals(patientHospitalVisitsRequest.HospitalId))
				{
					PatientHospitalVisitResponse patientHospitalVisitResponse = new PatientHospitalVisitResponse();
					patientHospitalVisitResponse.HospitalId = patientHospitalRelation.HospitalId;
					patientHospitalVisitResponse.PatientId = patientHospitalRelation.PatientId;
					patientHospitalVisitResponse.VisitId = patientHospitalRelation.VisitId;
					patientHospitalVisits.Add(patientHospitalVisitResponse);

				}

			}
		}

		return patientHospitalVisits;
	}

}