namespace NewsWebsiteBackEnd.DTO.Role
{
    public class RoleDetailsViewModel
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public List<string> Permissions { get; set; }
    }
}
