using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using sales_order.Users.dtos;
using sales_order.Users.Models;

namespace sales_order.Users.Services
{


    public interface IApplicationUser
    {
        LoginSuccessDto Authenticate(string username, string password);

    }

    public class ApplicationUser : IApplicationUser
    {
        private readonly IConfiguration Configuration;
        public ApplicationUser(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private List<User> _users = new List<User>
         {
             new User { Username= "Admin", Email= "admin@me.com", Password="admin", Role= IRoles.Admin },
             new User { Username="Sales Person", Email= "sales@per.son", Password="sales", Role=IRoles.SalesPerson }
         };

        public LoginSuccessDto Authenticate(string email, string password)
        {
            var user = _users.SingleOrDefault(x => x.Email == email && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]);
            var claims = new List<Claim>
                {
                     new Claim(ClaimTypes.Email, user.Email),
                     new Claim(ClaimTypes.Role, user.Role.ToString())
                };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                IssuedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = Configuration["Jwt:Issuer"],
                Audience = Configuration["Jwt:Audience"]
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var finalToken = tokenHandler.WriteToken(token);
            return new LoginSuccessDto { token = finalToken, Email = user.Email, Role = user.Role, Username = user.Username };
        }
    }
}