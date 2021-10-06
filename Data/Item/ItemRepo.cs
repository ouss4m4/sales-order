
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
        public async Task<bool> CreateItem(Item item)
        {
            await db.AddAsync(item);
            return true;
        }

        public async Task<IEnumerable<Item>> GetAllItems()
        {
            return await db.Items.ToListAsync();
        }

        public async Task<Item> GetItemById(int ItemCode)
        {
            var item = await db.Items.FindAsync(ItemCode);
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item));

            }
            return item;
        }

        public async Task<bool> SaveChanges()
        {
            return await db.SaveChangesAsync() >= 0;
        }

        public async Task<Item> UpdateItem(Item model)
        {
            // look for the item, and update it (order repo can call this for sure)
            Item origItem = await GetItemById(model.ItemCode);
            origItem.ItemName = model.ItemName;
            origItem.description = model.description;
            origItem.StockQty = model.StockQty;
            origItem.UnitPrice = model.UnitPrice;
            await SaveChanges();
            return origItem;
        }
    }
}