using System.ComponentModel.DataAnnotations;

namespace sales_order.Users.Models
{
    public class User
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
    }
}
