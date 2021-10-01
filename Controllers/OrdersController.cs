using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using sales_order.Orders.Data;
using sales_order.Orders.Dtos;
using sales_order.Orders.Models;

namespace sales_order.Orders.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepo repo;
        private readonly IMapper mapper;

        public OrdersController(IOrderRepo repo, IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Order>> GetAllOrders()
        {
            IEnumerable<Order> orders = repo.GetAllOrders();

            return Ok(mapper.Map<List<OrderReadDto>>(orders));
        }

        [HttpGet("{id}", Name = "GetOrderById")]
        public ActionResult<Order> GetOrderById(int id)
        {
            Order order = repo.GetOrderById(id);
            return Ok(mapper.Map<OrderReadDto>(order));
        }

        [HttpPost]
        public ActionResult<Order> CreateItem(OrderCreateDto dto)
        {
            Order order = mapper.Map<Order>(dto);
            repo.CreateOrder(order);
            repo.SaveChanges();

            return CreatedAtRoute(nameof(GetOrderById), new { Id = order.OrderId }, order);
        }
    }
}