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
using NewsWebsiteBackEnd.Classes;
using Microsoft.EntityFrameworkCore;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUsers> _userManager;
        private readonly SignInManager<ApplicationUsers> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager, SignInManager<ApplicationUsers> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
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

                UserTypes userType = null;
                if(model.UserTypeId == 0)
                {
                    userType = await _context.UserTypes.FirstOrDefaultAsync(ut => ut.Name == DefaultSystemUserTypes.Visitor);
                }
                else
                {
                    userType = await _context.UserTypes.FirstOrDefaultAsync(ut => ut.Id == model.UserTypeId);
                }

                if (userType is null)
                {
                    return Ok(new { success = false, message = "Registration failed.", errors = "Unable to find Visitor user type." });
                }

                var user = new ApplicationUsers
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    FullName = model.FullName,
                    UserTypeId = userType.Id,
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    string roleName;
                    if (!string.IsNullOrEmpty(model.RoleId))
                    {
                        var role = await _roleManager.FindByIdAsync(model.RoleId);
                        roleName = role?.Name;
                    }
                    else
                    {
                        roleName = DefaultSystemRoles.Visitor;
                    }

                    if (!string.IsNullOrEmpty(roleName))
                    {
                        await _userManager.AddToRoleAsync(user, roleName);
                    }

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
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            throw new NotImplementedException();
        }


        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
           throw new NotImplementedException();
        }
    }
}
