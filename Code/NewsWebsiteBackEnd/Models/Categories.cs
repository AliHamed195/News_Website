using System.ComponentModel.DataAnnotations;

namespace NewsWebsiteBackEnd.Models
{
    public class Categories
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set;}
        public bool IsDeleted { get; set; } = false;
    }
}
