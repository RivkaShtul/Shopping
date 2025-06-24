using AutoMapper;
using Shopping.Domain.Models.DAO;
using Shopping.Domain.Models.DTO;

namespace Shopping.Domain.Mappers;

public class CategoriesMapperProfile : Profile
{
    public CategoriesMapperProfile()
    {
        CreateMap<Category, CategoryDTO>()
            .ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.Products));

        CreateMap<Product, ProductDTO>();
    }
}
