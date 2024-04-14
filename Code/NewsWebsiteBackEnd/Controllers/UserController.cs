using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NewsWebsiteBackEnd.Models;
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.DTO.Pagination;
using NewsWebsiteBackEnd.DTO.User;
using Microsoft.AspNetCore.Authorization;
using NewsWebsiteBackEnd.Classes.Names;
using System.Data;
using System.Diagnostics.Metrics;
using NewsWebsiteBackEnd.Context;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUsers> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;

        public UserController(UserManager<ApplicationUsers> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("all")] // GET: api/User/all
        public async Task<IActionResult> GetAllUsers([FromQuery] PaginationModel pagination)
        {
            try
            {
                var usersQuery = _userManager.Users
                    .AsNoTracking()
                    .Where(u => !u.IsDeleted) 
                    .Select(u => new GeneralUserDetailsViewModel
                    {
                        Id = u.Id,
                        UserName = u.UserName,
                        Email = u.Email,
                        FullName = u.FullName,
                        UserTypeId = u.UserTypeId,
                        UserTypeName = u.UserType.Name 
                    });

                usersQuery = usersQuery.Skip(pagination.StartRow).Take(pagination.EndRow - pagination.StartRow);

                var users = await usersQuery.OrderBy(u => u.UserTypeName).ToListAsync();

                return Ok(new { success = true, message = "Done.", data = users });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("all-deleted")] // GET: api/User/all-deleted
        public async Task<IActionResult> GetAllDeletedUsers([FromQuery] PaginationModel pagination)
        {
            try
            {
                var usersQuery = _userManager.Users
                    .AsNoTracking()
                    .Where(u => u.IsDeleted)
                    .Select(u => new GeneralUserDetailsViewModel
                    {
                        Id = u.Id,
                        UserName = u.UserName,
                        Email = u.Email,
                        FullName = u.FullName,
                        UserTypeId = u.UserTypeId,
                        UserTypeName = u.UserType.Name
                    });

                usersQuery = usersQuery.Skip(pagination.StartRow).Take(pagination.EndRow - pagination.StartRow);

                var users = await usersQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = users });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("get/{id}")] // GET: api/User/get/{id}
        public async Task<IActionResult> GetUserById(string id)
        {
            try
            {
                var user = await _userManager.Users
                    .AsNoTracking()
                    .Where(u => u.Id == id && !u.IsDeleted)
                    .Select(u => new UserDetailsViewModel
                    {
                        Id = u.Id,
                        UserName = u.UserName,
                        Email = u.Email,
                        FullName = u.FullName,
                        Country = u.Country,
                        ProfileImagePath = u.ProfileImagePath,
                        CreatedAt = u.CreatedAt,
                        UpdatedAt = u.UpdatedAt,
                        IsBlocked = u.IsBlocked,
                        WebsiteLanguage = u.WebsiteLanguage,
                        UserTypeId = u.UserTypeId,
                        UserTypeName = u.UserType.Name
                    })
                    .FirstOrDefaultAsync();

                if (user is null)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                return Ok(new { success = true, message = "Done.", data = user });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpPost("create-new")] // POST: api/User/create-new
        public async Task<IActionResult> CreateUser([FromBody] CreateUserViewModel model)
        {
            try
            {
                if (model is null)
                {
                    return Ok(new { success = false, message = "Invalid request." });
                }

                var user = new ApplicationUsers
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    FullName = model.FullName,
                    UserTypeId = model.UserTypeId,
                    EmailConfirmed = true,
                    Country = model.Country,
                    ProfileImagePath = model.ProfileImagePath,
                    WebsiteLanguage = model.WebsiteLanguage,
                };

                var password = "A@a123456"; // Just for test need to fix later.
                var result = await _userManager.CreateAsync(user, password);

                if (result.Succeeded)
                {
                    string roleName = DefaultSystemRoles.Admin;
                    await _userManager.AddToRoleAsync(user, roleName);

                    return Ok(new { success = true, message = "User created successfully." });
                }
                else
                {
                    return Ok(new { success = false, message = "Failed to create user.", errors = result.Errors });
                }
            }
            catch (Exception e)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpPut("update/{id}")] // PUT: api/User/update/{id}
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserViewModel model)
        {
            try
            {
                if (model is null || string.IsNullOrEmpty(id))
                {
                    return Ok(new { success = false, message = "Invalid request." });
                }

                var user = await _userManager.FindByIdAsync(id);
                if (user is null)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                if (model.UserName != user.UserName)
                {
                    var userNameExists = await _userManager.FindByNameAsync(model.UserName);
                    if (userNameExists != null)
                    {
                        return Ok(new { success = false, message = "Username is already taken." });
                    }
                    user.UserName = model.UserName;
                }

                if (model.Email != user.Email)
                {
                    var emailExists = await _userManager.FindByEmailAsync(model.Email);
                    if (emailExists != null)
                    {
                        return Ok(new { success = false, message = "Email is already in use." });
                    }
                    user.Email = model.Email;
                }

                user.UserName = model.UserName;
                user.Email = model.Email;
                user.FullName = model.FullName;
                user.Country = model.Country;
                user.ProfileImagePath = model.ProfileImagePath;
                user.WebsiteLanguage = model.WebsiteLanguage;
                user.UserTypeId = model.UserTypeId;
                user.UpdatedAt = DateTime.Now;

                var result = await _userManager.UpdateAsync(user);
                Console.WriteLine(result);
                if (!result.Succeeded)
                {
                    return Ok(new { success = false, message = "Failed to update user.", errors = result.Errors });
                }

                return Ok(new { success = true, message = "User updated successfully." });
            }
            catch (Exception e)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpPut("block/{id}")] // PUT: api/User/block/{id}
        public async Task<IActionResult> BlockUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);

                if (user is null)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                user.IsBlocked = true;
                user.UpdatedAt = DateTime.Now;

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Ok(new { success = true, message = "User blocked successfully." });
                }

                return Ok(new { success = false, message = "Failed to block user." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpPut("unblock/{id}")] // PUT: api/User/unblock/{id}
        public async Task<IActionResult> UnblockUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);

                if (user is null)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                user.IsBlocked = false;
                user.UpdatedAt = DateTime.Now;

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Ok(new { success = true, message = "User unblocked successfully." });
                }

                return Ok(new { success = false, message = "Failed to unblock user." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpPut("delete/{id}")] // PUT: api/User/delete/{id}
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);

                if (user is null)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                user.IsDeleted = true;
                user.UpdatedAt = DateTime.Now;

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Ok(new { success = true, message = "User deleted successfully." });
                }

                return Ok(new { success = false, message = "Failed to delete user." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpPut("undelete/{id}")] // PUT: api/User/undelete/{id}
        public async Task<IActionResult> UndeleteUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);

                if (user is null)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                user.IsDeleted = false;
                user.UpdatedAt = DateTime.Now;

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Ok(new { success = true, message = "User undeleted successfully." });
                }

                return Ok(new { success = false, message = "Failed to undelete user." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize]
        [HttpPut("update-password/{id}")] // PUT: api/User/update-password/{id}
        public async Task<IActionResult> UpdateUserPassword(string id, [FromBody] UpdateUserPasswordViewModel model)
        {
            if (model is null || string.IsNullOrEmpty(id))
            {
                return Ok(new { success = false, message = "Invalid request." });
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user is null)
            {
                return Ok(new { success = false, message = "User not found." });
            }

            if (user.IsDeleted || user.IsBlocked)
            {
                return Ok(new { success = false, message = "You can not do this action." });
            }

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return Ok(new { success = false, message = "Failed to update password.", errors = result.Errors });
            }

            return Ok(new { success = true, message = "Password updated successfully." });
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("count")] // GET: api/User/count
        public async Task<IActionResult> GetUsersCount()
        {
            try
            {
                var usersCount = await _userManager.Users
                    .AsNoTracking()
                    .Where(u => !u.IsDeleted)
                    .CountAsync();

                return Ok(new { success = true, message = "Done.", data = usersCount });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("count-blocked")] // GET: api/User/count-blocked
        public async Task<IActionResult> GetBlockedUsersCount()
        {
            try
            {
                var usersCount = await _userManager.Users
                    .AsNoTracking()
                    .Where(u => u.IsBlocked && !u.IsDeleted)
                    .CountAsync();

                return Ok(new { success = true, message = "Done.", data = usersCount });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("count-deleted")] // GET: api/User/count-deleted
        public async Task<IActionResult> GetDeletedUsersCount()
        {
            try
            {
                var usersCount = await _userManager.Users
                    .AsNoTracking()
                    .Where(u => u.IsDeleted)
                    .CountAsync();

                return Ok(new { success = true, message = "Done.", data = usersCount });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("types")] // GET: api/User/types
        public async Task<IActionResult> GetUserTypes()
        {
            try
            {
                var userTypes = await _userManager.Users
                    .AsNoTracking()
                    .Where(u => !u.IsDeleted)
                    .Select(u => new 
                    {
                        Id = u.UserType.Id,
                        Name = u.UserType.Name
                    })
                    .Distinct()
                    .ToListAsync();

                return Ok(new { success = true, message = "Done.", data = userTypes });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("types/count")] // GET: api/User/types/count
        public async Task<IActionResult> GetUserTypesCount()
        {
            try
            {
                var userTypesCount = await _userManager.Users
                    .AsNoTracking()
                    .Where(u => !u.IsDeleted)
                    .Select(u => u.UserType.Id)
                    .Distinct()
                    .CountAsync();

                return Ok(new { success = true, message = "Done.", data = userTypesCount });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("by-type/{typeId}")] // GET: api/User/by-type/{typeId}
        public async Task<IActionResult> GetUsersByType(int typeId, [FromQuery] PaginationModel pagination)
        {
            try
            {
                var usersQuery = _userManager.Users
                    .AsNoTracking()
                    .Where(u => u.UserTypeId == typeId && !u.IsDeleted)
                    .Select(u => new GeneralUserDetailsViewModel
                    {
                        Id = u.Id,
                        UserName = u.UserName,
                        Email = u.Email,
                        FullName = u.FullName,
                        UserTypeId = u.UserTypeId,
                        UserTypeName = u.UserType.Name
                    });

                usersQuery = usersQuery.Skip(pagination.StartRow).Take(pagination.EndRow - pagination.StartRow);

                var users = await usersQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = users });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }
    }
}
