using System;
using System.Collections.Generic;
using System.Linq;
using sales_order.Data;
using sales_order.Orders.Models;

namespace sales_order.Orders.Data
{
    public class OrderRepo : IOrderRepo
    {
        private readonly AppDbContext db;

        public OrderRepo(AppDbContext db)
        {
            this.db = db;
        }

        public void CreateOrder(Order order)
        {
            db.Orders.Add(order);
        }

        public IEnumerable<Order> GetAllOrders()
        {
            return db.Orders;
        }

        public Order GetOrderById(int orderId)
        {
            var order = db.Orders.Where(o => o.OrderId == orderId).FirstOrDefault();
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order));

            }
            IEnumerable<OrderLine> orderLines = db.OrderLines.Where(l => l.OrderId == orderId);
            order.OrderLines = orderLines.ToList();
            return order;
        }

        public bool SaveChanges()
        {
            return (db.SaveChanges() >= 0);
        }
    }
}