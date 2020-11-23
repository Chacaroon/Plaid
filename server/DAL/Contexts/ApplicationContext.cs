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
                    Tag = "Tag",
                    Email = "moransaka@gmail.com",
                    HashPassword = "qwe123",
                    Roles = Common.Enums.RoleEnum.Admin | Common.Enums.RoleEnum.Creator
                }
            });
        }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<PostComment> PostComments{ get; set; }
    }
}
