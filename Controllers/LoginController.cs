using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sales_order.Users.Models;
using sales_order.Users.Services;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly IApplicationUser _authService;
    public LoginController(IApplicationUser authService)
    {
        _authService = authService;
    }

    //POST: /Login/Authenticate
    [AllowAnonymous]
    [HttpPost]
    public IActionResult Authenticate([FromBody] User model)
    {
        string token = _authService.Authenticate(model.username, model.password);

        if (string.IsNullOrEmpty(token))
        {
            return BadRequest(new { message = "Username or password is incorrect" });
        }

        return Ok(new { token });
    }
}