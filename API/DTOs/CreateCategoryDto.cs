using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateCategoryDto
    {
        public string Name { get; set; }
        public bool? IsMain { get; set; } = false;
    }
}