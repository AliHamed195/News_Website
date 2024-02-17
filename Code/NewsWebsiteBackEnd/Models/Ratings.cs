namespace NewsWebsiteBackEnd.Models
{
    public class Ratings
    {
        public int Id { get; set; }
        public int Percentage { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
