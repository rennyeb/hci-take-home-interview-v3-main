using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.Routing;
using NUnit.Framework;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ApiTests
{

	//TODO rename class and file

	[TestFixture]
	public class GreetingsApiTests
	{
		private HttpClient _client;

		[SetUp]
		public void Setup()
		{
			// Setup the WebApplicationFactory to spin up the API
			var factory = new CustomWebApplicationFactory<Program>(); // Assuming 'Program' is your startup class
			_client = factory.CreateClient();
		}

		[Test]
		public async Task GetGreeting_ShouldReturnSuccessStatusCode()
		{
			// Arrange
			var requestUrl = "/api/greetings/hello";

			// Act
			var response = await _client.GetAsync(requestUrl);

			Debug.WriteLine(response);

			// Assert
			Microsoft.VisualStudio.TestTools.UnitTesting .Assert.IsTrue(response.IsSuccessStatusCode);
			//Assert.AreEqual(System.Net.HttpStatusCode.OK, response.StatusCode);
		}

		//[Test]
		//public async Task GetGreeting_ShouldReturnCorrectMessage()
		//{
		//	// Arrange
		//	var requestUrl = "/api/greetings/hello";

		//	// Act
		//	var response = await _client.GetAsync(requestUrl);
		//	var content = await response.Content.ReadAsStringAsync();

		//	// Assert
		//	//Assert.AreEqual("{\"message\":\"Hello, World!\"}", content);
		//}
	}
}
