using Microsoft.EntityFrameworkCore;
using PhoneBook.Server.Models;

namespace PhoneBook.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Register services to the container.
            builder.Services.AddDbContext<PhoneBookContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddControllers();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            builder.Services.AddEndpointsApiExplorer();
            // builder.Services.AddSwaggerGen(); // Commented out to remove Swagger
            builder.Services.AddHealthChecks();

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<PhoneBookContext>();
                dbContext.Database.Migrate(); // Apply pending migrations
            }

            // Use static files middleware
            app.UseStaticFiles();

            app.UseCors("AllowAll");

            // Health check endpoint
            app.MapHealthChecks("/health");

            // Middleware to handle specific static file requests
            app.Use(async (context, next) =>
            {
                // If the incoming request path starts with "/static/", handle it
                if (context.Request.Path.ToString().StartsWith("/static/"))
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "static", context.Request.Path.ToString().TrimStart('/'));
                    if (File.Exists(path))
                    {
                        context.Response.StatusCode = 200;
                        await context.Response.SendFileAsync(path);
                        return;
                    }
                    else
                    {
                        context.Response.StatusCode = 404;
                        await context.Response.WriteAsync("Not found");
                        return;
                    }
                }

                await next();
            });

            // Map API controllers
            app.MapControllers();

            // Fallback to the index.html for SPA support (React App)
            app.MapFallbackToFile("/index.html");

            // Start the application
            app.Run();
        }
    }
}

