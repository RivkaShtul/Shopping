using AutoMapper;
using Shopping.Data.Services.Categories;
using Shopping.Domain.Models.DTO;

namespace Shopping.Services.ShoppingProduct
{
    public class ShoppingProductService : IShoppingProductService
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;
        public ShoppingProductService(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }
        public async Task<IEnumerable<CategoryDTO>> GetShoppingProducts()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return _mapper.Map<IEnumerable<CategoryDTO>>(categories);
        }
    }
}
