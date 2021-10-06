using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
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
            return Ok(mapper.Map<OrderReadDto>(order));
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderCreateDto dto)
        {
            var order = mapper.Map<Order>(dto);
            Order result = await createOrder.execute(order);
            return CreatedAtRoute(nameof(GetOrderById), new { Id = result.OrderId }, result);
        }
    }
}