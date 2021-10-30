using sales_order.Users.Models;

namespace sales_order.Users.dtos
{
    public class LoginSuccessDto
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public IRoles Role { get; set; }
    }
}