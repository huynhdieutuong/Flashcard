using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class CategoryController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly UserManager<User> _userManager;

        public CategoryController(StoreContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<CategoryDto>>> GetCategories()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var categories = await _context.Categories
                                .Include(x => x.Cards)
                                .Where(x => x.UserId == user.Id)
                                .Select(x => new CategoryDto
                                {
                                    Id = x.Id,
                                    Name = x.Name,
                                    CardsCount = x.Cards.Count
                                }).ToListAsync();

            return categories;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Category>> CreateCategory(CreateCategoryDto categoryDto)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var category = new Category
            {
                Name = categoryDto.Name,
                UserId = user.Id
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }
    }
}