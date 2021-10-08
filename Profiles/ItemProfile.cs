using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
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
            CreateMap<ItemReadDto, Item>();
            CreateMap<JsonPatchDocument<ItemReadDto>, JsonPatchDocument<Item>>();
            CreateMap<Operation<ItemReadDto>, Operation<Item>>();
        }

    }
}