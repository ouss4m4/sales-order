using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using sales_order.Items.Data;
using sales_order.Items.Dtos;
using sales_order.Items.Models;
using sales_order.Users.Models;

namespace sales_order.Items.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemRepo repo;
        private readonly IMapper mapper;

        public ItemsController(IItemRepo repo, IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemReadDto>>> GetAllItems()
        {
            IEnumerable<Item> items = await repo.GetAllItems();
            return Ok(mapper.Map<IEnumerable<ItemReadDto>>(items));
        }

        [HttpGet("{id}", Name = "GetItemById")]
        public async Task<ActionResult<Item>> GetItemById(int id)
        {
            Item item = await repo.GetItemById(id);
            return Ok(mapper.Map<ItemReadDto>(item));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(ItemCreateDto dto)
        {
            Item item = mapper.Map<Item>(dto);
            await repo.CreateItem(item);
            await repo.SaveChanges();

            return CreatedAtRoute(nameof(GetItemById), new { Id = item.ItemCode }, item);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Item>> UpdateItem(ItemReadDto dto)
        {
            var item = mapper.Map<Item>(dto);
            await repo.UpdateItem(item);
            await repo.SaveChanges();
            return Ok(mapper.Map<ItemReadDto>(item));
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("{id}")]
        public async Task<ActionResult> EditItem(int id, JsonPatchDocument<ItemReadDto> patchDto)
        {
            Item item = await repo.GetItemById(id);
            if (item == null)
            {
                return NotFound();
            }

            var patchItem = mapper.Map<JsonPatchDocument<Item>>(patchDto);
            patchItem.ApplyTo(item);
            await repo.UpdateItem(item);
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<ActionResult> DeleteItem(ItemReadDto dto)
        {
            var item = mapper.Map<Item>(dto);
            repo.DeleteItem(item);
            await repo.SaveChanges();
            return NoContent();
        }
    }
}