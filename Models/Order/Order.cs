using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using sales_order.Clients.Models;
using sales_order.Items.Models;

namespace sales_order.Orders.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public DateTime DocDate { get; set; } = DateTime.Now;
        public DateTime DocDueDate { get; set; } = DateTime.Today.AddDays(1);
        [Required]
        public Client Client { get; set; }
        [MinLength(1)]
        public List<Item> Items { get; set; }
    }
}