namespace NewsWebsiteBackEnd.Models
{
    public class Posts
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CoverImagePath { get; set; }
        public string Summary { get; set;}
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get;set; }
        public bool IsDeleted { get; set; }
        public int TotalNumberOfComments { get; set; }
        public decimal RatingAvg { get; set; }
        public int TotalNumberOfRatings { get; set; }
        public int TotalNumberOfViews { get; set; }
        public string Tags { get; set; }
        public string UrlAsText { get; set; }
    }
}
