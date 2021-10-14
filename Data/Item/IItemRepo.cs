using System.Collections.Generic;
using System.Threading.Tasks;
using sales_order.Items.Models;

namespace sales_order.Items.Data
{
    public interface IItemRepo
    {
        Task<bool> CreateItem(Item item);
        Task<IEnumerable<Item>> GetAllItems();
        Task<Item> GetItemById(int id);
        Task<Item> UpdateItem(Item item);
        void DeleteItem(Item item);
        Task<bool> SaveChanges();
    }
}