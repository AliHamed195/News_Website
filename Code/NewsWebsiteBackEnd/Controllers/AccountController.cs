using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NewsWebsiteBackEnd.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.AspNetCore.Http.HttpResults;
using NewsWebsiteBackEnd.Context;
using Microsoft.AspNetCore.Authorization;
using NewsWebsiteBackEnd.POCO;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using NewsWebsiteBackEnd.Models.ViewModels.Account;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUsers> _userManager;
        private readonly SignInManager<ApplicationUsers> _signInManager;

        public AccountController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager, SignInManager<ApplicationUsers> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        [AllowAnonymous]
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

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            throw new NotImplementedException();
        }


        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
           throw new NotImplementedException();
        }
    }
}
