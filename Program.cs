using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using sales_order.Data;
using sales_order.Extensions;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
var services = builder.Services;
services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
services.AddControllers();

services.AddDbContext<AppDbContext>(opt =>
                    opt.UseSqlServer(builder.Configuration.GetConnectionString("mySqlDb")));

services.AddApplicationServices();
services.AddAuthorization();
services.AddSwaggerDocumentation();
services.AddCors(opts =>
{
    opts.AddPolicy("CorsPolicy", policy =>
     policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("*"));
});

var app = builder.Build();

app.UseSwaggerDocumentation();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.MapFallbackToController("Index", "Fallback");



app.Run();
