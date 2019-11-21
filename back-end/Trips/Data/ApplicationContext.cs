using System;
using Microsoft.EntityFrameworkCore;

namespace Trips.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        public DbSet<Marker> Markers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Marker>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();
        }
    }
}
