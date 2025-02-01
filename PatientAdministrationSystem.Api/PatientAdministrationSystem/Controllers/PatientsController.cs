using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Interfaces;
using System.Net.WebSockets;
using System;
using System.Text.Json;

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