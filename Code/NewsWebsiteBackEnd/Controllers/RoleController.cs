using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using NewsWebsiteBackEnd.Hubs;
using NewsWebsiteBackEnd.Models;
using NewsWebsiteBackEnd.Models.ViewModels.Role;
using System.Data;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly UserManager<ApplicationUsers> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IHubContext<RoleManagementHub> _hubContext;

        public RoleController(UserManager<ApplicationUsers> userManager, RoleManager<IdentityRole> roleManager, IHubContext<RoleManagementHub> hubContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _hubContext = hubContext;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllRoles()
        {
            try
            {
                var roles = _roleManager.Roles.ToList();
                return Ok(new { success = true, message= "Done.", data = roles });
            }
            catch (Exception)
            {
                return Ok(new {success =  false, message = "Exception Error." });
            }

        }

        [HttpGet("{roleId}/permissions")]
        public async Task<IActionResult> GetRolePermissions(string roleId)
        {
            try
            {
                var role = await _roleManager.FindByIdAsync(roleId);
                if (role == null)
                {
                    return Ok(new { success = false, message = "Role not found." });
                }

                var claims = await _roleManager.GetClaimsAsync(role);
                var permissions = claims.Where(c => c.Type == "permission").Select(c => c.Value).ToList();

                var roleDetails = new RoleDetailsViewModel
                {
                    RoleId = role.Id,
                    RoleName = role.Name,
                    Permissions = permissions
                };

                return Ok(new { success = true, data = roleDetails });
            }
            catch (Exception)
            {
                return Ok(new {success = false, message = "Exception Error." });
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddRole([FromBody] AddRoleViewModel model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.RoleName))
                {
                    return Ok(new { success = false, message = "Role name can not be null." });
                }

                var roleExists = await _roleManager.RoleExistsAsync(model.RoleName);
                if (!roleExists)
                {
                    var result = await _roleManager.CreateAsync(new IdentityRole(model.RoleName));
                    if (result.Succeeded)
                    {
                        var role = await _roleManager.FindByNameAsync(model.RoleName);
                        foreach (var permission in model.Permissions)
                        {
                            await _roleManager.AddClaimAsync(role, new System.Security.Claims.Claim("permission", permission));
                        }

                        await _hubContext.Clients.All.SendAsync("RoleAdded", role);
                        return Ok(new { success = true, message = $"Role {model.RoleName} added successfully.", data = role });
                    }
                    else
                    {
                        return Ok(new { success = false, message = "Failed to add role." });
                    }
                }
                return Ok(new { success = false, message = "Role already exists." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error." });
            }
           
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditRole([FromBody] EditRoleViewModel model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.RoleId) || string.IsNullOrEmpty(model.NewRoleName))
                {
                    return Ok(new { success = false, message = "Role name can not be null." });
                }

                var role = await _roleManager.FindByIdAsync(model.RoleId);
                if (role is null)
                {
                    return Ok(new { success = false, message = "Role not found." });
                }

                if (await _roleManager.RoleExistsAsync(model.NewRoleName))
                {
                    return Ok(new { success = false, message = "New role name already exists." });
                }

                role.Name = model.NewRoleName;
                var result = await _roleManager.UpdateAsync(role);
                if (result.Succeeded)
                {
                    var currentClaims = await _roleManager.GetClaimsAsync(role);
                    foreach (var claim in currentClaims)
                    {
                        await _roleManager.RemoveClaimAsync(role, claim);
                    }
                    foreach (var permission in model.Permissions)
                    {
                        await _roleManager.AddClaimAsync(role, new System.Security.Claims.Claim("permission", permission));
                    }

                    await _hubContext.Clients.All.SendAsync("RoleEdited", role);
                    return Ok(new { success = true, message = "Role updated successfully.", data = role });
                }

                return Ok(new { success = false, message = "Failed to update role." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error." });
            }
            
        }


        [HttpPut("delete")]
        public async Task<IActionResult> DeleteRole(string roleId)
        {
            try
            {
                var role = await _roleManager.FindByIdAsync(roleId);
                if (role == null)
                {
                    return Ok(new { success = false, message = "Role not found." });
                }

                var usersInRole = await _userManager.GetUsersInRoleAsync(role.Name);
                if (usersInRole.Count > 0)
                {
                    return Ok(new { success = false, message = "Cannot delete role because it has associated users." });
                }

                var roleClaims = await _roleManager.GetClaimsAsync(role);
                foreach (var claim in roleClaims)
                {
                    var removalResult = await _roleManager.RemoveClaimAsync(role, claim);
                    if (!removalResult.Succeeded)
                    {
                        return Ok(new { success = false, message = $"Failed to remove associated claims. Claim Type: {claim.Type}, Value: {claim.Value}" });
                    }
                }

                var result = await _roleManager.DeleteAsync(role);
                if (result.Succeeded)
                {
                    await _hubContext.Clients.All.SendAsync("RoleDeleted", roleId);
                    return Ok(new { success = true, message = "Role deleted successfully." });
                }

                return Ok(new { success = false, message = "Failed to delete role." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error." });
            }
        }
    }
}
