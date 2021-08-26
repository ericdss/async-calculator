using Moq;
using System;
using System.Threading.Tasks;
using Worker.Domain.Entities;
using Worker.Domain.Enums;
using Worker.Domain.Interfaces;
using Xunit;

namespace Worker.UnitTests.Repositories
{
    public class CalculatorRepositoryTest
    {
        private readonly Mock<ICalculatorRepository> _calculatorRepositoryMock;
        public CalculatorRepositoryTest()
        {
            _calculatorRepositoryMock = new Mock<ICalculatorRepository>();
        }

        [Fact]
        public async Task GetById_ShouldReturnCalculatorFromRepository()
        {
            Calculator calculator = new Calculator("123", 5, 5, Status.Pending, DateTime.Now);
            _calculatorRepositoryMock.Setup(x => x.GetById("123")).ReturnsAsync(calculator);

            var result1 = await _calculatorRepositoryMock.Object.GetById("123");
            var result2 = await _calculatorRepositoryMock.Object.GetById("321");

            Assert.NotNull(result1);
            Assert.Null(result2);
        }

        [Fact]
        public async Task GetById_ShouldReturnNullWhenIdNotFound()
        {
            Calculator calculator = null;
            _calculatorRepositoryMock.Setup(x => x.GetById(It.IsAny<string>())).ReturnsAsync(calculator);

            var result = await _calculatorRepositoryMock.Object.GetById("123");

            Assert.Null(result);
        }
    }
}
