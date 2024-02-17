namespace NewsWebsiteBackEnd.Models
{
    public class Categories
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set;}
        public bool IsDeleted { get; set; }
    }
}
