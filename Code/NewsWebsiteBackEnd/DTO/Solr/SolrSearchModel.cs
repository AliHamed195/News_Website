using Microsoft.AspNetCore.Mvc;
using NewsWebsiteBackEnd.DTO.Pagination;

namespace NewsWebsiteBackEnd.DTO.Solr
{
    public class SolrSearchModel
    {
        public string SearchText { get; set; }
        public PaginationModel Pagination { get; set; }
    }
}
