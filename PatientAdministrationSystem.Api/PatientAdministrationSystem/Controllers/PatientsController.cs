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

	/// <summary>
	/// Gets a patient by its unique identifier.
	/// </summary>
	/// <param name="patientId">the unique identifer of the patient</param>
	/// <returns>the patient for the unique identifier provided</returns>

	[HttpGet]
	[Route("{patientId}")]
	public IActionResult getPatient([FromRoute] Guid patientId)
	{
		PatientResponse? patientResponse = _patientsService.getById(patientId);

		if (patientResponse == null)
		{
			return NotFound();
		}
		else
		{

			return Ok(patientResponse);
		}

	}

	/// <summary>
	/// Searches for patient/hospital visits matching the criteria provided.
	/// </summary>
	/// <param name="patientHospitalVisitsRequest">The search critieria for the patient/hospital visits required.</param>
	/// <returns>the patient/hospital visits matching the criteria provided</returns>

	[HttpGet]
	[Route("hospitalVisits")]
	public IActionResult getPatientHospitalVisits([FromQuery] PatientHospitalVisitsRequest patientHospitalVisitsRequest)
	{
		try
		{
			List<PatientHospitalVisitResponse> patientHospitalVisits = _patientsService.getPatientHospitalVisits(patientHospitalVisitsRequest);
			return Ok(patientHospitalVisits);
		}
		catch (PatientHospitalVisitException e)
		{
			return BadRequest(e.Message);
		}

	}

}