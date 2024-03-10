using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsWebsiteBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class UpdateArticleModelMakingTheAVGDouble : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserArchivedArticles",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UnArchivedDate",
                table: "UserArchivedArticles",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "RatingAvg",
                table: "Articles",
                type: "double",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(65,30)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserArchivedArticles");

            migrationBuilder.DropColumn(
                name: "UnArchivedDate",
                table: "UserArchivedArticles");

            migrationBuilder.AlterColumn<decimal>(
                name: "RatingAvg",
                table: "Articles",
                type: "decimal(65,30)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");
        }
    }
}
