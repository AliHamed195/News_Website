using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.DTO.HashTag;
using NewsWebsiteBackEnd.DTO.Pagination;
using NewsWebsiteBackEnd.Models;
using System.Security.Claims;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HashTagController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUsers> _userManager;

        public HashTagController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("all")] // api/HashTag/all
        public async Task<IActionResult> GetAllHashTags([FromQuery] PaginationModel pagination)
        {
            try
            {
                var hashTagsQuery = _context.HashTags
                    .AsNoTracking()
                    .Where(x => !x.IsDeleted)
                    .Select(x => new GeneralHashTagDetailsViewModel
                    {
                        Id = x.Id,
                        Text = x.Text
                    });

                hashTagsQuery = hashTagsQuery.Skip(pagination.StartRow).Take(pagination.EndRow - pagination.StartRow);

                var hashTags = await hashTagsQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = hashTags });
            }
            catch (Exception)
            {
                return Ok(new {success = false, message = "Exception Error" });
            }
        }

        [HttpGet("{id}")] // api/HashTag/1
        public async Task<IActionResult> GetHashTagById(int id)
        {
            try
            {
                var hashTag = await _context.HashTags
                    .AsNoTracking()
                    .Where(x => x.Id == id && !x.IsDeleted)
                    .Select(x => new HashTagDetailsViewModel
                    {
                        Id = x.Id,
                        Text = x.Text,
                        Description = x.Description,
                        CreatedAt = x.CreatedAt,
                        UpdatedAt = x.UpdatedAt,
                        IsDeleted = x.IsDeleted,
                        CreatedById = x.CreatedById,
                        UserFullName = x.CreatedByUser.FullName
                    })
                    .FirstOrDefaultAsync();

                if (hashTag is null)
                {
                    return Ok(new { success = false, message = "HashTag not found." });
                }

                return Ok(new { success = true, message = "Done.", data = hashTag });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpPost("create")] // api/HashTag/create
        public async Task<IActionResult> CreateHashTag([FromBody] CreateHashTagViewModel model)
        {
            try
            {
                if(string.IsNullOrWhiteSpace(model.Text))
                {
                    return Ok(new { success = false, message = "Text is required." });
                }

                var isExist = await _context.HashTags.AnyAsync(x => x.Text == model.Text && !x.IsDeleted);
                if (isExist)
                {
                    return Ok(new { success = false, message = "HashTag already exist." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user is null || user.IsDeleted || user.IsBlocked)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                var hashTag = new HashTags
                {
                    Text = model.Text,
                    Description = model.Description,
                    CreatedById = userId,
                    CreatedByUser = user
                };

                _context.HashTags.Add(hashTag);

                if(user.HashTags is null)
                {
                    user.HashTags = new List<HashTags>();
                }

                user.HashTags.Add(hashTag);
                _context.Users.Update(user);

                var result = await _context.SaveChangesAsync();

                if (result <= 0)
                {
                    return Ok(new { success = false, message = "Failed to create HashTag." });
                }

                return Ok(new { success = true, message = "HashTag created successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpPut("update/{id}")] // api/HashTag/update/1
        public async Task<IActionResult> UpdateHashTag(int id, [FromBody] UpdateHashTagViewModel model)
        {
            try
            {
                var hashTag = await _context.HashTags.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
                if (hashTag is null)
                {
                    return Ok(new { success = false, message = "HashTag not found." });
                }

                if (string.IsNullOrWhiteSpace(model.Text))
                {
                    return Ok(new { success = false, message = "Text is required." });
                }

                var isExist = await _context.HashTags.AnyAsync(x => x.Text == model.Text && x.Id != id && !x.IsDeleted);
                if (isExist)
                {
                    return Ok(new { success = false, message = "HashTag already exist." });
                }

                hashTag.Text = model.Text;
                hashTag.Description = model.Description;
                hashTag.UpdatedAt = DateTime.Now;

                _context.HashTags.Update(hashTag);
                var result = await _context.SaveChangesAsync();

                if (result <= 0)
                {
                    return Ok(new { success = false, message = "Failed to update HashTag." });
                }

                return Ok(new { success = true, message = "HashTag updated successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpPut("delete/{id}")] // api/HashTag/delete/1
        public async Task<IActionResult> DeleteHashTag(int id)
        {
            try
            {
                var hashTag = await _context.HashTags.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
                if (hashTag is null)
                {
                    return Ok(new { success = false, message = "HashTag not found." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (hashTag.CreatedById != userId)
                {
                    return Ok(new { success = false, message = "You are not allowed to delete this HashTag." });
                }

                hashTag.IsDeleted = true;
                hashTag.UpdatedAt = DateTime.Now;

                _context.HashTags.Update(hashTag);
                var result = await _context.SaveChangesAsync();

                if (result <= 0)
                {
                    return Ok(new { success = false, message = "Failed to delete HashTag." });
                }

                return Ok(new { success = true, message = "HashTag deleted successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

    }
}
