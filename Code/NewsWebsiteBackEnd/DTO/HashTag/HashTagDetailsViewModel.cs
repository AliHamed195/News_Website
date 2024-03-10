namespace NewsWebsiteBackEnd.DTO.HashTag
{
    public class HashTagDetailsViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedById { get; set; }
        public string UserFullName { get; set; }
    }
}
