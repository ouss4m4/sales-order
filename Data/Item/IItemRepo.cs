using System.Collections.Generic;
using sales_order.Items.Models;

namespace sales_order.Items.Data
{
    public interface IItemRepo
    {
        IEnumerable<Item> GetAllItems();
        Item GetItemById(int id);
        Item UpdateItem(Item item);
        void CreateItem(Item item);
        bool SaveChanges();
    }
}