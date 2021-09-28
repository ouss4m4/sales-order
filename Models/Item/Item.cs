using System.ComponentModel.DataAnnotations;

namespace sales_order.Items.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ItemName { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        public int StockQty { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }
    }
}