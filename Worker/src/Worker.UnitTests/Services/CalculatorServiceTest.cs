using Moq;
using System;
using System.Threading.Tasks;
using Worker.Domain.Entities;
using Worker.Domain.Enums;
using Worker.Domain.Interfaces;
using Worker.Domain.Services;
using Xunit;

namespace Worker.UnitTests.Services
{
    public class CalculatorServiceTest
    {
        private readonly ICalculatorService _calculatorService;
        private readonly Mock<ICalculatorRepository> _calculatorRepositoryMock;
        public CalculatorServiceTest()
        {
            _calculatorRepositoryMock = new Mock<ICalculatorRepository>();
            _calculatorService = new CalculatorService(_calculatorRepositoryMock.Object);
        }

        [Fact]
        public async Task CalculateSum_ShouldCalculatureSumAndSaveResult()
        {
            Calculator calculator = new Calculator("123", 5, 5, Status.Pending, DateTime.Now);
            _calculatorRepositoryMock.Setup(x => x.GetById(It.IsAny<string>())).ReturnsAsync(calculator);

            await _calculatorService.CalculateSum("123");

            Calculator result = await _calculatorRepositoryMock.Object.GetById("123");

            Assert.Equal(10, result.Result);
            Assert.Equal("Processed", result.Status);
            Assert.NotNull(calculator.FinishDateTime);
        }
    }
}
