using AutoMapper;
using sales_order.Clients.Dtos;
using sales_order.Clients.Models;

namespace sales_order.Clients.Profiles
{
    public class ClientsProfile : Profile
    {
        public ClientsProfile()
        {
            CreateMap<ClientCreateDto, Client>();
            CreateMap<Client, ClientReadDto>();
            CreateMap<ClientReadDto, Client>();
        }

    }
}