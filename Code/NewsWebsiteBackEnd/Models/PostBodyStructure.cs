namespace NewsWebsiteBackEnd.Models
{
    public class PostBodyStructure
    {
        public int Id { get; set; }
        public string MediaPath { get; set; }
        public string MediaName { get; set; }
        public string MediaExtention { get; set; }
        public string MediaType { get; set; }
        public string Title { get; set; }
        public string BodyText { get; set; }
        public bool IsContainDivider { get; set; }
    }
}
