using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var guest = new User
                {
                    UserName = "guest",
                    Email = "guest@test.com"
                };
                await userManager.CreateAsync(guest, "Random1@");
                await userManager.AddToRoleAsync(guest, "Member");

                var gmainCat = new Category
                {
                    Name = "Learning",
                    UserId = guest.Id,
                    IsMain = true
                };
                var gsubCat = new Category
                {
                    Name = "Remembered",
                    UserId = guest.Id
                };
                context.Categories.Add(gmainCat);
                context.Categories.Add(gsubCat);

                var member = new User
                {
                    UserName = "giahan",
                    Email = "giahan@test.com"
                };
                await userManager.CreateAsync(member, "Manh2011$");
                await userManager.AddToRoleAsync(member, "Member");

                var mainCat = new Category
                {
                    Name = "Learning",
                    UserId = member.Id,
                    IsMain = true
                };
                var subCat = new Category
                {
                    Name = "Remembered",
                    UserId = member.Id
                };
                context.Categories.Add(mainCat);
                context.Categories.Add(subCat);

                var admin = new User
                {
                    UserName = "diemhuong",
                    Email = "diemhuong@test.com"
                };
                await userManager.CreateAsync(admin, "Huong11$");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });

                var amainCat = new Category
                {
                    Name = "Learning",
                    UserId = admin.Id,
                    IsMain = true
                };
                var asubCat = new Category
                {
                    Name = "Remembered",
                    UserId = admin.Id
                };
                context.Categories.Add(amainCat);
                context.Categories.Add(asubCat);
            }
            context.SaveChanges();
        }
    }
}