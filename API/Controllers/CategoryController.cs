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
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var categories = await _context.Categories.Where(x => x.UserId == user.Id).ToListAsync();
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