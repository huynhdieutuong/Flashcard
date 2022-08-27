## Init .NET API Project

```
dotnet new sln
dotnet new webapi -o API
dotnet sln add API
dotnet new gitignore
```

## Integrate Entity Framework

1. Install packages

```
cd API
dotnet tool install --global dotnet-ef

dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

2. Create database `flashcard` in Postgres

3. Auto create table from Migrations & Seed database

```
dotnet ef migrations add IdentityAdded -o Data/Migrations
dotnet watch run
```
