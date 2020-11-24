using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class AddComment1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "PostComments");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "PostComments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "PostComments");

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "PostComments",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
