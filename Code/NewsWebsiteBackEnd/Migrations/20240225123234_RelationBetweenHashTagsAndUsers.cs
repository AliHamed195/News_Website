using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsWebsiteBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class RelationBetweenHashTagsAndUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "HashTags",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUserId",
                table: "HashTags",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_HashTags_CreatedByUserId",
                table: "HashTags",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_HashTags_AspNetUsers_CreatedByUserId",
                table: "HashTags",
                column: "CreatedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HashTags_AspNetUsers_CreatedByUserId",
                table: "HashTags");

            migrationBuilder.DropIndex(
                name: "IX_HashTags_CreatedByUserId",
                table: "HashTags");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "HashTags");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "HashTags");
        }
    }
}
