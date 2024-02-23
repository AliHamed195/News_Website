namespace NewsWebsiteBackEnd.Services.Interfaces
{
    /// <summary>
    /// Provides a contract for file management operations including checks for existence,
    /// deletion, versioned copying, listing within a directory, and content retrieval.
    /// </summary>
    public interface IFileServices
    {
        /// <summary>
        /// Determines whether a file exists at the specified path.
        /// </summary>
        /// <param name="filePath">The full path of the file to check.</param>
        /// <returns><c>true</c> if the file exists; otherwise, <c>false</c>.</returns>
        bool IsFileExist(string filePath);

        /// <summary>
        /// Deletes a file located at the specified path if it exists.
        /// </summary>
        /// <param name="filePath">The full path of the file to delete.</param>
        /// <returns><c>true</c> if the file was successfully deleted; otherwise, <c>false</c>.</returns>
        bool DeleteFile(string filePath);

        /// <summary>
        /// Copies a file to a target location, appending a version counter to the filename if a file with the same name already exists.
        /// </summary>
        /// <param name="sourceFilePath">The full path of the source file to copy.</param>
        /// <param name="targetFilePath">The target file path including the desired filename.</param>
        /// <returns>The full path of the copied file, including the version counter if applicable.</returns>
        string CopyFileToTargetWithNewVersion(string sourceFilePath, string targetFilePath);

        /// <summary>
        /// Lists all files within a specified folder path.
        /// </summary>
        /// <param name="folderPath">The path of the folder to list files from.</param>
        /// <returns>An enumerable collection of file paths within the specified folder.</returns>
        IEnumerable<string> GetAllFilesInFolderPath(string folderPath);

        /// <summary>
        /// Asynchronously retrieves the content of a specified file, suitable for direct streaming to clients.
        /// This method is especially useful for serving media files, such as images or PDFs, to a web client.
        /// </summary>
        /// <param name="filePath">The full path of the file to retrieve.</param>
        /// <returns>A task representing the asynchronous operation, which upon completion, yields a stream containing the file's content, or <c>null</c> if the file does not exist.</returns>
        Task<Stream> GetTargetFileAsync(string filePath);
    }
}
