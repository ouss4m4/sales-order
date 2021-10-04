using System.Threading.Tasks;
using sales_order.Items.Data;
using sales_order.Items.Models;
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
            foreach (OrderLine line in model.OrderLines)
            {
                // substract quantity from stockQty
                var item = itemRepo.GetItemById(line.ItemCode);
                var newQty = item.StockQty - line.Quantity < 0 ? 0 : item.StockQty - line.Quantity;
                if (newQty == 0)
                {
                    line.Quantity = item.StockQty;
                }
                item.StockQty = newQty;
                itemRepo.UpdateItem(item);
                itemRepo.SaveChanges();
            }
            orderRepo.CreateOrder(model);
            orderRepo.SaveChanges();
            return model;
        }
    }
}
