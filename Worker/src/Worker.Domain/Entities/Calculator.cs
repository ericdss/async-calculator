using MongoDB.Bson.Serialization.Attributes;
using System;
using Worker.Domain.Enums;

namespace Worker.Domain.Entities
{
    [BsonIgnoreExtraElements]
    public class Calculator: Entity
    {
        [BsonElement(elementName: "number1")]
        public double Number1 { get; private set; }

        [BsonElement(elementName: "number2")]
        public double Number2 { get; private set; }

        [BsonElement(elementName: "status")]
        public string Status { get; private set; }

        [BsonElement(elementName: "result")]
        public double? Result { get; private set; }

        [BsonElement(elementName: "creationDateTime")]
        public DateTime CreationDateTime { get; private set; }

        [BsonElement(elementName: "finishDateTime")]
        public DateTime? FinishDateTime { get; private set; }

        public Calculator(string id, double number1, double number2, Status status, DateTime creationDateTime): base(id)
        {
            Number1 = number1;
            Number2 = number2;
            Status = status.ToString();
            CreationDateTime = creationDateTime;
        }

        public void Sum()
        {
            Result = Number1 + Number2;
            Finish();
        }

        public void StartHandling()
        {
            this.Status = Worker.Domain.Enums.Status.Processing.ToString();
        }

        private void Finish()
        {
            FinishDateTime = DateTime.Now;
            Status = Worker.Domain.Enums.Status.Processed.ToString();
        }


    }
}
