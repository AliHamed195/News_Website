namespace NewsWebsiteBackEnd.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CoverImagePath { get; set; }
        public string Summary { get; set;}
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get;set; }
        public bool IsDeleted { get; set; } = false;
        public int TotalNumberOfComments { get; set; } = 0;
        public decimal RatingAvg { get; set; } = 0.0m;
        public int TotalNumberOfRatings { get; set; } = 0;
        public int TotalNumberOfViews { get; set; } = 0;
        public string? Tags { get; set; }
        public string UrlAsText { get; set; }
    }
}
