using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using sales_order.Clients.Data;
using sales_order.Items.Data;
using sales_order.Orders.Data;
using sales_order.Orders.UseCases;
using sales_order.Services;
using sales_order.Users.Services;

namespace sales_order.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IItemRepo, ItemRepo>();
            services.AddScoped<IClientRepo, ClientRepo>();
            services.AddScoped<IOrderRepo, OrderRepo>();
            services.AddScoped<IApplicationUser, ApplicationUser>();
            services.AddScoped<CreateOrder>();
            services.AddScoped<IExternalApiService, ExternalApiService>();
            services.AddHttpClient();

            services.AddAuthentication(x =>
                            {
                                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                            })
                            .AddJwtBearer(options =>
                            {
                                options.TokenValidationParameters = new TokenValidationParameters
                                {
                                    ValidateIssuer = true,
                                    ValidateLifetime = true,
                                    ValidateIssuerSigningKey = true,
                                    ValidateAudience = true,
                                    ValidIssuer = "bzouss.com",
                                    ValidAudience = "general",
                                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("733th4x0r.s733th4x0r.s733th4x0r.s733th4x0r.s"))
                                };
                            });
            return services;
        }
    }
}