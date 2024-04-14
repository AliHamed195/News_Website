namespace NewsWebsiteBackEnd.DTO.User
{
    public class CreateUserViewModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public int UserTypeId { get; set; }
        public string? Country { get; set; }
        public string? ProfileImagePath { get; set; }
        public string WebsiteLanguage { get; set; }
    }
}
