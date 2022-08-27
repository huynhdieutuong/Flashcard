using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Data.Migrations
{
    public partial class CategoryAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8deae406-b632-4824-87e8-8498128dd550");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dfc2f5a7-b73a-4fba-abf3-59f95eff9cac");

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "185034a2-e458-495c-b4d5-5a2a9cab0a14", "af5bd8de-3595-4dbb-ba6c-d0c4cd66f8d6", "Admin", "ADMIN" },
                    { "bbcd9fcc-8f10-4c11-8f34-d928fdee2739", "3548c41f-ed41-46e9-ae47-9d1add50cf08", "Member", "MEMBER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "185034a2-e458-495c-b4d5-5a2a9cab0a14");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bbcd9fcc-8f10-4c11-8f34-d928fdee2739");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8deae406-b632-4824-87e8-8498128dd550", "a3017249-4504-4f79-8fb4-2748e62ffb38", "Admin", "ADMIN" },
                    { "dfc2f5a7-b73a-4fba-abf3-59f95eff9cac", "f1a4a8d6-ed72-48c6-a486-12529f383891", "Member", "MEMBER" }
                });
        }
    }
}
