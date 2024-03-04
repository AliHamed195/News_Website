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
                    .Where(u => !u.IsDeleted) 
                    .Select(u => new UserDetailsViewModel
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
            catch (Exception ex)
            {
                return Ok(new { success = false, message = $"Exception Error: {ex.Message}." });
            }
        }

    }
}
