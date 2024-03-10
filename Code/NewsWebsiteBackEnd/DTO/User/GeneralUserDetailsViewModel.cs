namespace NewsWebsiteBackEnd.DTO.User
{
    public class GeneralUserDetailsViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; }
    }
}
