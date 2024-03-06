namespace NewsWebsiteBackEnd.Models.ViewModels.Article
{
    public class GeneralArticleDetailsViewModel
    {
        public string CreatedById { get; set; }
        public string CreatedByFullName { get; set; }
        public string UrlAsText { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string CoverImagePath { get; set; }
        public int TotalNumberOfViews { get; set; }
        public decimal RatingAvg { get; set; }
    }
}
