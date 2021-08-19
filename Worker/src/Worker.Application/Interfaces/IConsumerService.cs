using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Worker.Application.interfaces
{
    public interface IConsumerService
    {
        void Run();
    }
}
