using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Contexts
{
    public class ApplicationContext : DbContext
    {

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasData(new[] {
                new User()
                { 
                    Id = 1,
                    Name = "Vlad",
                    Email = "moransaka@gmail.com",
                    Password = "qwe123",
                    Roles = Common.Enums.RoleEnum.Admin | Common.Enums.RoleEnum.Creator
                }
            });
        }
        public DbSet<User> Users { get; set; }
    }
}
