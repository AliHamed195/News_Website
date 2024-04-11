using Microsoft.AspNetCore.SignalR;

namespace NewsWebsiteBackEnd.Hubs
{
    public class ArticleHub : Hub
    {
        public async Task NotifyArticlePublished(string articleTitle, string articleUrl)
        {
            await Clients.All.SendAsync("ArticlePublished", articleTitle, articleUrl);
        }
    }
}
