using NewsWebsiteBackEnd.Models;
using SolrNet;
using SolrNet.Commands.Parameters;

namespace NewsWebsiteBackEnd.SOLR
{
    public class SolrService
    {
        private readonly ISolrOperations<Article> _solr;

        public SolrService(ISolrOperations<Article> solr)
        {
            _solr = solr;
        }

        public async Task IndexArticle(Article article)
        {
            await _solr.AddAsync(article);
            await _solr.CommitAsync();
        }

        public async Task<IEnumerable<Article>> SearchArticles(string query, int start, int rows)
        {
            var options = new QueryOptions
            {
                StartOrCursor = new StartOrCursor.Start(start),
                Rows = rows
            };

            var results = await _solr.QueryAsync(new SolrQuery(query), options);

            return results;
        }
    }
}
