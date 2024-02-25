using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsWebsiteBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class RelationBetweenRatingsAndUsersAndArticles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArticleId",
                table: "Ratings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Ratings",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUserId",
                table: "Ratings",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_ArticleId",
                table: "Ratings",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_CreatedByUserId",
                table: "Ratings",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Articles_ArticleId",
                table: "Ratings",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_AspNetUsers_CreatedByUserId",
                table: "Ratings",
                column: "CreatedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Articles_ArticleId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_AspNetUsers_CreatedByUserId",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_ArticleId",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_CreatedByUserId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "Ratings");
        }
    }
}
