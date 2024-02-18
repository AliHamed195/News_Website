namespace NewsWebsiteBackEnd.Classes
{
    public class FolderOperationResult
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public string? Path { get; set; }

        public FolderOperationResult(bool success = false, string message = null, string path = null)
        {
            Success = success;
            Message = message;
            Path = path;
        }
    }
}
