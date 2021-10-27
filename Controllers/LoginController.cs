using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        string token = _authService.Authenticate(model.Email, model.Password);

        if (string.IsNullOrEmpty(token))
        {
            return BadRequest(new { message = "Username or password is incorrect" });
        }

        return Ok(new { token });
    }
}