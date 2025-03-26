using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sales_order.Clients.Data;
using sales_order.Clients.Dtos;
using sales_order.Clients.Models;
// using sales_order.Users.Models;

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
        public async Task<ActionResult<IEnumerable<ClientReadDto>>> GetAllClients()
        {
            IEnumerable<Client> clients = await repo.GetAllClients();
            return Ok(mapper.Map<IEnumerable<ClientReadDto>>(clients));
        }

        [HttpGet("{id}", Name = "GetClientById")]
        public async Task<ActionResult<Client>> GetClientById(int id)
        {
            try
            {
                var client = await repo.GetClientById(id);
                return Ok(mapper.Map<ClientReadDto>(client));

            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Client>> CreateClient(ClientCreateDto dto)
        {
            Client client = mapper.Map<Client>(dto);
            await repo.CreateClient(client);
            await repo.SaveChanges();

            return CreatedAtRoute(nameof(GetClientById), new { Id = client.CardCode }, client);

        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Client>> EditClient(ClientReadDto dto)
        {
            Client client = mapper.Map<Client>(dto);
            await repo.EditClient(client);
            return Ok(mapper.Map<ClientReadDto>(client));
        }

    }
}