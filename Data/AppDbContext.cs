using Microsoft.EntityFrameworkCore;
using sales_order.Clients.Models;
using sales_order.Items.Models;

namespace sales_order.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt) { }

        public DbSet<Item> Items { get; set; }
        public DbSet<Client> Clients { get; set; }
    }
}
