using AutoMapper;
using sales_order.Items.Dtos;
using sales_order.Items.Models;

namespace sales_order.Items.Profiles
{
    public class ItemsProfile : Profile
    {
        public ItemsProfile()
        {
            CreateMap<ItemCreateDto, Item>();
            CreateMap<Item, ItemReadDto>();
        }

    }
}