using NUnit.Framework;
using System.Collections.Generic;
using System.Text.Json;

namespace ApiTests
{

	/// <summary>
	/// Tests calls to the Patients API.
	/// </summary>

	[TestFixture]
	public class PatientsApiTests
	{
		private HttpClient _client;

		//Only run once for this class - otherwise there are problems with duplicate keys for data
		[OneTimeSetUp]
		public void OneTimeSetUp()
		{
			// Setup the WebApplicationFactory to spin up the API
			var factory = new CustomWebApplicationFactory<Program>(); // Assuming 'Program' is your startup class
			_client = factory.CreateClient();
		}

		[Test]
		public async Task getPatient_Found()
		{

			// Arrange
			var requestUrl = "/api/patients/c00b9ff3-b1b6-42fe-8b5a-4c28408fb64a";

			// Act
			var response = await _client.GetAsync(requestUrl);

			// Assert
			var content = await response.Content.ReadAsStringAsync();
			Dictionary<string, string> data = JsonSerializer.Deserialize<Dictionary<string, string>>(content);

			//Call should be successful
			Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));

			//check some of the retrieved details
			Assert.That(data.GetValueOrDefault("firstName"), Is.EqualTo("John"));
			Assert.That(data.GetValueOrDefault("lastName"), Is.EqualTo("Sweeney"));


		}

		[Test]
		public async Task getPatient_NotFound()
		{
			// Arrange
			var requestUrl = "/api/patients/00000000-0000-0000-0000-000000000000";

			// Act
			var response = await _client.GetAsync(requestUrl);

			// Assert
			//Call should result in not found
			Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.NotFound));


		}


		[Test]
		public async Task getPatient_InvalidGuid()
		{
			// Arrange
			var requestUrl = "/api/patients/not-a-guid";

			// Act
			var response = await _client.GetAsync(requestUrl);

			// Assert
			//Call should result in a bad request
			Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.BadRequest));
			var content = await response.Content.ReadAsStringAsync();

			Assert.That(content, Does.Contain("The value 'not-a-guid' is not valid."));

		}


		[Test]
		public async Task getPatientHospitalVisits_OneFound()
		{

			// Arrange
			var requestUrl = "api/patients/hospitalVisits?PatientLastNamePrefix=Swee";

			// Act
			var response = await _client.GetAsync(requestUrl);

			// Assert
			var content = await response.Content.ReadAsStringAsync();
			List<Object> data = JsonSerializer.Deserialize<List<Object>>(content);

			//Call should be successful
			Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));

			//check number of records found
			Assert.That(data, Has.Count.EqualTo(1));

		}

		[Test]
		public async Task getPatientHospitalVisits_MultipleFound()
		{

			// Arrange
			var requestUrl = "api/patients/hospitalVisits?PatientLastNamePrefix=S";

			// Act
			var response = await _client.GetAsync(requestUrl);

			// Assert
			var content = await response.Content.ReadAsStringAsync();
			List<Object> data = JsonSerializer.Deserialize<List<Object>>(content);

			//Call should be successful
			Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));

			//check number of records found
			Assert.That(data, Has.Count.EqualTo(4));

		}

		[Test]
		public async Task getPatientHospitalVisits_NoneFound()
		{

			// Arrange
			var requestUrl = "api/patients/hospitalVisits?PatientLastNamePrefix=NotAPatient";

			// Act
			var response = await _client.GetAsync(requestUrl);

			// Assert
			var content = await response.Content.ReadAsStringAsync();
			List<Object> data = JsonSerializer.Deserialize<List<Object>>(content);

			//Call should be successful
			Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));

			//check number of records found
			Assert.That(data, Has.Count.EqualTo(0));

		}

		[Test]
		public async Task getPatientHospitalVisits_MissingLastNamePrefix()
		{

			// Arrange
			var requestUrl = "api/patients/hospitalVisits";

			// Act
			var response = await _client.GetAsync(requestUrl);

			//Call should result in a bad request
			Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.BadRequest));
			var content = await response.Content.ReadAsStringAsync();

			Assert.That(content, Is.EqualTo("The prefix for the patient's last name must be populated"));


		}

		//NB more tests for e.g.:
		//* the various search parameters to  getPatientHospitalVisits
		//* test case-insensitive search
		//* whitespace trimming

	}
}
