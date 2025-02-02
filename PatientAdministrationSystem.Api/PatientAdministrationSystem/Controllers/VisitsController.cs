using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Interfaces;
using System.Net.WebSockets;
using System;
using System.Text.Json;
using PatientAdministrationSystem.Application.Services;

namespace Hci.Ah.Home.Api.Gateway.Controllers.Visits;

[Route("api/visits")]
[ApiExplorerSettings(GroupName = "Visits")]
[ApiController]
public class VisitsController : ControllerBase
{
	private readonly IVisitsService _visitsService;

	public VisitsController(IVisitsService visitsService)
	{
		_visitsService = visitsService;
	}

	// Define your API contracts here

	[HttpGet]
	[Route("{VisitId}")]
	public IActionResult getVisit([FromRoute] Guid VisitId)
	{
		VisitResponse? visitResponse = _visitsService.getById(VisitId);

		//TODO test - curl? unit test?
		if (visitResponse == null)
		{
			return NotFound();
		}
		else
		{

			return Ok(visitResponse);
		}


	}

}