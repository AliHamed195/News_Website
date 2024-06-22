using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.DTO.Article;
using NewsWebsiteBackEnd.Models;
using System.Security.Claims;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUsers> _userManager;

        public CommentsController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Get comments for an article by its URL as text
        [AllowAnonymous]
        [HttpGet("{urlAsText}")]
        public async Task<IActionResult> GetCommentsByArticleUrl(string urlAsText)
        {
            try
            {
                var article = await _context.Articles
                    .AsNoTracking()
                    .FirstOrDefaultAsync(a => a.UrlAsText == urlAsText && !a.IsDeleted);

                if (article == null)
                {
                    return NotFound(new { success = false, message = "Article not found." });
                }

                var comments = await _context.Comments
                    .AsNoTracking()
                    .Include(c => c.CreatedBy)
                    .Where(c => c.ArticleId == article.Id && !c.IsDeleted)
                    .Select(c => new
                    {
                        c.Id,
                        c.Text,
                        c.CreatedAt,
                        c.UpdatedAt,
                        c.CreatedById,
                        c.CreatedBy.FullName
                    })
                    .ToListAsync();

                return Ok(new { success = true, message = "Done.", data = comments });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = "Exception Error", error = ex.Message });
            }
        }

        // Add a comment to an article by its URL as text
        [Authorize]
        [HttpPost("{urlAsText}")]
        public async Task<IActionResult> AddComment(string urlAsText, [FromBody] CommentArticleViewModel model)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return BadRequest(new { success = false, message = "User not found." });
                }

                var article = await _context.Articles.FirstOrDefaultAsync(a => a.UrlAsText == urlAsText && !a.IsDeleted);
                if (article == null)
                {
                    return NotFound(new { success = false, message = "Article not found." });
                }

                var comment = new Comments
                {
                    Text = model.Text,
                    CreatedById = userId,
                    CreatedBy = user,
                    ArticleId = article.Id,
                    Article = article
                };

                await _context.Comments.AddAsync(comment);
                article.TotalNumberOfComments++;
                _context.Articles.Update(article);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Comment added successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = "Exception Error", error = ex.Message });
            }
        }

        // Update a comment
        [Authorize]
        [HttpPut("{commentId}")]
        public async Task<IActionResult> UpdateComment(int commentId, [FromBody] CommentArticleViewModel model)
        {
            try
            {
                var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId && !c.IsDeleted);
                if (comment == null)
                {
                    return NotFound(new { success = false, message = "Comment not found." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (comment.CreatedById != userId)
                {
                    return Ok(new { success = false, message = "You are not allowed to update this comment." });
                }

                comment.Text = model.Text;
                comment.UpdatedAt = DateTime.Now;
                _context.Comments.Update(comment);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Comment updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = "Exception Error", error = ex.Message });
            }
        }

        // Delete a comment
        [Authorize]
        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            try
            {
                var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId && !c.IsDeleted);
                if (comment == null)
                {
                    return NotFound(new { success = false, message = "Comment not found." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (comment.CreatedById != userId)
                {
                    return Ok(new { success = false, message = "You are not allowed to delete this comment." });
                }

                comment.IsDeleted = true;
                comment.UpdatedAt = DateTime.Now;
                _context.Comments.Update(comment);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Comment deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { success = false, message = "Exception Error", error = ex.Message });
            }
        }
    }
}
