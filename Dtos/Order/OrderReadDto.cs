using System;
using System.Collections.Generic;
using sales_order.Clients.Models;
using sales_order.Items.Models;

namespace sales_order.Orders.Dtos
{
    public class OrderReadDto
    {
        public int OrderId { get; set; }
        public DateTime DocDate { get; set; }
        public DateTime DocDueDate { get; set; }
        public int CardCode { get; set; }
        public string CardName { get; set; }
        public string BillingAddress { get; set; }
        public string ShippingAddress { get; set; }
        public List<OrderLineReadDto> OrderLines { get; set; }
    }
}