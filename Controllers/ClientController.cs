using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using sales_order.Clients.Data;
using sales_order.Clients.Models;

namespace sales_order.Clients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClientRepo repo;
        public ClientsController(IClientRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Client>> GetAllClients()
        {
            var clients = repo.GetAllClients();
            return Ok(clients);
        }

        [HttpGet("{id}", Name = "GetCLientById")]
        public ActionResult<Client> GetClientById(int id)
        {
            var client = repo.GetClientById(id);
            return Ok(client);

        }

        [HttpPost]
        public ActionResult<Client> CreateClient(Client dto)
        {
            repo.CreateClient(dto);
            repo.SaveChanges();

            return CreatedAtRoute(nameof(GetClientById), new { Id = dto.Id }, dto);

        }

    }
}