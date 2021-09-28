using System.Collections.Generic;
using sales_order.Orders.Models;

namespace sales_order.Orders.Data
{
    public interface IOrderRepo
    {
        bool SaveChanges();
        Order GetOrderById(int id);
        IEnumerable<Order> GetAllOrders();
        void CreateOrder(Order order);
    }
}