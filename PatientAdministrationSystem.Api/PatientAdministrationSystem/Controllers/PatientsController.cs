using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Interfaces;
using System.Net.WebSockets;
using System;
using System.Text.Json;
using PatientAdministrationSystem.Application.Services;
using System.Diagnostics;

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
		else { 

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
			//TODO remove
			//Debug.WriteLine("hi");
			return Ok(patientHospitalVisits);
		} catch (PatientHospitalVisitException e)
		{
			//TODO test this
			return BadRequest(e.Message);
		}

	}



	//TODO note where caches could come in handy

	//TODO remove
	[HttpGet]
	[Route("hi")]
	public IActionResult test1([FromQuery] String name)
	{

		MyPatient myPatient = new MyPatient { name = name };
		return Ok(myPatient);

	}


	//TODO remove
	[HttpPost]
	[Route("hi2/{name}")]
	public String test2([FromRoute] String name)
	{
		return "hi2! " + name;
	}


}