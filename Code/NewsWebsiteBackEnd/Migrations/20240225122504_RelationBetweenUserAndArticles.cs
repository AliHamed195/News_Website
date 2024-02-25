using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsWebsiteBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class RelationBetweenUserAndArticles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Articles",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_CreatedById",
                table: "Articles",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_AspNetUsers_CreatedById",
                table: "Articles",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_AspNetUsers_CreatedById",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_CreatedById",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Articles");
        }
    }
}
