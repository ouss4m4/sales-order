using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace sales_order.Orders.Models
{
    public enum OrderStatus
    {
        Created,
        Delivered,
        Cancelled
    }

    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public DateTime DocDate { get; set; } = DateTime.Now;
        public DateTime DocDueDate { get; set; } = DateTime.Today.AddDays(1);
        [Required]
        public int CardCode { get; set; }
        [Required]
        public string CardName { get; set; }
        [Required]
        public string BillingAddress { get; set; }
        [Required]
        public string ShippingAddress { get; set; }
        [MinLength(1)]
        public ICollection<OrderLine> OrderLines { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Created;
    }
}