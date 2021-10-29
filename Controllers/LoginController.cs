using Microsoft.AspNetCore.Mvc;
using sales_order.Users.dtos;
using sales_order.Users.Models;
using sales_order.Users.Services;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly IApplicationUser _authService;
    public LoginController(IApplicationUser authService)
    {
        _authService = authService;
    }

    [HttpPost]
    public IActionResult Authenticate([FromBody] LoginModel model)
    {
        LoginSuccessDto result = _authService.Authenticate(model.Email, model.Password);

        if (result == null)
        {
            return BadRequest(new { message = "Username or password is incorrect" });
        }

        return Ok(result);
    }
}