using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class UpdateCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4e91bda6-271c-4614-8bd2-8ffc3f57c33b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5239cf98-b759-49df-8fca-668bf597aa6d");

            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "Categories",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9befcadd-927c-453a-be45-074c01502be1", "76b0cc1f-7e33-49a2-ad2f-4f50caa8f5f2", "Member", "MEMBER" },
                    { "e33e7808-9fd6-4df9-9093-885850a26f99", "2bc58f41-e363-457f-8594-91a444afff02", "Admin", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9befcadd-927c-453a-be45-074c01502be1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e33e7808-9fd6-4df9-9093-885850a26f99");

            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "Categories");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4e91bda6-271c-4614-8bd2-8ffc3f57c33b", "647506e1-8f1d-44fb-ac1f-a693501018bd", "Admin", "ADMIN" },
                    { "5239cf98-b759-49df-8fca-668bf597aa6d", "ea223bce-16ae-45dc-a20b-89f55310bb02", "Member", "MEMBER" }
                });
        }
    }
}
