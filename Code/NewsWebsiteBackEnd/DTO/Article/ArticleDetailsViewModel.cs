namespace NewsWebsiteBackEnd.DTO.Article
{
    public class ArticleDetailsViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CoverImagePath { get; set; }
        public string Summary { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsPublished { get; set; } = false;
        public int TotalNumberOfComments { get; set; } 
        public double RatingAvg { get; set; }
        public int TotalNumberOfRatings { get; set; } 
        public int TotalNumberOfViews { get; set; } 
        public string? Tags { get; set; }
        public string UrlAsText { get; set; }
        public string Location { get; set; }
        public string BodyStructureAsHtmlCode { get; set; }
        public string BodyStructureAsText { get; set; }
        public string CreatedById { get; set; }
        public string CreatedByFullName { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public bool IsRatedByCurrentUser { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
    }
}
