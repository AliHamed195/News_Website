namespace NewsWebsiteBackEnd.DTO.Article
{
    public class UpdateArticleViewModel
    {
        public string Title { get; set; }
        public string CoverImagePath { get; set; }
        public string Summary { get; set; }
        public bool IsPublished { get; set; }
        public string? Tags { get; set; }
        public string BodyStructureAsHtmlCode { get; set; }
        public string BodyStructureAsText { get; set; }
        public int CategoryId { get; set; }
    }
}
