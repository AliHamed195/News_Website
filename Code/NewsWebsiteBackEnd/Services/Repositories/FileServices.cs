using NewsWebsiteBackEnd.Services.Interfaces;

namespace NewsWebsiteBackEnd.Services.Repositories
{
    public class FileServices : IFileServices
    {
        /// <inheritdoc />
        public bool IsFileExist(string filePath)
        {
            return File.Exists(filePath);
        }

        /// <inheritdoc />
        public bool DeleteFile(string filePath)
        {
            if (IsFileExist(filePath))
            {
                File.Delete(filePath);
                return true;
            }
            return false;
        }

        /// <inheritdoc />
        public string CopyFileToTargetWithNewVersion(string sourceFilePath, string targetFilePath)
        {
            throw new NotImplementedException();
        }

        /// <inheritdoc />
        public IEnumerable<string> GetAllFilesInFolderPath(string folderPath)
        {
            if (Directory.Exists(folderPath))
            {
                return Directory.GetFiles(folderPath);
            }
            return Enumerable.Empty<string>();
        }

        /// <inheritdoc />
        public async Task<Stream> GetTargetFileAsync(string filePath)
        {
            if (IsFileExist(filePath))
            {
                return new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true);
            }
            return null;
        }
    }
}
