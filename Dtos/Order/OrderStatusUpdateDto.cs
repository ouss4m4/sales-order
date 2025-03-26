using System.ComponentModel.DataAnnotations;
using sales_order.Orders.Models;

namespace sales_order.Orders.Dtos
{
    public class OrderStatusUpdateDto
    {
        [Required]
        public int OrderId { get; set; }
        
        [Required]
        public OrderStatus Status { get; set; }
    }
} 