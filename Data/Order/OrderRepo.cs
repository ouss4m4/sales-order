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

        public async Task<Order> updateOrder(Order order)
        {

            // order {cardcode: '01',OrderLines: []}
            Order origOrder = await db.Orders.FindAsync(order.OrderId);
            if (origOrder == null)
            {
                throw new ArgumentNullException(nameof(order));
            }
            origOrder.DocDate = order.DocDate;
            origOrder.DocDueDate = order.DocDueDate;
            origOrder.CardName = order.CardName;
            origOrder.CardCode = order.CardCode;
            origOrder.BillingAddress = order.BillingAddress;
            origOrder.ShippingAddress = order.ShippingAddress;
            origOrder.OrderLines = order.OrderLines;

            await db.SaveChangesAsync();
            return order;
        }
    }
}