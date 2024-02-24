using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using NewsWebsiteBackEnd.Classes;
using System.ComponentModel.DataAnnotations;

namespace NewsWebsiteBackEnd.Models
{
    public class ApplicationUsers : IdentityUser
    {
        [StringLength(100)]
        public string FullName { get; set; }
        [StringLength(100)]
        public string? Country { get; set; }
        [StringLength(255)]
        public string? ProfileImagePath { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsBlocked { get; set; } = false;
        [StringLength(10)]
        public string WebsiteLanguage { get; set; } = LanguageOptions.English;
    }
}
