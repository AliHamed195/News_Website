namespace NewsWebsiteBackEnd.Models
{
    public class ApplicationUsersNotifications
    {
        public int Id { get; set; }

        public int NotificationsId { get; set; }
        public Notifications Notification { get; set; }

        public string FromUserId { get; set; }
        public ApplicationUsers FromUser { get; set; }

        public string ToUserId { get; set; }
        public ApplicationUsers ToUser { get; set; }

        public bool IsRead { get; set; } = false;
        public bool IsArchived { get; set; } = false;
        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
