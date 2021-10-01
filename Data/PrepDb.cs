using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using sales_order.Clients.Data;
using sales_order.Clients.Models;
using sales_order.Items.Data;
using sales_order.Items.Models;

namespace sales_order.Data
{
    public static class PrepDb
    {
        public static void PrepPopulation(IApplicationBuilder appBuilder)
        {
            using (var serviceScope = appBuilder.ApplicationServices.CreateScope())
            {
                var clientRepo = serviceScope.ServiceProvider.GetService<IClientRepo>();
                var itemRepo = serviceScope.ServiceProvider.GetService<IItemRepo>();

                SeedData(clientRepo, itemRepo);
            }
        }
        private static void SeedData(IClientRepo clientRepo, IItemRepo itemRepo)
        {
            List<Item> mockItems = new();
            Item mockChair = new() { ItemName = "Long Chair", description = "Brown wooden long chair", StockQty = 200, UnitPrice = 12 };
            Item mockTable = new() { ItemName = "Round Table", description = "four by four height table", StockQty = 50, UnitPrice = 25 };
            mockItems.Add(mockChair);
            mockItems.Add(mockTable);

            foreach (Item item in mockItems)
            {
                itemRepo.CreateItem(item);
                itemRepo.SaveChanges();

            }

            Client fakeClient = new() { CardName = "John Doe", BillingAddress = "10 main street, 4", ShippingAddress = "10 main street, 4" };
            clientRepo.CreateClient(fakeClient);
            clientRepo.SaveChanges();
        }
    }
}