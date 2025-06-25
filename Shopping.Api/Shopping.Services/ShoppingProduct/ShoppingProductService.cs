using AutoMapper;
using Microsoft.Extensions.Logging;
using Shopping.Data.Services.Categories;
using Shopping.Domain.Models.DTO;

namespace Shopping.Services.ShoppingProduct
{
    public class ShoppingProductService : IShoppingProductService
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;
        private readonly ILogger<ShoppingProductService> _logger;
        public ShoppingProductService(ICategoryService categoryService, IMapper mapper, ILogger<ShoppingProductService> logger)
        {
            _categoryService = categoryService;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<IEnumerable<CategoryDTO>> GetShoppingProducts()
        {
            _logger.LogInformation("[ShoppingProductService][GetShoppingProducts] Function start");
            var categories = await _categoryService.GetAllCategoriesAsync();
            var shoppingProducts = _mapper.Map<IEnumerable<CategoryDTO>>(categories);
            _logger.LogInformation("[ShoppingProductService][GetShoppingProducts] Function ending with res {@response}", shoppingProducts);
            return shoppingProducts;
        }
    }
}
