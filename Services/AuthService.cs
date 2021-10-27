using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using sales_order.Users.Models;

namespace sales_order.Users.Services
{


    public interface IApplicationUser
    {
        string Authenticate(string username, string password);

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
             new User {Email= "admin@me.com",Password= "admin",Roles= new List<IRoles>{IRoles.Admin,IRoles.SalesPerson} },
             new User {Email= "sales@per.son",Password= "sales",Roles= new List<IRoles>{IRoles.SalesPerson} }
         };

        public string Authenticate(string email, string password)
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
                };
            claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role.ToString())));
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
            return tokenHandler.WriteToken(token);
        }


    }
}