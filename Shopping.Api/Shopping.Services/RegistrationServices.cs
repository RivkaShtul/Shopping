using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Shopping.Services.ShoppingProduct;

namespace Shopping.Services
{
    public static class RegistrationServices
    {
        public static void RegisterServices(this WebApplicationBuilder builder)
        {           
            builder.Services.AddScoped<IShoppingProductService, ShoppingProductService>();
        }
    }
}
