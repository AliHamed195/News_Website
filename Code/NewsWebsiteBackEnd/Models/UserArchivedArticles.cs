using Microsoft.Extensions.Hosting;

namespace NewsWebsiteBackEnd.Models
{
    public class UserArchivedArticles
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public ApplicationUsers User { get; set; }

        public int ArticleId { get; set; }
        public Article Article { get; set; }

        public DateTime ArchivedDate { get; set; } = DateTime.Now;
    }
}
