using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Worker.Application.DTO
{
    public class EntityDTO
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
    }
}
