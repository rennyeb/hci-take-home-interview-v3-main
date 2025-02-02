using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Services;

namespace Hci.Ah.Home.Api.Gateway.Controllers.Patients;

[Route("api/patients")]
[ApiExplorerSettings(GroupName = "Patients")]
[ApiController]
public class PatientsController : ControllerBase
{
	private readonly IPatientsService _patientsService;

	public PatientsController(IPatientsService patientsService)
	{
		_patientsService = patientsService;
	}

	// Define your API contracts here

	[HttpGet]
	[Route("{PatientId}")]
	//TODO should parameter names be initial upper?
	public IActionResult getPatient([FromRoute] Guid PatientId)
	{
		PatientResponse? patientResponse = _patientsService.getById(PatientId);

		//TODO test - curl? unit test?
		if (patientResponse == null)
		{
			return NotFound();
		}
		else
		{

			return Ok(patientResponse);
		}

	}

	[HttpGet]
	[Route("hospitalVisits")]
	//TODO should parameter names be initial upper?
	public IActionResult getPatientHospitalVisits([FromQuery] PatientHospitalVisitsRequest patientHospitalVisitsRequest)
	{
		try
		{
			List<PatientHospitalVisitResponse> patientHospitalVisits = _patientsService.getPatientHospitalVisits(patientHospitalVisitsRequest);
			return Ok(patientHospitalVisits);
		}
		catch (PatientHospitalVisitException e)
		{
			//TODO test this
			return BadRequest(e.Message);
		}

	}



	//TODO note where caches could come in handy

}