using Microsoft.EntityFrameworkCore;
using System;

namespace WebApplication.Modeles
{
    public class DbAppContext : DbContext
    {
        public DbSet<Application> Applications { get; set; }
        public DbSet<Request> Requests { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=MarketingSiteDb;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Application>().ToTable("Applications");
            modelBuilder.Entity<Request>().ToTable("Requests");
        }
    }

    public class Application
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }

    public class Request
    {
        public int Id { get; set; }
        public int ApplicationId { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public DateTime ReqCompleteDate { get; set; }
        public string Description { get; set; }
    }
}
