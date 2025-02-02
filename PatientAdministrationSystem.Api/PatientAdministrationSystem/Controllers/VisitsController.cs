using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Interfaces;
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
	[Route("{visitId}")]
	public IActionResult getVisit([FromRoute] Guid visitId)
	{
		VisitResponse? visitResponse = _visitsService.getById(visitId);

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