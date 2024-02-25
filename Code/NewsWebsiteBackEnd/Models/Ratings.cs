namespace NewsWebsiteBackEnd.Models
{
    public class Ratings
    {
        public int Id { get; set; }
        public int Percentage { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;

        public string CreatedById { get; set; }
        public ApplicationUsers CreatedByUser { get; set; }

        public int ArticleId { get; set; }
        public Article Article { get; set; }
    }
}
