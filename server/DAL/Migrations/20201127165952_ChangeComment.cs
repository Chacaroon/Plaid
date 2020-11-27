using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class ChangeComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Comments");

            migrationBuilder.AddColumn<int>(
                name: "AuthorId",
                table: "Comments",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Comments");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
