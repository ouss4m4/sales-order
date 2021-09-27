namespace sales_order.Items.Dtos
{
    public class ItemReadDto
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public int StockQty { get; set; }

    }
}