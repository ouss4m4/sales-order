namespace sales_order.Orders.Dtos
{
    public class OrderLineReadDto
    {
        public int LineId { get; set; }
        public int OrderId { get; set; }
        public int ItemCode { get; set; }
        public string ItemName { get; set; }
        public string description { get; set; }
        public int Quantity { get; set; }
    }
}