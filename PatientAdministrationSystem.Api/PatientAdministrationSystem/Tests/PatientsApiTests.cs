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

		[SetUp]
		public void Setup()
		{
			//TODO remove
			Debug.WriteLine("setup called");

			// Setup the WebApplicationFactory to spin up the API
			var factory = new CustomWebApplicationFactory<Program>(); // Assuming 'Program' is your startup class
			_client = factory.CreateClient();
		}

		[Test]
		public async Task GetPatient_Found()
		{
			// Arrange
			var requestUrl = "/api/patients/c00b9ff3-b1b6-42fe-8b5a-4c28408fb64a";

			// Act
			var response = await _client.GetAsync(requestUrl);

			// Assert
			var content = await response.Content.ReadAsStringAsync();
			Dictionary<string, string> data = JsonSerializer.Deserialize<Dictionary<string, string>>(content);

			//Call should be successful
			Microsoft.VisualStudio.TestTools.UnitTesting .Assert.IsTrue(response.IsSuccessStatusCode);

			//check some of the retrieved details
			Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual("John", data.GetValueOrDefault("firstName"));
			Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual("Sweeney", data.GetValueOrDefault("lastName"));
		}

		[Test]
		public async Task GetPatient_NotFound()
		{
			// Arrange
			var requestUrl = "/api/patients/00000000-0000-0000-0000-000000000000";

			// Act
			var response = await _client.GetAsync(requestUrl);

			// Assert
			//Call should result in not found
			Microsoft.VisualStudio.TestTools.UnitTesting.Assert.AreEqual(System.Net.HttpStatusCode.NotFound, response.StatusCode);

		}
				
	}
}
