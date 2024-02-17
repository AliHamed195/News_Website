namespace NewsWebsiteBackEnd.Models
{
    public class ApplicationUsers
    {
        public string Country { get; set; }
        public string ProfileImagePath { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsBlocked { get; set; }
    }
}
