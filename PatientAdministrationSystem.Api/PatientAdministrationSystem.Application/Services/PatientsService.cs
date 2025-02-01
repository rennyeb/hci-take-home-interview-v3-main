using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;
using System.Diagnostics;
using System.Linq.Expressions;

namespace PatientAdministrationSystem.Application.Services;

public class PatientsService : IPatientsService
{
	//NB putting here because the code comment in the start code encourages this service to perform the visit search - possibly it might be better off on the HospitalsService
	private readonly IHospitalsRepository _hospitalsRepository;

	private readonly IHospitalsRepository _patientsRepository;
	public PatientsService(IHospitalsRepository hospitalsRepository, IHospitalsRepository patientsRepository)
	{
		_hospitalsRepository = hospitalsRepository;
		_patientsRepository = patientsRepository;
	}

	// Define your patient search logic here based on the interface method definition


	public List<PatientHospitalVisitResponse> getPatientHospitalVisits(PatientHospitalVisitsRequest patientHospitalVisitsRequest)
	{
		List<PatientHospitalVisitResponse> patientHospitalVisits = new List<PatientHospitalVisitResponse>();

		//TODO might have to go via patients, if that's the way the test data has been set up

		//TODO the filtering - first on hospitals, then on patient names (if available)
		_hospitalsRepository.getAll().ForEach(hospitalEntity =>
		{
			Debug.WriteLine(hospitalEntity.Name);

			ICollection<PatientHospitalRelation>? patientHospitals = hospitalEntity.PatientHospitals;
			if (patientHospitals != null)
			{
				foreach (var patientHospitalRelation in hospitalEntity.PatientHospitals)
				{
					Debug.WriteLine(patientHospitalRelation.VisitId);

				}
			}

		});

		//TODO temp
		PatientHospitalVisitResponse patientHospitalVisitResponse = new PatientHospitalVisitResponse();
		patientHospitalVisits.Add(patientHospitalVisitResponse);
		//TODO add to list
		return patientHospitalVisits;
	}

}