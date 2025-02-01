using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Interfaces;
using System.Net.WebSockets;
using System;
using System.Text.Json;
using PatientAdministrationSystem.Application.Services;

namespace Hci.Ah.Home.Api.Gateway.Controllers.Hospitals;

[Route("api/hospitals")]
[ApiExplorerSettings(GroupName = "Hospitals")]
[ApiController]
public class HospitalsController : ControllerBase
{
	private readonly IHospitalsService _hospitalsService;

	public HospitalsController(IHospitalsService hospitalsService)
	{
		_hospitalsService = hospitalsService;
	}

	// Define your API contracts here

	//TODO note where caches could come in handy

	// lists all hospitals, sorted by name in ascending order
	[HttpGet]
	//[Route]
	public IActionResult getHospitals()
	{

		//TODO how to return a list? And does it get converted to json ok?  TODO test with curl
		//TODO let the service layer do the sorting, or do it here?

		//TODO get from the service
		//TODO what code package for the response/result classes?

		List<HospitalResponse> hospitals = _hospitalsService.getAll();
		return Ok(hospitals);

	}


}