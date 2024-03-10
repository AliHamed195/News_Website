namespace NewsWebsiteBackEnd.DTO.Role
{
    public class EditRoleViewModel
    {
        public string RoleId { get; set; }
        public string NewRoleName { get; set; }
        public List<string> Permissions { get; set; }
    }
}
