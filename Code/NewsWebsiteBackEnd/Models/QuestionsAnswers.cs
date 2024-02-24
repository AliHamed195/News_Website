namespace NewsWebsiteBackEnd.Models
{
    public class QuestionsAnswers
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
