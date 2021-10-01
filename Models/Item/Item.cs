using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace sales_order.Items.Models
{
    public class Item
    {
        [Key]
        public int ItemCode { get; set; }

        [Required]
        public string ItemName { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        public int StockQty { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal UnitPrice { get; set; }
    }
}