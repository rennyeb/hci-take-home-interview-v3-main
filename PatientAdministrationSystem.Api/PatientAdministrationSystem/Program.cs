using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;
using PatientAdministrationSystem.Application.Services;
using PatientAdministrationSystem.Infrastructure;
using PatientAdministrationSystem.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(
		policy =>
		{
			policy
				.WithOrigins(builder.Configuration.GetSection("AllowedHosts").Get<string>()!)
				.AllowAnyHeader()
				.AllowAnyMethod();
		});
});


builder.Services.AddScoped<IPatientsRepository, PatientsRepository>();
builder.Services.AddScoped<IHospitalsRepository, HospitalsRepository>();
builder.Services.AddScoped<IPatientsService, PatientsService>();

//Added during coding exercise
builder.Services.AddScoped<IVisitsRepository, VisitsRepository>();
builder.Services.AddScoped<IHospitalsService, HospitalsService>();
builder.Services.AddScoped<IVisitsService, VisitsService>();

builder.Services.AddDbContext<HciDataContext>(options =>
	options.UseInMemoryDatabase("InMemoryDatabase"));


builder.Services.AddResponseCompression(options => { options.EnableForHttps = true; });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddHttpContextAccessor();

builder.Services.AddSwaggerGen(options =>
{
	options.SwaggerDoc("v1", new OpenApiInfo
	{
		Version = "v1",
		Title = "HCI Home Api"
	});

	options.TagActionsBy(api =>
	{
		if (api.GroupName != null) return new[] { api.GroupName };

		if (api.ActionDescriptor is ControllerActionDescriptor controllerActionDescriptor)
			return new[] { controllerActionDescriptor.ControllerName };

		throw new InvalidOperationException("Unable to determine tag for endpoint.");
	});

	options.DocInclusionPredicate((_, _) => true);
});

builder.Services.AddHealthChecks();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
	var dbContext = serviceScope.ServiceProvider.GetRequiredService<HciDataContext>();

	// In real world do a proper migration, but here's the test data

	dbContext.Hospitals.Add(new HospitalEntity
	{
		Id = new Guid("ff0c022e-1aff-4ad8-2231-08db0378ac98"),
		Name = "Default hospital"
	});


	dbContext.Patients.Add(new PatientEntity
	{
		Id = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb64a"),
		FirstName = "John",
		LastName = "Sweeney",
		Email = "john.sweeney@hci.care.com",
		PatientHospitals = new List<PatientHospitalRelation>
		{
			new()
			{
				PatientId = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb64a"),
				HospitalId = new Guid("ff0c022e-1aff-4ad8-2231-08db0378ac98"),
				VisitId = new Guid("a7a5182a-995c-4bce-bce0-6038be112b7b")
			}
		}
	});
	dbContext.Patients.Add(
		new PatientEntity
		{
			Id = new Guid("1ec2d3f7-8aa8-4bf5-91b8-045378919049"),
			FirstName = "Vinny",
			LastName = "Lawlor",
			Email = "vinny.lawlor@hci.care"
		});

	dbContext.Visits.Add(
		new VisitEntity
		{
			Id = new Guid("a7a5182a-995c-4bce-bce0-6038be112b7b"),
			Date = new DateTime(2023, 08, 22)
		});


	{
		// Extra test data added
		dbContext.Hospitals.Add(new HospitalEntity
		{
			Id = new Guid("9ca78c33-4590-43c1-a7c4-55696a5efd46"),
			Name = "St Vincent's"
		});
		dbContext.Hospitals.Add(new HospitalEntity
		{
			Id = new Guid("9ca78c33-4590-43c1-a7c4-55696a5efd45"),
			Name = "St James's",
		});

		dbContext.Patients.Add(new PatientEntity
		{
			Id = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb640"),
			FirstName = "Jane",
			LastName = "Smith",
			Email = "jane.smith@someorg.com",
			PatientHospitals = new List<PatientHospitalRelation>
		{
			new()
			{
				PatientId = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb640"),
				HospitalId = new Guid("9ca78c33-4590-43c1-a7c4-55696a5efd46"),
				VisitId = new Guid("a7a5182a-995c-4bce-bce0-6038be112b70")
			}
		}
		});
		dbContext.Visits.Add(
			new VisitEntity
			{
				Id = new Guid("a7a5182a-995c-4bce-bce0-6038be112b70"),
				Date = new DateTime(2025, 01, 01)
			});


		dbContext.Patients.Add(new PatientEntity
		{
			Id = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb641"),
			FirstName = "Bill",
			LastName = "Smith",
			Email = "bill.smith@someorg.com",
			PatientHospitals = new List<PatientHospitalRelation>
		{
			//Bill has 2 visits to the hospital - there is no guarantee what order they are retrieved in, so it's up to clients of this API to do any required sorting
			{
				new()
				{
					PatientId = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb641"),
					HospitalId = new Guid("9ca78c33-4590-43c1-a7c4-55696a5efd45"),
					VisitId = new Guid("a7a5182a-995c-4bce-bce0-6038be112b71")
				}
			},
			{
				new()
				{
					PatientId = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb641"),
					HospitalId = new Guid("9ca78c33-4590-43c1-a7c4-55696a5efd45"),
					VisitId = new Guid("a7a5182a-995c-4bce-bce0-6038be112b72")
				}
			}
		}
		});
		dbContext.Visits.Add(
			new VisitEntity
			{
				Id = new Guid("a7a5182a-995c-4bce-bce0-6038be112b71"),
				Date = new DateTime(2025, 01, 02)
			});
		dbContext.Visits.Add(
			new VisitEntity
			{
				Id = new Guid("a7a5182a-995c-4bce-bce0-6038be112b72"),
				Date = new DateTime(2025, 01, 04)
			});


		//Test data with intentionally-invalid foreign keys from the PatientHospitals data to related entities
		dbContext.Patients.Add(new PatientEntity
		{
			Id = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb643"),
			FirstName = "Wendy",
			LastName = "O'Connor",
			Email = "wendy.oconnor@someorg.com",
			PatientHospitals = new List<PatientHospitalRelation>
			{
				new()
				{
					//Bad foreign keys
					PatientId = new Guid("9ca78c33-4590-43c1-a7c4-55696a5efd45"),
					HospitalId = new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb641"),
					VisitId =  new Guid("c00b9ff3-b1b6-42fe-8b5a-4c28408fb641")
				}
			}

		});

		//End of extra data added
	}


	dbContext.SaveChanges();
}


app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();

app.UseResponseCompression();

app.MapControllers();

app.Run();