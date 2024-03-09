using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsWebsiteBackEnd.Context;
using NewsWebsiteBackEnd.Models;
using NewsWebsiteBackEnd.Models.ViewModels.Pagination;
using NewsWebsiteBackEnd.Models.ViewModels.QuestionAnswer;
using System.Security.Claims;

namespace NewsWebsiteBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionAnswerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUsers> _userManager;

        public QuestionAnswerController(ApplicationDbContext context, UserManager<ApplicationUsers> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // This method for getting all questions
        [HttpGet("all-questions")] // api/QuestionAnswer/all-questions
        public async Task<IActionResult> GetAllQuestions([FromQuery] PaginationModel pagination)
        {
            try
            {
                var questionsQuery = _context.QuestionsAnswers
                    .AsNoTracking()
                    .Where(x => !x.IsDeleted)
                    .Select(x => new GeneralQuestionAnswerDetailsViewModel
                    {
                        Id = x.Id,
                        Question = x.Question
                    });

                if (pagination is not null && pagination.EndRow.HasValue)
                {
                    questionsQuery = questionsQuery.Skip(pagination.StartRow).Take(pagination.EndRow.Value - pagination.StartRow);
                }

                var questions = await questionsQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = questions });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        // This method for getting all questions and answers
        [HttpGet("all")] // api/QuestionAnswer/all
        public async Task<IActionResult> GetAllQuestionsAnswers([FromQuery] PaginationModel pagination)
        {
            try
            {
                var questionsAnswersQuery = _context.QuestionsAnswers
                    .AsNoTracking()
                    .Where(x => !x.IsDeleted)
                    .Select(x => new GeneralQuestionAnswerDetailsViewModel
                    {
                        Id = x.Id,
                        Question = x.Question,
                        Answer = x.Answer
                    });

                if (pagination is not null && pagination.EndRow.HasValue)
                {
                    questionsAnswersQuery = questionsAnswersQuery.Skip(pagination.StartRow).Take(pagination.EndRow.Value - pagination.StartRow);
                }

                var questionsAnswers = await questionsAnswersQuery.ToListAsync();

                return Ok(new { success = true, message = "Done.", data = questionsAnswers });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        // This method for getting question and answer by id
        [HttpGet("{id}")] // api/QuestionAnswer/1
        public async Task<IActionResult> GetQuestionAnswerById(int id)
        {
            try
            {
                var questionAnswer = await _context.QuestionsAnswers
                    .AsNoTracking()
                    .Where(x => x.Id == id)
                    .Select(x => new QuestionAnswerDetailsViewModel
                    {
                        Id = x.Id,
                        Question = x.Question,
                        Answer = x.Answer,
                        CreatedAt = x.CreatedAt,
                        UpdatedAt = x.UpdatedAt,
                        IsDeleted = x.IsDeleted,
                        CreatedById = x.CreatedById,
                        UserFullName = x.CreatedByUser.FullName
                    })
                    .FirstOrDefaultAsync();

                if (questionAnswer is null)
                {
                    return Ok(new { success = false, message = "Not Found" });
                }

                return Ok(new { success = true, message = "Done.", data = questionAnswer });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        // This method for adding new question and answer
        [HttpPost("create")] // api/QuestionAnswer
        public async Task<IActionResult> CreateQuestionAnswer([FromBody] CreateQuestionAnswerViewModel model)
        {
            try
            {
                if(string.IsNullOrWhiteSpace(model.Question) || string.IsNullOrWhiteSpace(model.Answer))
                {
                    return Ok(new { success = false, message = "Question and Answer are required." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user is null || user.IsDeleted || user.IsBlocked)
                {
                    return Ok(new { success = false, message = "User not found." });
                }

                var questionAnswer = new QuestionsAnswers
                {
                    Question = model.Question,
                    Answer = model.Answer,
                    CreatedById = userId,
                    CreatedByUser = user
                };
                
                await _context.QuestionsAnswers.AddAsync(questionAnswer);
                var result = await _context.SaveChangesAsync();

                if (result <= 0)
                {
                    return Ok(new { success = false, message = "Failed to create." });
                }
                return Ok(new { success = true, message = "Done." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        // This method for updating question and answer
        [HttpPut("update/{id}")] // api/QuestionAnswer/update/1
        public async Task<IActionResult> UpdateQuestionAnswer(int id, [FromBody] UpdateQuestionAnswerViewModel model)
        {
            try
            {
                if(string.IsNullOrWhiteSpace(model.Question) || string.IsNullOrWhiteSpace(model.Answer))
                {
                    return Ok(new { success = false, message = "Question and Answer are required." });
                }

                var questionAnswer = await _context.QuestionsAnswers.FirstOrDefaultAsync(x => x.Id == id);
                if (questionAnswer is null)
                {
                    return Ok(new { success = false, message = "Not Found" });
                }

                questionAnswer.Question = model.Question;
                questionAnswer.Answer = model.Answer;
                questionAnswer.UpdatedAt = DateTime.Now;

                _context.QuestionsAnswers.Update(questionAnswer);
                var result = await _context.SaveChangesAsync();

                if (result <= 0)
                {
                    return Ok(new { success = false, message = "Failed to update." });
                }
                return Ok(new { success = true, message = "Done." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }

        // This method for deleting question and answer
        [HttpPut("delete/{id}")] // api/QuestionAnswer/delete/1
        public async Task<IActionResult> DeleteQuestionAnswer(int id)
        {
            try
            {
                var questionAnswer = await _context.QuestionsAnswers.FirstOrDefaultAsync(x => x.Id == id);
                if (questionAnswer is null)
                {
                    return Ok(new { success = false, message = "Not Found" });
                }

                questionAnswer.IsDeleted = true;
                questionAnswer.UpdatedAt = DateTime.Now;

                _context.QuestionsAnswers.Update(questionAnswer);
                var result = await _context.SaveChangesAsync();

                if (result <= 0)
                {
                    return Ok(new { success = false, message = "Failed to delete." });
                }
                return Ok(new { success = true, message = "Done." });
            }
            catch (Exception)
            {
                return Ok(new { success = false, message = "Exception Error" });
            }
        }
    }
}
