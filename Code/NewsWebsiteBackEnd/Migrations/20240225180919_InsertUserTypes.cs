using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsWebsiteBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class InsertUserTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO UserTypes (Name) VALUES ('Admin');");
            migrationBuilder.Sql("INSERT INTO UserTypes (Name) VALUES ('Visitor');");
            migrationBuilder.Sql("INSERT INTO UserTypes (Name) VALUES ('Employee');");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM UserTypes WHERE Name IN ('Visitor', 'Admin', 'Employee');");
        }
    }
}
