using System;
using Worker.Domain.Entities;
using Worker.Domain.Enums;
using Xunit;

namespace Worker.UnitTests.Entities
{
    public class CalculatorTest
    {
        [Theory]
        [InlineData(89,287)]
        [InlineData(-9999999,5)]
        [InlineData(-1,1)]
        public void Sum_ShouldSumAndSetStatusAsProcessed(double number1, double number2)
        {
            Calculator calculator = new Calculator("123", number1, number2, Status.Pending, DateTime.Now);

            double soma = number1 + number2;

            calculator.Sum();

            Assert.Equal(soma, calculator.Result);
            Assert.Equal("Processed", calculator.Status);
        }

        [Fact]
        public void StartHandling_ShouldSetStatusAsProcessing()
        {
            Calculator calculator = new Calculator("123", 89, 287, Status.Pending, DateTime.Now);

            calculator.StartHandling();

            Assert.Equal("Processing", calculator.Status);
        }
    }
}
