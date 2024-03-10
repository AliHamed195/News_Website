using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.Models;

namespace NewsWebsiteBackEnd.Context
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        public DbSet<ApplicationUsers> Users { get; set; }
        public DbSet<UserTypes> UserTypes { get; set; }
        public DbSet<QuestionsAnswers> QuestionsAnswers { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<HashTags> HashTags { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Ratings> Ratings { get; set; }
        public DbSet<Notifications> Notifications { get; set; }
        public DbSet<ApplicationUsersNotifications> ApplicationUsersNotifications { get; set; }
        public DbSet<UserArchivedArticles> UserArchivedArticles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUsers>()
                .HasMany(e => e.ApplicationUsersNotificationsFromUser)
                .WithOne(e => e.FromUser)
                .HasForeignKey(e => e.FromUserId)
                .IsRequired();

            modelBuilder.Entity<ApplicationUsers>()
                .HasMany(e => e.ApplicationUsersNotificationsToUser)
                .WithOne(e => e.ToUser)
                .HasForeignKey(e => e.ToUserId)
                .IsRequired();

            modelBuilder.Entity<Notifications>()
                .HasMany(n => n.ApplicationUsersNotifications)
                .WithOne(aun => aun.Notification)
                .HasForeignKey(aun => aun.NotificationsId)
                .IsRequired();

            modelBuilder.Entity<Article>(entity =>
            {
                entity.Property(e => e.BodyStructureAsHtmlCode).HasColumnType("LONGTEXT");
                entity.Property(e => e.BodyStructureAsText).HasColumnType("LONGTEXT");
                entity.HasIndex(e => e.UrlAsText).IsUnique();
            });
        }

    }
}
