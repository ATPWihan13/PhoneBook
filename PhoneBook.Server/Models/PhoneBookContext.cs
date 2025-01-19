using Microsoft.EntityFrameworkCore;

namespace PhoneBook.Server.Models
{
    public class PhoneBookContext: DbContext
    {
        public PhoneBookContext(DbContextOptions<PhoneBookContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }
    }
}
