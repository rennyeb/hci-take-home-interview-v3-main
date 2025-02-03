using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class CustomWebApplicationFactory<TEntryPoint> : WebApplicationFactory<TEntryPoint>
	where TEntryPoint : class
{
	protected override void ConfigureWebHost(IWebHostBuilder builder)
	{
		builder.ConfigureAppConfiguration((context, config) =>
		{
			var settings = new Dictionary<string, string>
			{
				{ "AllowedHosts", "*" } // Allow all hosts
            };

			config.AddInMemoryCollection(settings);
		});

		builder.ConfigureServices(services =>
		{
			// Optionally customize services for testing
		});
	}
}
