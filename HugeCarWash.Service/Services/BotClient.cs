using HugeCarWash.Service.Interfaces;
using Microsoft.Extensions.Configuration;
using static System.Net.WebRequestMethods;

namespace HugeCarWash.Service.Services
{
    public class BotClient : IBotClient
    {
        protected HttpClient HttpClient { get; set; }
        private IConfiguration config;

        public BotClient(IConfiguration config)
        {
            HttpClient = new HttpClient();
            this.config = config;
            AddRequestHeaders();
        }

        public async Task<bool> SendMessageAsync(string userId, string message)
        {
            var requestMessage = CreateRequest(userId, message);

            bool success = false;
            try
            {
                var response = await HttpClient.SendAsync(requestMessage);
                success = response.StatusCode == System.Net.HttpStatusCode.OK;
            }
            catch
            {
                success = false;
            }

            return success;
        }

        public void AddRequestHeaders()
        {
            //httpClient.DefaultRequestHeaders
        }

        public HttpRequestMessage CreateRequest(string userId, string text)
        {
            var token = config.GetSection("BotConfigurations:AuthToken").Value;

            var message = new HttpRequestMessage(HttpMethod.Post, $"https://api.telegram.org/bot{token}/sendMessage?chat_id={userId}&text={text}");
            //message.Content = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(body));

            return message;
        }
    }
}
