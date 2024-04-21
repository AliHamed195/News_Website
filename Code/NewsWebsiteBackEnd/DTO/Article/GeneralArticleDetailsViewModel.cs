namespace NewsWebsiteBackEnd.DTO.Article
{
    public class GeneralArticleDetailsViewModel
    {
        public string CreatedById { get; set; }
        public string CreatedByFullName { get; set; }
        public string UrlAsText { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string CoverImagePath { get; set; }
        public string Location { get; set; }
        public int TotalNumberOfViews { get; set; }
        public double RatingAvg { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsPublished { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
    }
}
