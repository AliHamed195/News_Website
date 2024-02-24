using System.ComponentModel.DataAnnotations;

namespace NewsWebsiteBackEnd.Models
{
    public class Comments
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
