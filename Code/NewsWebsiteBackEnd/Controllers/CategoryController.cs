using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.Classes.Names;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.DTO.Article;
using NewsWebsiteBackEnd.DTO.Category;
using NewsWebsiteBackEnd.DTO.Pagination;
using NewsWebsiteBackEnd.Models;
using System.Data;
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

        [Authorize(Roles = DefaultSystemRoles.Admin)]
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

                categoriesQuery = categoriesQuery.Skip(pagination.StartRow).Take(pagination.EndRow - pagination.StartRow);

                var categories = await categoriesQuery.OrderByDescending(c => c.Id).ToListAsync();

                return Ok(new { success = true, message = "Done.", data = categories });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }   
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("{id}")] // api/category/1
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                var category = await _context.Categories
                    .AsNoTracking()
                    .Include(c => c.User)
                    .Where(c => c.Id == id && !c.IsDeleted)
                    .Select(c => new CategoryDetailsViewModel
                    {
                        Id = c.Id,
                        Name = c.Name,
                        CreatedAt = c.CreatedAt,
                        UpdatedAt = c.UpdatedAt,
                        IsDeleted = c.IsDeleted,
                        CreatedById = c.CreatedById,
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

        [Authorize(Roles = DefaultSystemRoles.Admin)]
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
                if (user is null || user.IsDeleted || user.IsBlocked)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                var category = new Categories
                {
                    Name = model.Name,
                    CreatedById = userId
                };

                await _context.Categories.AddAsync(category);

                if(user.Categories is null)
                {
                    user.Categories = new List<Categories>();
                }
                user.Categories.Add(category);
                _context.Users.Update(user);

                var result = await _context.SaveChangesAsync();

                if (result > 0)
                {
                    var generalCategoryDetails = new GeneralCategoryDetailsViewModel
                    {
                        Id = category.Id,
                        Name = category.Name,
                        ArticlesCount = category.ArticlesCount
                    };

                    return Ok(new { success = true, message = "Category created successfully." , data = generalCategoryDetails });
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

        [Authorize(Roles = DefaultSystemRoles.Admin)]
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
                    var generalCategoryDetails = new GeneralCategoryDetailsViewModel
                    {
                        Id = category.Id,
                        Name = category.Name,
                        ArticlesCount = category.ArticlesCount
                    };

                    return Ok(new { success = true, message = "Category updated successfully.", data = generalCategoryDetails });
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

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpPut("delete/{id}")]  // api/category/delete/1
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

                if (category.ArticlesCount > 0)
                {
                    return Ok(new { success = false, message = "Category has articles, so it cannot be deleted." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (category.CreatedById != userId)
                {
                    return Ok(new { success = false, message = "You are not authorized to delete this category." });
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

        [AllowAnonymous]
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
        [HttpGet("all/count")] // api/category/all/count
        public async Task<IActionResult> GetAllCategoriesCount()
        {
            try
            {
                var categoriesCount = await _context.Categories
                    .AsNoTracking()
                    .Where(c => !c.IsDeleted)
                    .CountAsync();

                return Ok(new { success = true, message = "Done.", data = categoriesCount });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [Authorize(Roles = DefaultSystemRoles.Admin)]
        [HttpGet("all/articles/count")] // api/category/all/articles/count
        public async Task<IActionResult> GetAllCategoriesWithArticlesCount()
        {
            try
            {
                var categories = await _context.Categories
                    .AsNoTracking()
                    .Where(c => !c.IsDeleted && c.ArticlesCount > 0)
                    .CountAsync();

                return Ok(new { success = true, message = "Done.", data = categories });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        [AllowAnonymous]
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

        [Authorize(Roles = DefaultSystemRoles.Admin)]
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
