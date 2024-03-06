using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NewsWebsiteBackEnd.Models;
using NewsWebsiteBackEnd.Models.ViewModels.Pagination;
using NewsWebsiteBackEnd.Models.ViewModels.User;
using Microsoft.EntityFrameworkCore;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUsers> _userManager;

        public UserController(UserManager<ApplicationUsers> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("all")]
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

                if (pagination.EndRow.HasValue)
                {
                    usersQuery = usersQuery.Skip(pagination.StartRow).Take(pagination.EndRow.Value - pagination.StartRow);
                }

                var users = await usersQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = users });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpGet("get/{id}")]
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

                if (user == null)
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

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserViewModel model)
        {
            if (model == null || string.IsNullOrEmpty(id))
            {
                return BadRequest(new { success = false, message = "Invalid request." });
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { success = false, message = "User not found." });
            }

            if (model.UserName != user.UserName)
            {
                var userNameExists = await _userManager.FindByNameAsync(model.UserName);
                if (userNameExists != null)
                {
                    return BadRequest(new { success = false, message = "Username is already taken." });
                }
                user.UserName = model.UserName;
            }

            if (model.Email != user.Email)
            {
                var emailExists = await _userManager.FindByEmailAsync(model.Email);
                if (emailExists != null)
                {
                    return BadRequest(new { success = false, message = "Email is already in use." });
                }
                user.Email = model.Email;
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
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
            if (!result.Succeeded)
            {
                return BadRequest(new { success = false, message = "Failed to update user.", errors = result.Errors });
            }

            return Ok(new { success = true, message = "User updated successfully." });
        }


        [HttpPut("block/{id}")]
        public async Task<IActionResult> BlockUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);

                if (user == null)
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

        [HttpPut("unblock/{id}")]
        public async Task<IActionResult> UnblockUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);

                if (user == null)
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

        [HttpPut("delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);

                if (user == null)
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

        [HttpPut("undelete/{id}")]
        public async Task<IActionResult> UndeleteUser(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);

                if (user == null)
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

    }
}
