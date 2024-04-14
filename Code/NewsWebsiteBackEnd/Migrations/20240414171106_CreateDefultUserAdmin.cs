using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Migrations;
using NewsWebsiteBackEnd.Models;
using static SolrNet.Commands.Parameters.CollapseExpandParameters.MinOrMax;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Security.Principal;

#nullable disable

namespace NewsWebsiteBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class CreateDefultUserAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var userId = Guid.NewGuid().ToString();
            var roleId = "1";
            var userName = "adminuser"; // Password = A@a123456

            migrationBuilder.Sql($@"
                INSERT INTO `aspnetusers` (
                    `Id`,
                    `UserName`,
                    `NormalizedUserName`,
                    `Email`,
                    `NormalizedEmail`,
                    `EmailConfirmed`,
                    `PasswordHash`,
                    `SecurityStamp`,
                    `ConcurrencyStamp`,
                    `PhoneNumber`,
                    `PhoneNumberConfirmed`,
                    `TwoFactorEnabled`,
                    `LockoutEnd`,
                    `LockoutEnabled`,
                    `AccessFailedCount`,
                    `Country`,
                    `CreatedAt`,
                    `Discriminator`,
                    `IsBlocked`,
                    `IsDeleted`,
                    `ProfileImagePath`,
                    `UpdatedAt`,
                    `WebsiteLanguage`,
                    `FullName`,
                    `UserTypeId`
                ) VALUES (
                    '{userId}', 
                    '{userName}', 
                    'ADMINUSER', 
                    'admin@example.com', 
                    'ADMIN@EXAMPLE.COM', 
                    1, 
                    'AQAAAAIAAYagAAAAEL+xckdhh5ekWp4g31qhEitqaFFIfbGlBgHcxFQNLxMBYwdXfrB7AunsiFjRWICiJQ==', 
                    'DKWGP7TGLVI3LHKX2MO2DWERK26YLZFA', 
                    'b92352e7-267f-401f-b608-00ce2d5b1917', 
                    '1234567890', 
                    1, 
                    0, 
                    NULL, 
                    1, 
                    0, 
                    'USA', 
                    CURDATE(), 
                    'ApplicationUsers', 
                    0, 
                    0, 
                    NULL, 
                    NULL, 
                    'en', 
                    'Admin User', 
                    1
                );
            ");

            migrationBuilder.Sql($@"
                INSERT INTO `aspnetuserroles` (`UserId`, `RoleId`) VALUES ('{userId}', '{roleId}');
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM `aspnetuserroles` WHERE `UserId` IN (SELECT `Id` FROM `aspnetusers` WHERE `UserName` = 'adminuser');");
            migrationBuilder.Sql("DELETE FROM `aspnetusers` WHERE `UserName` = 'adminuser';");
        }
    }
}
