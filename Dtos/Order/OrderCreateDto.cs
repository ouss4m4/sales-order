using System;
using System.Collections.Generic;
using sales_order.Clients.Models;
using sales_order.Items.Models;

namespace sales_order.Orders.Dtos
{
    public class OrderCreateDto
    {
        public DateTime DocDate { get; set; }
        public DateTime DocDueDate { get; set; }
        public Client Client { get; set; }
        public List<Item> Items { get; set; }
    }
}