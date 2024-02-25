namespace NewsWebsiteBackEnd.Models
{
    public class Notifications
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public ICollection<ApplicationUsersNotifications>? ApplicationUsersNotifications { get; set; }

    }
}
