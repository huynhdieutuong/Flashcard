using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Card
    {
        public int Id { get; set; }
        public string English { get; set; }
        public string Vietnamese { get; set; }
        public int CategoryId { get; set; }
        public string OwnerId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime ModifiedDate { get; set; } = DateTime.UtcNow;
    }
}