using Microsoft.EntityFrameworkCore;
using Shopping.Domain.Models.DAO;

namespace Shopping.Data.Services.Categories;

public class CategoryService : ICategoryService
{
    private readonly ShoppingDbContext _dbContext;

    public CategoryService(ShoppingDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        var categories = await _dbContext.Categories
            .Include(c => c.Products)
            .ToListAsync();

        return categories;
    }
}
