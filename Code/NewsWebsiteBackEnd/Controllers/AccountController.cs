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
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.Classes.Names;
using NewsWebsiteBackEnd.DTO.Account;

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
        private readonly IConfiguration _configuration;
        private readonly JwtSettings _jwtSettings;

        public AccountController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager, SignInManager<ApplicationUsers> signInManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _jwtSettings = configuration.GetSection("Jwt").Get<JwtSettings>();
        }

        [HttpPost("register")] // api/account/register
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(new { success = false, message = "Registration failed.", errors = "Model not valid." });
                }

                var userNameExists = await _userManager.FindByNameAsync(model.UserName);
                if (userNameExists != null)
                {
                      return Ok(new { success = false, message = "Registration failed.", errors = "Username already exists." });
                }

                var emailExists = await _userManager.FindByEmailAsync(model.Email);
                if (emailExists != null)
                {
                    return Ok(new { success = false, message = "Registration failed.", errors = "Email already exists." });
                }

                // TODO:
                // Need to check if the user permission if the user type is not visitor.
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

        [AllowAnonymous]
        [HttpPost("login")] // api/account/login
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(model.UserName);

                if (user is null || user.IsBlocked || user.IsDeleted)
                {
                    return Ok(new { success = false, message = "Login failed Invalid username or password.", errors = "User not found." });
                }

                if (await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    var userRoles = await _userManager.GetRolesAsync(user);
                    var roleClaims = new List<Claim>();
                    foreach (var userRole in userRoles)
                    {
                        roleClaims.Add(new Claim(ClaimTypes.Role, userRole));
                        var role = await _roleManager.FindByNameAsync(userRole);
                        if (role != null)
                        {
                            var roleClaimsList = await _roleManager.GetClaimsAsync(role);
                            roleClaims.AddRange(roleClaimsList);
                        }
                    }

                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(ClaimTypes.NameIdentifier, user.Id),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim("FullName", user.FullName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };

                    authClaims.AddRange(roleClaims);

                    var token = GenerateJwtToken(authClaims);

                    return Ok(new
                    {
                        success = true,
                        message = "Login successful",
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo
                    });
                }
                return Ok(new { success = false, message = "Login failed Invalid username or password.", errors = "Invalid username or password." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Login failed due to an internal error.", errors = ex.Message });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpPost("logout")] // api/account/logout
        public async Task<IActionResult> Logout()
        {
            return Ok(new { success = true, message = "Logout successful" });
        }

        private JwtSecurityToken GenerateJwtToken(List<Claim> authClaims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            return new JwtSecurityToken(
                expires: DateTime.Now.AddHours(2),
                claims: authClaims,
                signingCredentials: signIn
            );
        }
    }
}
