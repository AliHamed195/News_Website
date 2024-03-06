using System.ComponentModel.DataAnnotations;

namespace NewsWebsiteBackEnd.Models.ViewModels.Category
{
    public class CategoryDetailsViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedById { get; set; }
        public string UserFullName { get; set; }
        public int ArticlesCount { get; set; }
    }
}
