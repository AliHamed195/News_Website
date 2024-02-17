namespace NewsWebsiteBackEnd.Models
{
    public class HashTags
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
