using AutoMapper;
using sales_order.Orders.Dtos;
using sales_order.Orders.Models;

namespace sales_order.Orders.Profiles
{
    public class OrdersProfiles : Profile
    {
        public OrdersProfiles()
        {
            CreateMap<OrderCreateDto, Order>();
            CreateMap<Order, OrderReadDto>();
            CreateMap<OrderLineCreateDto, OrderLine>();
            CreateMap<OrderLine, OrderLineReadDto>();
        }
    }
}