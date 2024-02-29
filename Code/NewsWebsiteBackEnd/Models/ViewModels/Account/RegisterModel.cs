using System.ComponentModel.DataAnnotations;

namespace NewsWebsiteBackEnd.Models.ViewModels.Account
{
    public class RegisterModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public string FullName { get; set; }
    }
}
