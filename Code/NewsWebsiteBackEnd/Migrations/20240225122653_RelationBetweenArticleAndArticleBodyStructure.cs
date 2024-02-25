using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsWebsiteBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class RelationBetweenArticleAndArticleBodyStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ArticleId",
                table: "ArticleBodyStructure",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ArticleBodyStructure_ArticleId",
                table: "ArticleBodyStructure",
                column: "ArticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleBodyStructure_Articles_ArticleId",
                table: "ArticleBodyStructure",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticleBodyStructure_Articles_ArticleId",
                table: "ArticleBodyStructure");

            migrationBuilder.DropIndex(
                name: "IX_ArticleBodyStructure_ArticleId",
                table: "ArticleBodyStructure");

            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "ArticleBodyStructure");
        }
    }
}
