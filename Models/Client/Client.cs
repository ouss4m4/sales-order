using System.ComponentModel.DataAnnotations;

namespace sales_order.Clients.Models
{
    public class Client
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CardName { get; set; }

        [Required]
        public string BillingAddress { get; set; }

        [Required]
        public string ShippingAddress { get; set; }
    }
}