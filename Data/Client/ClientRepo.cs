using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using sales_order.Clients.Models;
using sales_order.Data;

namespace sales_order.Clients.Data
{
    public class ClientRepo : IClientRepo
    {
        private readonly AppDbContext db;

        public ClientRepo(AppDbContext db)
        {
            this.db = db;
        }

        public async Task<bool> CreateClient(Client item)
        {
            await db.AddAsync(item);
            return true;
        }

        public async Task<Client> EditClient(Client model)
        {
            Client origClient = await GetClientById(model.CardCode);
            origClient.CardCode = model.CardCode;
            origClient.CardName = model.CardName;
            origClient.BillingAddress = model.BillingAddress;
            origClient.ShippingAddress = model.ShippingAddress;
            await SaveChanges();
            return origClient;
        }

        public async Task<IEnumerable<Client>> GetAllClients()
        {
            return await db.Clients.ToListAsync();
        }

        public async Task<Client> GetClientById(int cardCode)
        {
            var client = await db.Clients.FindAsync(cardCode);
            if (client == null)
            {
                throw new ArgumentNullException(nameof(client));

            }
            return client;
        }

        public async Task<bool> SaveChanges()
        {
            return await db.SaveChangesAsync() >= 0;
        }
    }
}