using Microsoft.EntityFrameworkCore;
using Trips.Data.Entities;

namespace Trips.Api
{
    public class TripsDbContext : DbContext
    {
        public TripsDbContext(DbContextOptions options): base(options){}

        public DbSet<Marker> Markers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Marker>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();
        }
    }
}
