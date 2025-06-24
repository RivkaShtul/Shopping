using Shopping.Domain.Models.DAO;

namespace Shopping.Data.Services.Categories;

public interface ICategoryService
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync();
}
