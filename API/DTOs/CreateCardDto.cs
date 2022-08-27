using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateCardDto
    {
        public string English { get; set; }
        public string Vietnamese { get; set; }
        public int CategoryId { get; set; }
    }
}