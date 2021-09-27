using System.Collections.Generic;
using sales_order.Clients.Models;

namespace sales_order.Clients.Data
{
    public interface IClientRepo
    {
        bool SaveChanges();
        Client GetClientById(int id);
        IEnumerable<Client> GetAllClients();
        void CreateClient(Client item);

    }
}