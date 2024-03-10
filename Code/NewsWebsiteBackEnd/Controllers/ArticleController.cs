using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.DTO.Article;
using NewsWebsiteBackEnd.DTO.Category;
using NewsWebsiteBackEnd.DTO.Pagination;
using NewsWebsiteBackEnd.Models;
using System.Security.Claims;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUsers> _userManager;

        public ArticleController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("all")] // api/article/all
        public async Task<IActionResult> GetAllArticles([FromQuery] PaginationModel pagination)
        {
            try
            {
                var articlesQuery = _context.Articles
                .AsNoTracking()
                .Where(a => !a.IsDeleted)
                .Select(a => new GeneralArticleDetailsViewModel
                {
                    Id = a.Id,
                    Title = a.Title,
                    CoverImagePath = a.CoverImagePath,
                    RatingAvg = a.RatingAvg,
                    TotalNumberOfViews = a.TotalNumberOfViews,
                    UrlAsText = a.UrlAsText,
                    CreatedById = a.CreatedById,
                    CreatedByFullName = a.CreatedBy.FullName
                });

                articlesQuery = articlesQuery.Skip(pagination.StartRow).Take(pagination.EndRow - pagination.StartRow);

                var articles = await articlesQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = articles });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpGet("published")] // api/article/published
        public async Task<IActionResult> GetAllPublishedArticles([FromQuery] PaginationModel pagination)
        {
            try
            {
                var articlesQuery = _context.Articles
                .AsNoTracking()
                .Where(a => !a.IsDeleted && a.IsPublished)
                .Select(a => new GeneralArticleDetailsViewModel
                {
                    Id = a.Id,
                    Title = a.Title,
                    CoverImagePath = a.CoverImagePath,
                    RatingAvg = a.RatingAvg,
                    TotalNumberOfViews = a.TotalNumberOfViews,
                    UrlAsText = a.UrlAsText,
                    CreatedById = a.CreatedById,
                    CreatedByFullName = a.CreatedBy.FullName
                });

                articlesQuery = articlesQuery.Skip(pagination.StartRow).Take(pagination.EndRow - pagination.StartRow);

                var articles = await articlesQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = articles });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpGet("unpublished")] // api/article/unpublished
        public async Task<IActionResult> GetAllUnpublishedArticles([FromQuery] PaginationModel pagination)
        {
            try
            {
                var articlesQuery = _context.Articles
                .AsNoTracking()
                .Where(a => !a.IsDeleted && !a.IsPublished)
                .Select(a => new GeneralArticleDetailsViewModel
                {
                    Id = a.Id,
                    Title = a.Title,
                    CoverImagePath = a.CoverImagePath,
                    RatingAvg = a.RatingAvg,
                    TotalNumberOfViews = a.TotalNumberOfViews,
                    UrlAsText = a.UrlAsText,
                    CreatedById = a.CreatedById,
                    CreatedByFullName = a.CreatedBy.FullName
                });

                articlesQuery = articlesQuery.Skip(pagination.StartRow).Take(pagination.EndRow - pagination.StartRow);

                var articles = await articlesQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = articles });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpGet("{id}")] // api/article/{id}
        public async Task<IActionResult> GetArticleById(int id)
        {
            try
            {
                var article = await _context.Articles
                .AsNoTracking()
                .Where(a => a.Id == id)
                .Select(a => new ArticleDetailsViewModel
                {
                    Id = a.Id,
                    Title = a.Title,
                    CoverImagePath = a.CoverImagePath,
                    Summary = a.Summary,
                    CreatedAt = a.CreatedAt,
                    UpdatedAt = a.UpdatedAt,
                    IsDeleted = a.IsDeleted,
                    IsPublished = a.IsPublished,
                    TotalNumberOfComments = a.TotalNumberOfComments,
                    RatingAvg = a.RatingAvg,
                    TotalNumberOfRatings = a.TotalNumberOfRatings,
                    TotalNumberOfViews = a.TotalNumberOfViews,
                    Tags = a.Tags,
                    UrlAsText = a.UrlAsText,
                    BodyStructureAsHtmlCode = a.BodyStructureAsHtmlCode,
                    BodyStructureAsText = a.BodyStructureAsText,
                    CreatedById = a.CreatedById,
                    CreatedByFullName = a.CreatedBy.FullName,
                    CategoryId = a.CategoryId,
                    CategoryName = a.Categories.Name
                })
                .FirstOrDefaultAsync();

                if (article is null)
                {
                    return Ok(new { success = false, message = "Article not found." });
                }

                return Ok(new { success = true, message = "Done.", data = article });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpPost("create")] // api/article/create
        public async Task<IActionResult> CreateArticle([FromBody] CreateArticleViewModel model)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user is null || user.IsDeleted || user.IsBlocked)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == model.CategoryId);
                if (category is null || category.IsDeleted)
                {
                    return Ok(new { success = false, message = "Category not found." });
                }

                var article = new Article
                {
                    Title = model.Title,
                    CoverImagePath = model.CoverImagePath,
                    Summary = model.Summary,
                    Tags = model.Tags,
                    UrlAsText = GenerateUrlAsText(model.Title),
                    BodyStructureAsHtmlCode = model.BodyStructureAsHtmlCode,
                    BodyStructureAsText = model.BodyStructureAsText,
                    CreatedById = userId,
                    CreatedBy = user,
                    CategoryId = category.Id,
                    Categories = category
                };

                await _context.Articles.AddAsync(article);

                if (category.Articles is null)
                {
                    category.Articles = new List<Article>();
                }

                category.Articles.Add(article);
                category.ArticlesCount++;
                _context.Categories.Update(category);

                if (user.Articles is null)
                {
                    user.Articles = new List<Article>();
                }

                user.Articles.Add(article);
                _context.Users.Update(user);

                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Article created successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpPut("update/{id}")] // api/article/update/{id}
        public async Task<IActionResult> UpdateArticle(int id, [FromBody] UpdateArticleViewModel model)
        {
            try
            {
                var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == id);
                if (article is null || article.IsDeleted)
                {
                    return Ok(new { success = false, message = "Article not found." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (article.CreatedById != userId)
                {
                    return Ok(new { success = false, message = "You are not allowed to update this article." });
                }

                var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == model.CategoryId);
                if (category is null || category.IsDeleted)
                {
                    return Ok(new { success = false, message = "Category not found." });
                }

                if(article.Title != model.Title)
                {
                    article.UrlAsText = GenerateUrlAsText(model.Title);
                }

                article.Title = model.Title;
                article.CoverImagePath = model.CoverImagePath;
                article.Summary = model.Summary;
                article.Tags = model.Tags;
                article.BodyStructureAsHtmlCode = model.BodyStructureAsHtmlCode;
                article.BodyStructureAsText = model.BodyStructureAsText;
                article.UpdatedAt = DateTime.Now;
                article.CategoryId = category.Id;
                article.Categories = category;

                _context.Articles.Update(article);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Article updated successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpPut("delete/{id}")] // api/article/delete/{id}
        public async Task<IActionResult> DeleteArticle(int id)
        {
            try
            {
                var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == id);
                if (article is null || article.IsDeleted)
                {
                    return Ok(new { success = false, message = "Article not found." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (article.CreatedById != userId)
                {
                    return Ok(new { success = false, message = "You are not allowed to delete this article." });
                }

                article.IsDeleted = true;
                article.UpdatedAt = DateTime.Now;

                _context.Articles.Update(article);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Article deleted successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        private string GenerateUrlAsText(string title)
        {
            var slugBase = new string(title.ToLower().Replace(" ", "-")
                                        .Where(c => char.IsLetterOrDigit(c) || c == '-')
                                        .ToArray());

            slugBase = slugBase.Length > 200 ? slugBase.Substring(0, 200) : slugBase;

            var similarSlugsCount = _context.Articles
                                            .Count(a => a.UrlAsText.StartsWith(slugBase));

            var urlAsText = similarSlugsCount > 0 ? $"{slugBase}-{similarSlugsCount}" : slugBase;

            return urlAsText;
        }

    }
}
