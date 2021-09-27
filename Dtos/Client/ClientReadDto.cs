namespace sales_order.Clients.Dtos
{
    public class ClientReadDto
    {
        public int Id { get; set; }
        public string CardName { get; set; }
        public string BillingAddress { get; set; }
        public string ShippingAddress { get; set; }
    }
}