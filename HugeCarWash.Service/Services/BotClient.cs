using HugeCarWash.Service.Interfaces;

namespace HugeCarWash.Service.Services
{
    public class BotClient : IBotClient
    {
        protected HttpClient HttpClient { get; set; }

        public BotClient()
        {
            HttpClient = new HttpClient();
            AddRequestHeaders();
        }

        public async Task<bool> SendMessageAsync(string userId, string message)
        {
            if (string.IsNullOrWhiteSpace(message))
                throw new ArgumentException();

            return await Task.Run(async () =>
            {
                var requestMessage = CreateRequest(userId, message);
                var success = false;
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
            });
        }

        public void AddRequestHeaders()
        {
            //httpClient.DefaultRequestHeaders
        }

        public HttpRequestMessage CreateRequest(string userId, object body)
        {
            var message = new HttpRequestMessage(HttpMethod.Post, $"https://e39e-84-54-66-53.eu.ngrok.io/api/message/{userId}?message={body}");
            //message.Content = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(body));

            return message;
        }
    }
}
