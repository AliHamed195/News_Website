using NewsWebsiteBackEnd.Classes;

namespace NewsWebsiteBackEnd.Services.Interfaces
{
    public interface IFoldersServices
    {
        /// <summary>
        /// Creates a new folder at the specified path.
        /// </summary>
        /// <param name="folderName">The name of the folder to create.</param>
        /// <param name="path">The path where the folder will be created.</param>
        /// <param name="iconPath">Optional path to an icon file.</param>
        /// <returns>A FolderOperationResult object detailing the outcome.</returns>
        FolderOperationResult CreateFolder(string folderName, string path, string iconPath = null);

        /// <summary>
        /// Deletes a folder at the specified path.
        /// </summary>
        /// <param name="folderName">The name of the folder to delete.</param>
        /// <param name="path">The path where the folder is located.</param>
        /// <returns>A FolderOperationResult object detailing the outcome.</returns>
        FolderOperationResult DeleteFolder(string folderName, string path);

        /// <summary>
        /// Checks if a folder exists at the specified path.
        /// </summary>
        /// <param name="folderName">The name of the folder to check.</param>
        /// <param name="path">The path where the folder is located.</param>
        /// <returns>A FolderOperationResult object detailing the outcome.</returns>
        FolderOperationResult IsFolderExist(string folderName, string path);

        /// <summary>
        /// Renames an existing folder.
        /// </summary>
        /// <param name="oldFolderName">The current name of the folder.</param>
        /// <param name="newFolderName">The new name for the folder.</param>
        /// <param name="path">The path where the folder is located.</param>
        /// <returns>A FolderOperationResult object detailing the outcome.</returns>
        FolderOperationResult RenameFolder(string oldFolderName, string newFolderName, string path);
    }
}
