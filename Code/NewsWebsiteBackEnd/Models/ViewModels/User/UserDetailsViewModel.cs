namespace NewsWebsiteBackEnd.Models.ViewModels.User
{
    public class UserDetailsViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; }
    }
}
