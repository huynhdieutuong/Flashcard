using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class ListCard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3b16c5d6-3262-49fb-b57b-11e1e5a77693");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fd5d6434-5fd3-4722-9eff-05caa7eb0cb2");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4e91bda6-271c-4614-8bd2-8ffc3f57c33b", "647506e1-8f1d-44fb-ac1f-a693501018bd", "Admin", "ADMIN" },
                    { "5239cf98-b759-49df-8fca-668bf597aa6d", "ea223bce-16ae-45dc-a20b-89f55310bb02", "Member", "MEMBER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cards_CategoryId",
                table: "Cards",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cards_Categories_CategoryId",
                table: "Cards",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cards_Categories_CategoryId",
                table: "Cards");

            migrationBuilder.DropIndex(
                name: "IX_Cards_CategoryId",
                table: "Cards");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4e91bda6-271c-4614-8bd2-8ffc3f57c33b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5239cf98-b759-49df-8fca-668bf597aa6d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3b16c5d6-3262-49fb-b57b-11e1e5a77693", "14a056a8-8dd0-4dff-a6bc-01c36c53f71c", "Member", "MEMBER" },
                    { "fd5d6434-5fd3-4722-9eff-05caa7eb0cb2", "3d8357f7-5c04-483b-ba92-d7566a1b2e7b", "Admin", "ADMIN" }
                });
        }
    }
}
