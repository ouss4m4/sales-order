using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using sales_order.Orders.Data;
using sales_order.Orders.Dtos;
using sales_order.Orders.Models;
using sales_order.Orders.UseCases;

namespace sales_order.Orders.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepo repo;
        private readonly IMapper mapper;
        private readonly CreateOrder createOrder;

        public OrdersController(IOrderRepo repo, IMapper mapper, CreateOrder createOrder)
        {
            this.repo = repo;
            this.mapper = mapper;
            this.createOrder = createOrder;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            IEnumerable<Order> orders = await repo.GetAllOrders();

            return Ok(mapper.Map<List<OrderReadDto>>(orders));
        }

        [HttpGet("{id}", Name = "GetOrderById")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            Order order = await repo.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<OrderReadDto>(order));
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderCreateDto dto)
        {
            var order = mapper.Map<Order>(dto);
            Order result = await createOrder.execute(order);
            return CreatedAtRoute(nameof(GetOrderById), new { Id = result.OrderId }, result);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<Order>> EditOrder(int id, JsonPatchDocument<OrderReadDto> patchDto)
        {
            Order order = await repo.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }

            var orderPatch = mapper.Map<JsonPatchDocument<Order>>(patchDto);
            orderPatch.ApplyTo(order);
            await repo.updateOrder(order);
            return Ok(mapper.Map<OrderReadDto>(order));
        }
    }
}