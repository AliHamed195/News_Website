using SolrNet.Attributes;

namespace NewsWebsiteBackEnd.DTO.Solr
{
    public class SolrArticle
    {
        [SolrUniqueKey("id")]
        public int Id { get; set; }
        [SolrField("BodyStructureAsText")]
        public List<string> BodyStructureAsText { get; set; }
    }
}
