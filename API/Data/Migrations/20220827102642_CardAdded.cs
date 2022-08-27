using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Data.Migrations
{
    public partial class CardAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "185034a2-e458-495c-b4d5-5a2a9cab0a14");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bbcd9fcc-8f10-4c11-8f34-d928fdee2739");

            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    English = table.Column<string>(type: "text", nullable: false),
                    Vietnamese = table.Column<string>(type: "text", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    OwnerId = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3b16c5d6-3262-49fb-b57b-11e1e5a77693", "14a056a8-8dd0-4dff-a6bc-01c36c53f71c", "Member", "MEMBER" },
                    { "fd5d6434-5fd3-4722-9eff-05caa7eb0cb2", "3d8357f7-5c04-483b-ba92-d7566a1b2e7b", "Admin", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cards");

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
                    { "185034a2-e458-495c-b4d5-5a2a9cab0a14", "af5bd8de-3595-4dbb-ba6c-d0c4cd66f8d6", "Admin", "ADMIN" },
                    { "bbcd9fcc-8f10-4c11-8f34-d928fdee2739", "3548c41f-ed41-46e9-ae47-9d1add50cf08", "Member", "MEMBER" }
                });
        }
    }
}
