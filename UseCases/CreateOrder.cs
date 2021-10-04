using sales_order.Items.Data;
using sales_order.Orders.Data;
using sales_order.Orders.Models;

namespace sales_order.Orders.UseCases
{
    public class CreateOrder
    {
        private readonly IOrderRepo orderRepo;
        private readonly IItemRepo itemRepo;

        public CreateOrder(IOrderRepo orderRepo, IItemRepo itemRepo)
        {
            this.orderRepo = orderRepo;
            this.itemRepo = itemRepo;
        }

        public Order execute(Order model)
        {
            orderRepo.CreateOrder(model);
            orderRepo.SaveChanges();
            return model;
        }
    }
}
