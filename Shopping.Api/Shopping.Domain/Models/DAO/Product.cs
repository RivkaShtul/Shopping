using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shopping.Domain.Models.DAO;

[Table("products")]
public class Product
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("categoryId")]
    public int CategoryId { get; set; }

    [Required]
    [MaxLength(255)]
    [Column("productName")]
    public string ProductName { get; set; } = string.Empty;

    [Required]
    [Column("price", TypeName = "decimal(10,2)")]
    public decimal Price { get; set; }

    [ForeignKey("CategoryId")]
    public virtual Category Category { get; set; } = null!;
}
