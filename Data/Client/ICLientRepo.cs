using System.Collections.Generic;
using System.Threading.Tasks;
using sales_order.Clients.Models;

namespace sales_order.Clients.Data
{
    public interface IClientRepo
    {
        Task<bool> SaveChanges();
        Task<Client> GetClientById(int id);
        Task<IEnumerable<Client>> GetAllClients();
        Task<bool> CreateClient(Client item);

    }
}