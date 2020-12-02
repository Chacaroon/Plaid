using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class AddSubName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubscriptionLevels_Users_CreatorId",
                table: "SubscriptionLevels");

            migrationBuilder.AlterColumn<int>(
                name: "CreatorId",
                table: "SubscriptionLevels",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "SubscriptionLevels",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SubscriptionLevels_Users_CreatorId",
                table: "SubscriptionLevels",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubscriptionLevels_Users_CreatorId",
                table: "SubscriptionLevels");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "SubscriptionLevels");

            migrationBuilder.AlterColumn<int>(
                name: "CreatorId",
                table: "SubscriptionLevels",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SubscriptionLevels_Users_CreatorId",
                table: "SubscriptionLevels",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
