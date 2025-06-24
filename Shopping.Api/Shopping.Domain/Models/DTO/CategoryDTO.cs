namespace Shopping.Domain.Models.DTO;

public class CategoryDTO
{
    public int Id { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public List<ProductDTO> Products { get; set; } = new List<ProductDTO>();
}
