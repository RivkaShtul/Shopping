using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shopping.Domain.Models.DAO;

namespace Shopping.Data.Services.Categories;

public class CategoryService : ICategoryService
{
    private readonly ShoppingDbContext _dbContext;
    private readonly ILogger<CategoryService> _logger;

    public CategoryService(ShoppingDbContext dbContext, ILogger<CategoryService> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        _logger.LogInformation("[CategoryService][GetAllCategoriesAsync] Function start");
        var categories = await _dbContext.Categories
            .Include(c => c.Products)
            .ToListAsync();

        _logger.LogInformation("[CategoryService][GetAllCategoriesAsync] Function ending with res {@response}", categories);
        return categories;
    }
}
