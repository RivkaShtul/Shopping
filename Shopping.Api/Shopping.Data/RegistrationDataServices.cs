using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shopping.Data.Services.Categories;

namespace Shopping.Data
{
    public static class RegistrationDataServices
    {
        public static void RegisterData(this WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<ShoppingDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection")));
            builder.Services.AddScoped<ICategoryService, CategoryService>();
        }
    }
}
