namespace sales_order.Orders.Dtos
{
    public class OrderLineCreateDto
    {
        public int ItemCode { get; set; }
        public string ItemName { get; set; }
        public string description { get; set; }
        public int Quantity { get; set; }
    }
}