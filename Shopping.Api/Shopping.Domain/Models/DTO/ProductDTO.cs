namespace Shopping.Domain.Models.DTO;

public class ProductDTO
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public decimal Price { get; set; }
}
