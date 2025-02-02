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
	[HttpGet]
	[Route("{HospitalId}")]
	//TODO should parameter names be initial upper?
	public IActionResult getHospital([FromRoute] Guid HospitalId)
	{
		HospitalResponse hospitalResponse = _hospitalsService.getById(HospitalId);

		//TODO test - curl? unit test?
		if (hospitalResponse == null)
		{
			return NotFound();
		}
		else
		{

			return Ok(hospitalResponse);
		}


	}

}