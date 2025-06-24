using Shopping.Domain.Models.DTO;

namespace Shopping.Services.ShoppingProduct;

public interface IShoppingProductService
{
    Task<IEnumerable<CategoryDTO>> GetShoppingProducts();
}
