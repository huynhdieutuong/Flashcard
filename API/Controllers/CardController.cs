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
    public class CardController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly UserManager<User> _userManager;

        public CardController(StoreContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("{categoryId}")]
        public async Task<ActionResult<List<Card>>> GetCardsByCategoryId(int categoryId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var cards = await _context.Cards
                            .Where(x => x.CategoryId == categoryId && x.OwnerId == user.Id)
                            .OrderByDescending(x => x.ModifiedDate)
                            .ToListAsync();

            return cards;
        }

        [HttpPost]
        public async Task<ActionResult<Card>> CreateCard(CreateCardDto cardDto)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var card = new Card
            {
                English = cardDto.English,
                Vietnamese = cardDto.Vietnamese,
                CategoryId = cardDto.CategoryId,
                OwnerId = user.Id
            };

            _context.Cards.Add(card);
            await _context.SaveChangesAsync();
            return card;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Card>> EditCard(int id, CreateCardDto cardDto)
        {
            var card = await _context.Cards.FirstOrDefaultAsync(x => x.Id == id);
            card.English = cardDto.English;
            card.Vietnamese = cardDto.Vietnamese;

            if (card.CategoryId != cardDto.CategoryId)
            {
                card.CategoryId = cardDto.CategoryId;
                card.ModifiedDate = DateTime.UtcNow;
            }

            _context.Cards.Update(card);
            await _context.SaveChangesAsync();
            return card;
        }
    }
}