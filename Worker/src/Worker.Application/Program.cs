using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading;
using Worker.Application.Configurations;
using Worker.Application.DTO;
using Worker.Application.interfaces;
using Worker.Application.Services;
using Worker.Domain.Interfaces;
using Worker.Domain.Services;
using Worker.Infra.Data.Repositories;

// DI, Settings

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

            // Consumers
            var consumer = ActivatorUtilities.CreateInstance<ConsumerService>(host.Services);
            consumer.Run(queueName: "sum", workers: 3);

        }

        
    }
}