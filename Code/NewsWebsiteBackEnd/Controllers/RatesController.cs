using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.DTO.Rate;
using NewsWebsiteBackEnd.DTO.Solr;
using NewsWebsiteBackEnd.Models;
using SolrNet;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUsers> _userManager;
        private readonly HttpClient _httpClient;

        public RatesController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager)
        {
            _context = context;
            _userManager = userManager;
            _httpClient = new HttpClient();
        }

        [HttpPost("rate-article")]
        public async Task<IActionResult> RateArticle([FromBody] RateArticleDTO rateArticleDTO)
        {
            var user = await _userManager.FindByIdAsync(rateArticleDTO.UserId);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var article = _context.Articles.FirstOrDefault(a => a.UrlAsText == rateArticleDTO.UrlAsText);
            if (article == null)
            {
                return BadRequest("Article not found");
            }

            var existingRating = _context.Ratings.FirstOrDefault(r => r.ArticleId == article.Id && r.CreatedById == user.Id);
            if (existingRating != null)
            {
                existingRating.Percentage = rateArticleDTO.Rate;
                existingRating.UpdatedAt = DateTime.Now;
                _context.Ratings.Update(existingRating);
            }
            else
            {
                var rating = new Ratings
                {
                    ArticleId = article.Id,
                    CreatedById = user.Id,
                    Percentage = rateArticleDTO.Rate
                };

                _context.Ratings.Add(rating);
                user.Ratings.Add(rating);
                article.TotalNumberOfRatings++;
            }

            await _context.SaveChangesAsync();

            article.RatingAvg = (article.RatingAvg * (article.TotalNumberOfRatings - 1) + rateArticleDTO.Rate) / article.TotalNumberOfRatings;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("user-rating")]
        public async Task<IActionResult> GetUserRating(string userId, string urlAsText)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var article = _context.Articles.FirstOrDefault(a => a.UrlAsText == urlAsText);
            if (article == null)
            {
                return BadRequest("Article not found");
            }

            var rating = _context.Ratings.FirstOrDefault(r => r.ArticleId == article.Id && r.CreatedById == user.Id);
            if (rating == null)
            {
                return Ok(new { Rate = 0 });
            }

            return Ok(new { Rate = rating.Percentage });
        }
    }
}
