using System.Collections.Generic;
using System.Threading.Tasks;
using sales_order.Orders.Models;

namespace sales_order.Orders.Data
{
    public interface IOrderRepo
    {
        Task<bool> SaveChanges();
        Task<Order> GetOrderById(int id);
        Task<IEnumerable<Order>> GetAllOrders();
        Task<bool> CreateOrder(Order order);
    }
}