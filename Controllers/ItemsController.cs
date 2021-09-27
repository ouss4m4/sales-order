using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using sales_order.Items.Data;
using sales_order.Items.Dtos;
using sales_order.Items.Models;

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
        public ActionResult<IEnumerable<ItemReadDto>> GetAllItems()
        {
            IEnumerable<Item> items = repo.GetAllItems();
            return Ok(mapper.Map<IEnumerable<ItemReadDto>>(items));
        }

        [HttpGet("{id}", Name = "GetItemById")]
        public ActionResult<Item> GetItemById(int id)
        {
            Item item = repo.GetItemById(id);
            return Ok(mapper.Map<ItemReadDto>(item));
        }

        [HttpPost]
        public ActionResult<Item> CreateItem(ItemCreateDto dto)
        {
            Item item = mapper.Map<Item>(dto);
            repo.CreateItem(item);
            repo.SaveChanges();

            return CreatedAtRoute(nameof(GetItemById), new { Id = item.Id }, item);
        }

    }
}