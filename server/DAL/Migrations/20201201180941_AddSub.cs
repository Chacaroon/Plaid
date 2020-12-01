using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class AddSub : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubscriptionLevelId",
                table: "Posts",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SubscriptionLevels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cost = table.Column<float>(nullable: false),
                    CreatorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionLevels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubscriptionLevels_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    SubscriptionLevelId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_SubscriptionLevels_SubscriptionLevelId",
                        column: x => x.SubscriptionLevelId,
                        principalTable: "SubscriptionLevels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Subscriptions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_SubscriptionLevelId",
                table: "Posts",
                column: "SubscriptionLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionLevels_CreatorId",
                table: "SubscriptionLevels",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_SubscriptionLevelId",
                table: "Subscriptions",
                column: "SubscriptionLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_UserId",
                table: "Subscriptions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_SubscriptionLevels_SubscriptionLevelId",
                table: "Posts",
                column: "SubscriptionLevelId",
                principalTable: "SubscriptionLevels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_SubscriptionLevels_SubscriptionLevelId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "SubscriptionLevels");

            migrationBuilder.DropIndex(
                name: "IX_Posts_SubscriptionLevelId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "SubscriptionLevelId",
                table: "Posts");
        }
    }
}
