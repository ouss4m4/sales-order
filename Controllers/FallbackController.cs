using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace sales_order.Controllers
{
    public class FallbackController : Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"),
            "text/html");
        }
    }
}