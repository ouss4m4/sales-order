namespace sales_order.Clients.Dtos
{
    public class ClientCreateDto
    {
        public string CardName { get; set; }
        public string BillingAddress { get; set; }
        public string ShippingAddress { get; set; }
    }
}