using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Worker.Application.interfaces;
using Worker.Application.Services;
using Worker.Domain.Interfaces;
using Worker.Domain.Services;
using Worker.Infra.Data.Config;
using Worker.Infra.Data.Context;
using Worker.Infra.Data.Repositories;

namespace Worker.Application.Configurations
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<MongoDbConfig>(configuration.GetSection(nameof(MongoDbConfig)));
            services.AddSingleton<IMongoDbConfig>(sp => sp.GetRequiredService<IOptions<MongoDbConfig>>().Value);

            services.AddScoped<MongoContext>();

            services.AddScoped<IConsumerService, ConsumerService>();

            services.AddScoped<ICalculatorRepository, CalculatorRepository>();
            services.AddScoped<ICalculatorService, CalculatorService>();

            return services;
        }
    }
}
