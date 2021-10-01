using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using sales_order.Clients.Data;
using sales_order.Clients.Dtos;
using sales_order.Clients.Models;

namespace sales_order.Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientRepo repo;
        private readonly IMapper mapper;

        public ClientsController(IClientRepo repo, IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ClientReadDto>> GetAllClients()
        {
            IEnumerable<Client> clients = repo.GetAllClients();
            return Ok(mapper.Map<IEnumerable<ClientReadDto>>(clients));
        }

        [HttpGet("{id}", Name = "GetCLientById")]
        public ActionResult<Client> GetClientById(int id)
        {
            try
            {
                var client = repo.GetClientById(id);
                return Ok(mapper.Map<ClientReadDto>(client));

            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpPost]
        public ActionResult<Client> CreateClient(ClientCreateDto dto)
        {
            Client client = mapper.Map<Client>(dto);
            repo.CreateClient(client);
            repo.SaveChanges();

            return CreatedAtRoute(nameof(GetClientById), new { Id = client.CardCode }, client);

        }

    }
}