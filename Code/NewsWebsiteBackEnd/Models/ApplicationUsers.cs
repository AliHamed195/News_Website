using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NewsWebsiteBackEnd.Classes.Names;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsWebsiteBackEnd.Models
{
    public class ApplicationUsers : IdentityUser
    {
        [StringLength(100)]
        public string FullName { get; set; }
        [StringLength(100)]
        public string? Country { get; set; }
        [Column(TypeName = "json")]
        public string? ProfileImagePath { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsBlocked { get; set; } = false;
        [StringLength(10)]
        public string WebsiteLanguage { get; set; } = LanguageOptions.English;

        public int UserTypeId { get; set; }
        public UserTypes UserType { get; set; }

        public ICollection<Categories>? Categories { get; set; }
        public ICollection<ApplicationUsersNotifications>? ApplicationUsersNotificationsFromUser { get; set; }
        public ICollection<ApplicationUsersNotifications>? ApplicationUsersNotificationsToUser { get; set; }
        public ICollection<Article>? Articles { get; set; }
        public ICollection<HashTags>? HashTags { get; set; }
        public ICollection<QuestionsAnswers>? QuestionsAnswers { get; set; }
        public ICollection<Ratings>? Ratings { get; set; }
        public ICollection<UserArchivedArticles>? UserArchivedArticles { get; set; }
    }
}
