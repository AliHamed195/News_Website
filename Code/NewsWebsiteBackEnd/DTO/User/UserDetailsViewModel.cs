namespace NewsWebsiteBackEnd.DTO.User
{
    public class UserDetailsViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string? Country { get; set; }
        public string? ProfileImagePath { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsBlocked { get; set; }
        public string WebsiteLanguage { get; set; }
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; }
    }
}
