namespace NewsWebsiteBackEnd.DTO.QuestionAnswer
{
    public class QuestionAnswerDetailsViewModel
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedById { get; set; }
        public string UserFullName { get; set; }
    }
}
