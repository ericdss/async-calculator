using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Worker.Domain.Entities;
using Worker.Domain.Interfaces;

namespace Worker.Domain.Services
{
    public class CalculatorService : ICalculatorService
    {
        private readonly ICalculatorRepository _calculatorRepository;
        public CalculatorService(ICalculatorRepository calculatorRepository)
        {
            _calculatorRepository = calculatorRepository;
        }

        public async Task CalculateSum(string id)
        {
            try
            {
                Calculator calculator = await _calculatorRepository.GetById(id);

                if (calculator == null) return;

                // Altera o status para "Processing"
                calculator.StartHandling();
                await _calculatorRepository.Save(id, calculator);

                // Aguarda 2seg
                System.Threading.Thread.Sleep(2000);

                // Soma
                calculator.Sum();
                await _calculatorRepository.Save(id, calculator);
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }

        }
    }
}
