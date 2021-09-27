using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using sales_order.Items.Data;
using sales_order.Models;

namespace sales_order.Items.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemRepo repo;

        public ItemsController(IItemRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Item>> GetAllItems()
        {
            var items = repo.GetAllItems();
            return Ok(items);
        }

        [HttpGet("{id}", Name = "GetItemById")]
        public ActionResult<Item> GetItemById(int id)
        {
            var item = repo.GetItemById(id);
            return Ok(item);
        }

        [HttpPost]
        public ActionResult<Item> CreateItem(Item dto)
        {
            repo.CreateItem(dto);
            repo.SaveChanges();

            return CreatedAtRoute(nameof(GetItemById), new { Id = dto.Id }, dto);
        }

    }
}