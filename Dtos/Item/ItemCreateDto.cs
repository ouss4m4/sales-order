namespace sales_order.Items.Dtos
{
    public class ItemCreateDto
    {
        public string ItemName { get; set; }
        public string Description { get; set; }
        public int StockQty { get; set; }
        public decimal UnitPrice { get; set; }

    }
}