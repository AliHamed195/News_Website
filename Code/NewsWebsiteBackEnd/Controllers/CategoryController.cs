using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.Models.ViewModels.Category;
using NewsWebsiteBackEnd.Models.ViewModels.Pagination;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllCategories([FromQuery] PaginationModel pagination)
        {
            try
            {
                var categoriesQuery = _context.Categories
                .AsNoTracking()
                .Where(c => !c.IsDeleted)
                .Select(c => new CategoryDetailsViewModel
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
            catch (Exception e)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }   
        }
        
    }
}
