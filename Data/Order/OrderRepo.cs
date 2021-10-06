using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public async Task<bool> CreateOrder(Order order)
        {
            await db.Orders.AddAsync(order);
            return true;
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            return await db.Orders.ToListAsync();
        }

        public async Task<Order> GetOrderById(int orderId)
        {
            var order = await db.Orders.FindAsync(orderId);
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order));

            }
            IEnumerable<OrderLine> orderLines = await db.OrderLines.Where(l => l.OrderId == orderId).ToListAsync();
            order.OrderLines = orderLines.ToList();
            return order;
        }

        public async Task<bool> SaveChanges()
        {
            return await db.SaveChangesAsync() >= 0;
        }
    }
}