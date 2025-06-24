using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shopping.Domain.Models.DAO;

[Table("categories")]
public class Category
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("categoryName")]
    public string CategoryName { get; set; } = string.Empty;

    // Navigation property
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
