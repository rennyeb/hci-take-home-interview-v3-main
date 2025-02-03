using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.Routing;
using NUnit.Framework;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text.Json;

namespace ApiTests
{

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
			NUnit.Framework.Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));

			//check some of the retrieved details
			Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual("John", data.GetValueOrDefault("firstName"));
			Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual("Sweeney", data.GetValueOrDefault("lastName"));

			NUnit.Framework.Assert.That(data.GetValueOrDefault("firstName"), Is.EqualTo("John"));
			NUnit.Framework.Assert.That(data.GetValueOrDefault("lastName"), Is.EqualTo("Sweeney"));


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
			NUnit.Framework.Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.NotFound));


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
			NUnit.Framework.Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.BadRequest));
			var content = await response.Content.ReadAsStringAsync();

			NUnit.Framework.Assert.That(content, Does.Contain("The value 'not-a-guid' is not valid."));



		}

		//TODO some visit searches, look at curl scripts

	}
}
