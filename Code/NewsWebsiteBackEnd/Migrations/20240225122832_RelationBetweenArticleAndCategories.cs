using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsWebsiteBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class RelationBetweenArticleAndCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoriesId",
                table: "Articles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Articles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Articles_CategoriesId",
                table: "Articles",
                column: "CategoriesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Categories_CategoriesId",
                table: "Articles",
                column: "CategoriesId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Categories_CategoriesId",
                table: "Articles");

            migrationBuilder.DropIndex(
                name: "IX_Articles_CategoriesId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "CategoriesId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Articles");
        }
    }
}
