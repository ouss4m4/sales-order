using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using sales_order.Orders.Data;
using sales_order.Orders.Dtos;
using sales_order.Orders.Models;

namespace sales_order.Orders.Controllers
{
    [ApiController]
    [Route("api/postback")]
    public class OrderPostbackController : ControllerBase
    {
        private readonly IOrderRepo _orderRepo;

        public OrderPostbackController(IOrderRepo orderRepo)
        {
            _orderRepo = orderRepo;
        }

        [HttpPost()]
        public async Task<IActionResult> UpdateOrderStatus([FromBody] OrderStatusUpdateDto updateDto)
        {
            var order = await _orderRepo.GetOrderById(updateDto.OrderId);
            if (order == null)
            {
                return NotFound($"Order with ID {updateDto.OrderId} not found");
            }

            order.Status = updateDto.Status;
            await _orderRepo.updateOrder(order);

            return Ok(new { message = $"Order {updateDto.OrderId} status updated to {updateDto.Status}" });
        }
    }
}