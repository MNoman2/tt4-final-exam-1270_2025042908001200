using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;

namespace Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Application> Applications { get; set; }
    }
}
