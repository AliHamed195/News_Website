using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsWebsiteBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class AddingBodyForArticleModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BodyStructureAsHtmlCode",
                table: "Articles",
                type: "LONGTEXT",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "BodyStructureAsText",
                table: "Articles",
                type: "LONGTEXT",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BodyStructureAsHtmlCode",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "BodyStructureAsText",
                table: "Articles");
        }
    }
}
