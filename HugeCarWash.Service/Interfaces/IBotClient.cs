namespace HugeCarWash.Service.Interfaces
{
    public interface IBotClient
    {
        Task<bool> SendMessageAsync(string userId, string message);

        void AddRequestHeaders();

        HttpRequestMessage CreateRequest(string userId, string text);
    }
}
