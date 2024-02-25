using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsWebsiteBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class RelationBetweenUsersAndQuestionsAnswers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "QuestionsAnswers",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByUserId",
                table: "QuestionsAnswers",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionsAnswers_CreatedByUserId",
                table: "QuestionsAnswers",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionsAnswers_AspNetUsers_CreatedByUserId",
                table: "QuestionsAnswers",
                column: "CreatedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionsAnswers_AspNetUsers_CreatedByUserId",
                table: "QuestionsAnswers");

            migrationBuilder.DropIndex(
                name: "IX_QuestionsAnswers_CreatedByUserId",
                table: "QuestionsAnswers");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "QuestionsAnswers");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "QuestionsAnswers");
        }
    }
}
