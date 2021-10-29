using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace sales_order.Users.Models
{
    public enum IRoles
    {
        Admin,
        SalesPerson
    }
    public class User
    {
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public IRoles Role { get; set; } = IRoles.SalesPerson;
    }
}