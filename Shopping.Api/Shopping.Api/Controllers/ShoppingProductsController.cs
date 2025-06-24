using Microsoft.AspNetCore.Mvc;
using Shopping.Services.ShoppingProduct;

namespace Shopping.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShoppingProductsController : ControllerBase
{
    private readonly IShoppingProductService _shoppingProductService;

    public ShoppingProductsController(IShoppingProductService shoppingProductService)
    {
        _shoppingProductService = shoppingProductService;
    }

    [HttpGet]
    public async Task<IActionResult> ShoppingProducts()
    {
        var categories = await _shoppingProductService.GetShoppingProducts();
        return Ok(categories);
    }
}
