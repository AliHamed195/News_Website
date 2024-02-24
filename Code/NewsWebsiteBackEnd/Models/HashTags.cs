using System.ComponentModel.DataAnnotations;

namespace NewsWebsiteBackEnd.Models
{
    public class HashTags
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Text { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
