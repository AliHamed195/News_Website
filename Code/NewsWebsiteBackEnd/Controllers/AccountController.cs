using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NewsWebsiteBackEnd.Models.ViewModels;
using NewsWebsiteBackEnd.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.AspNetCore.Http.HttpResults;
using NewsWebsiteBackEnd.Context;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUsers> _userManager;

        public AccountController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(new { success = false, message = "Registration failed.", errors = "Model not valid." });
                }

                var visitorType = _context.UserTypes.FirstOrDefault(ut => ut.Name == "Visitor");
                if (visitorType == null)
                {
                    return Ok(new { success = false, message = "Registration failed.", errors = "Unable to find Visitor user type." });
                }

                var user = new ApplicationUsers
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    FullName = model.FullName,
                    UserTypeId = visitorType.Id,
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    return Ok(new { success = true, message = "Registration successful" });
                }
                else
                {
                    return Ok(new { success = false, message = "Registration failed", errors = result.Errors });
                }
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Registration failed due to an internal error.", errors = ex.Message });
            }
        }
    }
}
