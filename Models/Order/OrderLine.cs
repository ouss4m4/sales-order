using System.ComponentModel.DataAnnotations;

namespace sales_order.Orders.Models
{
    public class OrderLine
    {
        [Key]
        public int LineId { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        public int ItemCode { get; set; }

        [Required]
        public string ItemName { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        public int Quantity { get; set; }

    }
}