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
        public DbSet<Posts> Posts { get; set; }
        public DbSet<HashTags> HashTags { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Ratings> Ratings { get; set; }
    }
}
