using Microsoft.EntityFrameworkCore;

namespace AngularApp.Server.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
               : base(options)
        {
        }
        DbSet<Job> Jobs { get; set; }

    }

}
