using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using sales_order.Orders.Models;

namespace sales_order.Services
{
    public interface IExternalApiService
    {
        Task SendOrderToExternalApi(Order order);
    }

    public class ExternalApiService : IExternalApiService
    {
        private readonly HttpClient _httpClient;
        private const string ApiUrl = "https://api.bzouss.com/api";

        public ExternalApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task SendOrderToExternalApi(Order order)
        {
            var json = JsonSerializer.Serialize(order);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            try
            {
                var response = await _httpClient.PostAsync(ApiUrl, content);
                response.EnsureSuccessStatusCode();
            }
            catch (HttpRequestException ex)
            {
                // Log the error but don't throw to prevent disrupting the main order creation flow
                System.Diagnostics.Debug.WriteLine($"Failed to send order to external API: {ex.Message}");
            }
        }
    }
} 