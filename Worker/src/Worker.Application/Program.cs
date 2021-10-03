using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using Worker.Application.Configurations;
using Worker.Application.Services;

namespace Worker.Application
{
    class Program
    {
        static void Main()
        {
            IConfiguration configuration = BuildConfig.AddBuildConfig(new ConfigurationBuilder());

            var host = Host.CreateDefaultBuilder()
                            .ConfigureServices((context, services) =>
                            {
                                services.ResolveDependencies(configuration);
                            })
                            .Build();

            System.Threading.Tasks.Task.Delay(10000).Wait(); // Hack to give the RabbitMQ container more time to initialize

            // Consumers
            var consumer = ActivatorUtilities.CreateInstance<ConsumerService>(host.Services);
            consumer.Run(queueName: "sum", workers: 3);
        }

        
    }
}