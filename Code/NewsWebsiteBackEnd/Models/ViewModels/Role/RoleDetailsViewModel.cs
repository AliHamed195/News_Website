namespace NewsWebsiteBackEnd.Models.ViewModels.Role
{
    public class RoleDetailsViewModel
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public List<string> Permissions { get; set; }
    }
}
