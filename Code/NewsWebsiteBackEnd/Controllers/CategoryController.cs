using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.Models;
using NewsWebsiteBackEnd.Models.ViewModels.Article;
using NewsWebsiteBackEnd.Models.ViewModels.Category;
using NewsWebsiteBackEnd.Models.ViewModels.Pagination;
using System.Security.Claims;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUsers> _userManager;

        public CategoryController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("all")] // api/category/all
        public async Task<IActionResult> GetAllCategories([FromQuery] PaginationModel pagination)
        {
            try
            {
                var categoriesQuery = _context.Categories
                .AsNoTracking()
                .Where(c => !c.IsDeleted)
                .Select(c => new GeneralCategoryDetailsViewModel
                {
                    Id = c.Id,
                    Name = c.Name,
                    ArticlesCount = c.ArticlesCount
                });

                if (pagination.EndRow.HasValue)
                {
                    categoriesQuery = categoriesQuery.Skip(pagination.StartRow).Take(pagination.EndRow.Value - pagination.StartRow);
                }

                var categories = await categoriesQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = categories });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }   
        }

        [HttpGet("{id}")] // api/category/1
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                var category = await _context.Categories
                    .AsNoTracking()
                    .Where(c => c.Id == id && !c.IsDeleted)
                    .Select(c => new CategoryDetailsViewModel
                    {
                        Id = c.Id,
                        Name = c.Name,
                        CreatedAt = c.CreatedAt,
                        UpdatedAt = c.UpdatedAt,
                        IsDeleted = c.IsDeleted,
                        CreatedById = c.CreatedById,
                        UserId = c.User.Id, 
                        UserFullName = c.User.FullName,
                        ArticlesCount = c.Articles.Count
                    })
                    .FirstOrDefaultAsync();

                if (category == null)
                {
                    return Ok(new { success = false, message = "Category not found." });
                }

                return Ok(new { success = true, message = "Done.", data = category });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpPost("create")] // api/category/create
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryViewModel model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.Name))
                {
                    return Ok(new { success = false, message = "Category name is required." });
                }

                var categoryExists = await _context.Categories
                    .Where(c => c.Name.ToLower() == model.Name.ToLower() && !c.IsDeleted)
                    .FirstOrDefaultAsync();

                if (categoryExists is not null)
                {
                    return Ok(new { success = false, message = "Category name already exists." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                var category = new Categories
                {
                    Name = model.Name,
                    CreatedById = userId
                };

                await _context.Categories.AddAsync(category);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return Ok(new { success = true, message = "Category created successfully." });
                }
                else
                {
                    return Ok(new { success = false, message = "Category creation failed." });
                }                
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpPut("update/{id}")] // api/category/update/1
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryViewModel model)
        {
            try
            {
                if(string.IsNullOrEmpty(model.Name))
                {
                    return Ok(new { success = false, message = "Category name is required." });
                }

                var categoryExists = await _context.Categories
                    .Where(c => c.Name.ToLower() == model.Name.ToLower() && c.Id != id && !c.IsDeleted)
                    .FirstOrDefaultAsync();

                if (categoryExists is not null)
                {
                    return Ok(new { success = false, message = "Category name already exists." });
                }

                var category = await _context.Categories
                    .Where(c => c.Id == id && !c.IsDeleted)
                    .FirstOrDefaultAsync();

                if (category is null)
                {
                    return Ok(new { success = false, message = "Category not found." });
                }

                category.Name = model.Name;
                category.UpdatedAt = DateTime.Now;

                _context.Categories.Update(category);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return Ok(new { success = true, message = "Category updated successfully." });
                }
                else
                {
                    return Ok(new { success = false, message = "Category update failed." });
                }
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpDelete("delete/{id}")]  // api/category/delete/1
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var category = await _context.Categories
                    .Where(c => c.Id == id && !c.IsDeleted)
                    .FirstOrDefaultAsync();

                if (category is null)
                {
                    return Ok(new { success = false, message = "Category not found." });
                }

                category.IsDeleted = true;
                category.UpdatedAt = DateTime.Now;

                _context.Categories.Update(category);
                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    return Ok(new { success = true, message = "Category deleted successfully." });
                }
                else
                {
                    return Ok(new { success = false, message = "Category deletion failed." });
                }
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpGet("{id}/articles")] // api/category/1/articles
        public async Task<IActionResult> GetCategoryArticles(int id, [FromQuery] PaginationModel pagination)
        {
            try
            {
                var articlesQuery = _context.Articles
                    .Where(a => a.CategoryId == id && !a.IsDeleted)
                    .OrderByDescending(a => a.CreatedAt) 
                    .Select(a => new GeneralArticleDetailsViewModel
                    {
                        CreatedById = a.CreatedById,
                        CreatedByFullName = a.CreatedBy.FullName,
                        UrlAsText = a.UrlAsText,
                        Id = a.Id,
                        Title = a.Title,
                        CoverImagePath = a.CoverImagePath,
                        TotalNumberOfViews = a.TotalNumberOfViews,
                        RatingAvg = a.RatingAvg
                    });

                if (pagination.EndRow.HasValue && pagination.StartRow >= 0)
                {
                    articlesQuery = articlesQuery.Skip(pagination.StartRow).Take(pagination.EndRow.Value - pagination.StartRow);
                }

                var articles = await articlesQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = articles });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpGet("{id}/articles/published")] // api/category/1/articles/published
        public async Task<IActionResult> GetCategoryPublishedArticles(int id, [FromQuery] PaginationModel pagination)
        {
            try
            {
                var articlesQuery = _context.Articles
                    .Where(a => a.CategoryId == id && a.IsPublished && !a.IsDeleted)
                    .OrderByDescending(a => a.CreatedAt)
                    .Select(a => new GeneralArticleDetailsViewModel
                    {
                        CreatedById = a.CreatedById,
                        CreatedByFullName = a.CreatedBy.FullName,
                        UrlAsText = a.UrlAsText,
                        Id = a.Id,
                        Title = a.Title,
                        CoverImagePath = a.CoverImagePath,
                        TotalNumberOfViews = a.TotalNumberOfViews,
                        RatingAvg = a.RatingAvg
                    });

                if (pagination.EndRow.HasValue && pagination.StartRow >= 0)
                {
                    articlesQuery = articlesQuery.Skip(pagination.StartRow).Take(pagination.EndRow.Value - pagination.StartRow);
                }

                var articles = await articlesQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = articles });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpGet("{id}/articles/published/count")] // api/category/1/articles/published/count
        public async Task<IActionResult> GetCategoryPublishedArticlesCount(int id)
        {
            try
            {
                var articlesCount = await _context.Articles
                    .Where(a => a.CategoryId == id && a.IsPublished && !a.IsDeleted)
                    .CountAsync();

                return Ok(new { success = true, message = "Done.", data = articlesCount });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpGet("{id}/articles/unpublished")] // api/category/1/articles/unpublished
        public async Task<IActionResult> GetCategoryUnpublishedArticles(int id, [FromQuery] PaginationModel pagination)
        {
            try
            {
                var articlesQuery = _context.Articles
                    .Where(a => a.CategoryId == id && !a.IsPublished && !a.IsDeleted)
                    .OrderByDescending(a => a.CreatedAt)
                    .Select(a => new GeneralArticleDetailsViewModel
                    {
                        CreatedById = a.CreatedById,
                        CreatedByFullName = a.CreatedBy.FullName,
                        UrlAsText = a.UrlAsText,
                        Id = a.Id,
                        Title = a.Title,
                        CoverImagePath = a.CoverImagePath,
                        TotalNumberOfViews = a.TotalNumberOfViews,
                        RatingAvg = a.RatingAvg
                    });

                if (pagination.EndRow.HasValue && pagination.StartRow >= 0)
                {
                    articlesQuery = articlesQuery.Skip(pagination.StartRow).Take(pagination.EndRow.Value - pagination.StartRow);
                }

                var articles = await articlesQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = articles });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [HttpGet("{id}/articles/unpublished/count")] // api/category/1/articles/unpublished/count
        public async Task<IActionResult> GetCategoryUnpublishedArticlesCount(int id)
        {
            try
            {
                var articlesCount = await _context.Articles
                    .Where(a => a.CategoryId == id && !a.IsPublished && !a.IsDeleted)
                    .CountAsync();

                return Ok(new { success = true, message = "Done.", data = articlesCount });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }
    }
}
