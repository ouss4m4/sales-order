using System;
using System.Collections.Generic;
using sales_order.Clients.Models;
using sales_order.Orders.Models;

namespace sales_order.Orders.Dtos
{
    public class OrderCreateDto
    {
        public DateTime DocDate { get; set; }
        public DateTime DocDueDate { get; set; }
        public int CardCode { get; set; }
        public string CardName { get; set; }
        public string BillingAddress { get; set; }
        public string ShippingAddress { get; set; }
        public List<OrderLineCreateDto> OrderLines { get; set; }
    }
}