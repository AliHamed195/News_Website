using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.Classes.Names;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.DTO.Article;
using NewsWebsiteBackEnd.DTO.Category;
using NewsWebsiteBackEnd.DTO.Pagination;
using NewsWebsiteBackEnd.DTO.Solr;
using NewsWebsiteBackEnd.Models;
using NewsWebsiteBackEnd.SOLR;
using System.Data;
using System.Security.Claims;
using System.Xml.Linq;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUsers> _userManager;
        //private readonly IHubContext<ArticleHub> _hubContext;

        public ArticleController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
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
                    CreatedByFullName = a.CreatedBy.FullName,
                    CreatedAt = a.CreatedAt,
                    Summary = a.Summary,
                    Location = a.Location,
                });

                articlesQuery = articlesQuery.Skip(pagination.StartRow).Take(pagination.EndRow - pagination.StartRow);

                var articles = await articlesQuery.OrderByDescending(a => a.Id).ToListAsync();

                return Ok(new { success = true, message = "Done.", data = articles });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [AllowAnonymous]
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
                    CreatedByFullName = a.CreatedBy.FullName,
                    Location = a.Location,
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

        [Authorize(Roles = DefaultSystemRoles.Admin)]
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
                    CreatedByFullName = a.CreatedBy.FullName,
                    Location = a.Location,
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

        [Authorize]
        [HttpGet("archived")] // api/article/archived
        public async Task<IActionResult> GetAllArchivedArticles([FromQuery] PaginationModel pagination)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user is null || user.IsDeleted || user.IsBlocked)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                var articlesQuery = _context.UserArchivedArticles
                .AsNoTracking()
                .Where(a => a.UserId == userId && !a.IsDeleted)
                .Select(a => new GeneralArticleDetailsViewModel
                {
                    Id = a.Article.Id,
                    Title = a.Article.Title,
                    CoverImagePath = a.Article.CoverImagePath,
                    RatingAvg = a.Article.RatingAvg,
                    TotalNumberOfViews = a.Article.TotalNumberOfViews,
                    UrlAsText = a.Article.UrlAsText,
                    CreatedById = a.Article.CreatedById,
                    CreatedByFullName = a.Article.CreatedBy.FullName,
                    Location = a.Article.Location,
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

        [AllowAnonymous]
        [HttpGet("{id}")] // api/article/{id}
        public async Task<IActionResult> GetArticleById(int id)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user is null || user.IsDeleted || user.IsBlocked)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

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
                    Location = a.Location,
                    BodyStructureAsHtmlCode = a.BodyStructureAsHtmlCode,
                    BodyStructureAsText = a.BodyStructureAsText,
                    CreatedById = a.CreatedById,
                    CreatedByFullName = a.CreatedBy.FullName,
                    CategoryId = a.CategoryId,
                    CategoryName = a.Categories.Name,
                    IsRatedByCurrentUser = a.Ratings.Any(r => r.CreatedById == userId)
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

        [Authorize(Roles = DefaultSystemRoles.Admin)]
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
                    Categories = category,
                    Location = model.Location
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

        [Authorize(Roles = DefaultSystemRoles.Admin)]
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

                if (article.Title != model.Title)
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
                article.Location = model.Location;

                _context.Articles.Update(article);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Article updated successfully." });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, message = "Exception Error", error = ex });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
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

                var archivedArticles = await _context.UserArchivedArticles.Where(a => a.ArticleId == article.Id).ToListAsync();
                foreach (var archivedArticle in archivedArticles)
                {
                    archivedArticle.IsDeleted = true;
                    archivedArticle.UnArchivedDate = DateTime.Now;
                    _context.UserArchivedArticles.Update(archivedArticle);
                }

                _context.Articles.Update(article);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Article deleted successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize]
        [HttpPost("archive/{id}")] // api/article/archive/{id}
        public async Task<IActionResult> ArchiveArticle(int id)
        {
            try
            {
                var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == id);
                if (article is null || article.IsDeleted)
                {
                    return Ok(new { success = false, message = "Article not found." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user is null || user.IsDeleted || user.IsBlocked)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                if (user.UserArchivedArticles is null)
                {
                    user.UserArchivedArticles = new List<UserArchivedArticles>();
                }

                var userArchivedArticle = new UserArchivedArticles
                {
                    ArticleId = article.Id,
                    Article = article,
                    UserId = user.Id,
                    User = user
                };

                user.UserArchivedArticles.Add(userArchivedArticle);
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Article archived successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize]
        [HttpPost("unarchive/{id}")] // api/article/unarchive/{id}
        public async Task<IActionResult> UnarchiveArticle(int id)
        {
            try
            {
                var archivedArticles = await _context.UserArchivedArticles.FirstOrDefaultAsync(a => a.Id == id);
                if (archivedArticles is null || archivedArticles.IsDeleted)
                {
                    return Ok(new { success = false, message = "Article not found." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user is null || user.IsDeleted || user.IsBlocked)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                archivedArticles.IsDeleted = true;
                archivedArticles.UnArchivedDate = DateTime.Now;

                _context.UserArchivedArticles.Update(archivedArticles);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Article unarchived successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize]
        [HttpPost("rate/{id}")] // api/article/rate/{id}
        public async Task<IActionResult> RateArticle(int id, [FromBody] RateArticleViewModel model)
        {
            try
            {
                var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == id);
                if (article is null || article.IsDeleted)
                {
                    return Ok(new { success = false, message = "Article not found." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user is null || user.IsDeleted || user.IsBlocked)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                var rating = await _context.Ratings.FirstOrDefaultAsync(r => r.ArticleId == article.Id && r.CreatedById == userId);
                if (rating is null)
                {
                    rating = new Ratings
                    {
                        Percentage = model.Percentage,
                        CreatedById = userId,
                        CreatedByUser = user,
                        ArticleId = article.Id,
                        Article = article
                    };

                    var totalRatingSum = article.RatingAvg * article.TotalNumberOfRatings + model.Percentage;
                    article.TotalNumberOfRatings++;
                    article.RatingAvg = totalRatingSum / article.TotalNumberOfRatings;

                    await _context.Ratings.AddAsync(rating);
                }
                else
                {
                    var oldRatingValue = rating.Percentage;

                    rating.Percentage = model.Percentage;
                    rating.UpdatedAt = DateTime.Now;

                    var totalRatingSum = (article.RatingAvg * article.TotalNumberOfRatings) - oldRatingValue + model.Percentage;
                    article.RatingAvg = totalRatingSum / article.TotalNumberOfRatings;

                    _context.Ratings.Update(rating);
                }

                _context.Articles.Update(article);
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Article rated successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize]
        [HttpPost("comment/{id}")] // api/article/comment/{id}
        public async Task<IActionResult> CommentArticle(int id, [FromBody] CommentArticleViewModel model)
        {
            try
            {
                var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == id);
                if (article is null || article.IsDeleted)
                {
                    return Ok(new { success = false, message = "Article not found." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user is null || user.IsDeleted || user.IsBlocked)
                {
                    return Ok(new { success = false, message = "User not found." });
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

                return Ok(new { success = true, message = "Article commented successfully." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize]
        [HttpPut("delete-comment/{id}")] // api/article/delete-comment/{id}
        public async Task<IActionResult> DeleteCommentArticle(int id)
        {
            try
            {
                var comment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);
                if (comment is null || comment.IsDeleted)
                {
                    return Ok(new { success = false, message = "Comment not found." });
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
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [AllowAnonymous]
        [HttpGet("comments/{id}")] // api/article/comments/{id}
        public async Task<IActionResult> GetCommentsArticle(int id)
        {
            try
            {
                var article = await _context.Articles.FirstOrDefaultAsync(a => a.Id == id);
                if (article is null || article.IsDeleted)
                {
                    return Ok(new { success = false, message = "Article not found." });
                }

                var comments = await _context.Comments
                .AsNoTracking()
                .Where(c => c.ArticleId == article.Id && !c.IsDeleted)
                .Select(c => new CommentArticleViewModel
                {
                    Id = c.Id,
                    Text = c.Text,
                    ArticleId = c.ArticleId
                })
                .ToListAsync();

                return Ok(new { success = true, message = "Done.", data = comments });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpPost("publish/{id}")]
        public async Task<IActionResult> PublishArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            article.IsPublished = true;
            _context.Articles.Update(article);
            await _context.SaveChangesAsync();

            // await _hubContext.Clients.All.SendAsync("ArticlePublished", article.Title, Url.Action("GetArticleById", new { id = article.Id }));

            return Ok(new { success = true, message = "Article published successfully." });
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpPost("unpublish/{id}")]
        public async Task<IActionResult> UnpublishArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            article.IsPublished = false;
            _context.Articles.Update(article);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Article unpublished successfully." });
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("all-count")]
        public async Task<IActionResult> GetAllArticlesCount()
        {
            var count = await _context.Articles.CountAsync(a => !a.IsDeleted);
            return Ok(new { success = true, message = "Done.", data = count });
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("published-count")]
        public async Task<IActionResult> GetPublishedArticlesCount()
        {
            var count = await _context.Articles.CountAsync(a => a.IsPublished && !a.IsDeleted);
            return Ok(new { success = true, message = "Done.", data = count });
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("unpublished-count")]
        public async Task<IActionResult> GetUnpublishedArticlesCount()
        {
            var count = await _context.Articles.CountAsync(a => !a.IsPublished && !a.IsDeleted);
            return Ok(new { success = true, message = "Done.", data = count });
        }

        //get archived articles count
        [Authorize]
        [HttpGet("archived-count")]
        public async Task<IActionResult> GetArchivedArticlesCount()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var count = await _context.UserArchivedArticles.CountAsync(a => a.UserId == userId && !a.IsDeleted);
            return Ok(new { success = true, message = "Done.", data = count });
        }





        //[HttpPost("search")] // api/article/search
        //public async Task<IActionResult> Search([FromBody] SolrSearchModel model)
        //{
        //    int rows = model.Pagination.EndRow - model.Pagination.StartRow;
        //    int start = model.Pagination.StartRow;

        //    var results = await _solrService.SearchArticles(model.SearchText, start, rows);
        //    return Ok(new { success = true, message = "Done.", data = results });
        //}

        private string GenerateUrlAsText(string title)
        {
            var slugBase = new string(title.ToLower().Replace(" ", "-")
                                        .Where(c => char.IsLetterOrDigit(c) || c == '-')
                                        .ToArray());

            slugBase = slugBase.Length > 100 ? slugBase.Substring(0, 100) : slugBase;

            var similarSlugsCount = _context.Articles
                                            .Count(a => a.UrlAsText.StartsWith(slugBase));

            var urlAsText = similarSlugsCount > 0 ? $"{slugBase}-{similarSlugsCount}" : slugBase;

            return urlAsText;
        }

    }
}
