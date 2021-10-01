using System;
using System.Collections.Generic;
using System.Linq;
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
        public void CreateClient(Client item)
        {
            db.Add(item);
        }

        public IEnumerable<Client> GetAllClients()
        {
            return db.Clients;
        }

        public Client GetClientById(int cardCode)
        {
            var client = db.Clients.Where(c => c.CardCode == cardCode).FirstOrDefault();
            if (client == null)
            {
                throw new ArgumentNullException(nameof(client));

            }
            return client;
        }

        public bool SaveChanges()
        {
            return (db.SaveChanges() >= 0);
        }
    }
}