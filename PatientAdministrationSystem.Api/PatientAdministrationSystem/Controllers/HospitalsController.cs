using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Interfaces;
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

	//NB if there is a large amount of rarely-changing data (e.g. hospitals), there could be a use for a cache (with a suitable invalidation strategy).

	[HttpGet]
	[Route("")]
	public IActionResult getHospitals()
	{
		List<HospitalResponse> hospitalResponses = _hospitalsService.getAll();
		return Ok(hospitalResponses);

	}

	[HttpGet]
	[Route("{hospitalId}")]
	public IActionResult getHospital([FromRoute] Guid hospitalId)
	{
		HospitalResponse? hospitalResponse = _hospitalsService.getById(hospitalId);

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