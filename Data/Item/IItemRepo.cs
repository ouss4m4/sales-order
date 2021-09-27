using System.Collections.Generic;
using sales_order.Items.Models;

namespace sales_order.Items.Data
{
    public interface IItemRepo
    {
        bool SaveChanges();
        Item GetItemById(int id);
        IEnumerable<Item> GetAllItems();
        void CreateItem(Item item);
    }
}