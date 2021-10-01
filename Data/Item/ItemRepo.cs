
using System;
using System.Collections.Generic;
using System.Linq;
using sales_order.Data;
using sales_order.Items.Models;

namespace sales_order.Items.Data
{
    public class ItemRepo : IItemRepo
    {
        private readonly AppDbContext db;

        public ItemRepo(AppDbContext db)
        {
            this.db = db;
        }
        public void CreateItem(Item item)
        {
            db.Add(item);
        }

        public IEnumerable<Item> GetAllItems()
        {
            return db.Items;
        }

        public Item GetItemById(int ItemCode)
        {
            var item = db.Items.Where(i => i.ItemCode == ItemCode).FirstOrDefault();
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item));

            }
            return item;
        }

        public bool SaveChanges()
        {
            return (db.SaveChanges() >= 0);
        }
    }
}