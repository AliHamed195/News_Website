using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using NewsWebsiteBackEnd.Hubs;
using NewsWebsiteBackEnd.Models;

namespace NewsWebsiteBackEnd.Controllers
{
    //==========================================================
    //TODO: Need to add the permissions when creat/edit ... role.
    //==========================================================
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

        /// <summary>
        /// Retrieves all roles from the database.
        /// </summary>
        /// <returns>A list of all roles within the database along with a success status.</returns>
        [HttpGet("all")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = _roleManager.Roles.ToList();
            return Ok(new { success = true, data = roles });
        }

        /// <summary>
        /// Adds a new role to the system if it does not already exist.
        /// </summary>
        /// <param name="roleName">The name of the role to add.</param>
        /// <returns>
        /// A response indicating whether the role was successfully added, 
        /// including a success status and a message.
        /// </returns>
        [HttpPost("add")]
        public async Task<IActionResult> AddRole(string roleName)
        {
            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
                if (result.Succeeded)
                {
                    await _hubContext.Clients.All.SendAsync("RoleAdded", roleName);
                    return Ok(new {success = true, message = $"Role {roleName} added successfully." });
                }
                else
                {
                    return Ok(new { success = false, message = "Failed to add role." });
                }
            }
            return Ok(new { success = false, message = "Role already exists." });
        }

        /// <summary>
        /// Edits an existing role's name to a new name if the new name does not already exist.
        /// </summary>
        /// <param name="oldRoleName">The current name of the role.</param>
        /// <param name="newRoleName">The new name for the role.</param>
        /// <returns>
        /// A response indicating whether the role was successfully edited, 
        /// including a success status and a message.
        /// </returns>
        [HttpPost("edit")]
        public async Task<IActionResult> EditRole(string oldRoleName, string newRoleName)
        {
            var role = await _roleManager.FindByNameAsync(oldRoleName);
            if (role is null)
            {
                return Ok(new { success = false, message = "Role not found." });
            }

            if (await _roleManager.RoleExistsAsync(newRoleName))
            {
                return Ok(new { success = false, message = "New role name already exists." });
            }

            role.Name = newRoleName;
            var result = await _roleManager.UpdateAsync(role);
            if (result.Succeeded)
            {
                await _hubContext.Clients.All.SendAsync("RoleEdited", oldRoleName, newRoleName);
                return Ok(new { success = true, message = "Role updated successfully." });
            }

            return Ok(new { success = false, message = "Failed to update role." });
        }

        /// <summary>
        /// Deletes a role if no users are associated with it.
        /// </summary>
        /// <param name="roleName">The name of the role to delete.</param>
        /// <returns>
        /// A response indicating success or failure, 
        /// including a success status and a message.
        /// </returns>
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return Ok(new { success = false, message = "Role not found." });
            }

            var usersInRole = await _userManager.GetUsersInRoleAsync(roleName);
            if (usersInRole.Count > 0)
            {
                return Ok(new { success = false, message = "Cannot delete role because it has associated users." });
            }

            var result = await _roleManager.DeleteAsync(role);
            if (result.Succeeded)
            {
                await _hubContext.Clients.All.SendAsync("RoleDeleted", roleName);
                return Ok(new { success = true, message = "Role deleted successfully." });
            }

            return Ok(new { success = false, message = "Failed to delete role." });
        }


    }
}
