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
                var member = new User
                {
                    UserName = "giahan",
                    Email = "giahan@test.com"
                };
                await userManager.CreateAsync(member, "Manh2011$");
                await userManager.AddToRoleAsync(member, "Member");

                var admin = new User
                {
                    UserName = "diemhuong",
                    Email = "diemhuong@test.com"
                };
                await userManager.CreateAsync(admin, "Manh2011$");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }
            context.SaveChanges();
        }
    }
}