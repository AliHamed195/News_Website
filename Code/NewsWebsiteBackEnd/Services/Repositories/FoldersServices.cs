using NewsWebsiteBackEnd.Classes;
using NewsWebsiteBackEnd.Services.Interfaces;

namespace NewsWebsiteBackEnd.Services.Repositories
{
    public class FoldersServices : IFoldersServices
    {
        /// <inheritdoc />
        public FolderOperationResult CreateFolder(string folderName, string path)
        {
            try
            {
                var fullPath = Path.Combine(path, folderName);
                if (!Directory.Exists(fullPath))
                {
                    Directory.CreateDirectory(fullPath);
                    return new FolderOperationResult(true, "Folder created successfully.", fullPath);
                }
                else
                {
                    return new FolderOperationResult(false, "Folder already exists.", fullPath);
                }
            }
            catch (Exception ex)
            {
                return new FolderOperationResult(false, $"Error creating folder: {ex.Message}");
            }
        }

        /// <inheritdoc />
        public FolderOperationResult DeleteFolder(string folderName, string path)
        {
            try
            {
                var fullPath = Path.Combine(path, folderName);
                if (Directory.Exists(fullPath))
                {
                    Directory.Delete(fullPath, true);
                    return new FolderOperationResult(true, "Folder deleted successfully.", fullPath);
                }
                else
                {
                    return new FolderOperationResult(false, "Folder does not exist.", fullPath);
                }
            }
            catch (Exception ex)
            {
                return new FolderOperationResult(false, $"Error deleting folder: {ex.Message}");
            }
        }

        /// <inheritdoc />
        public FolderOperationResult IsFolderExist(string folderName, string path)
        {
            var fullPath = Path.Combine(path, folderName);
            bool exists = Directory.Exists(fullPath);
            return new FolderOperationResult(exists, exists ? "Folder exists." : "Folder does not exist.", fullPath);
        }

        /// <inheritdoc />
        public FolderOperationResult RenameFolder(string oldFolderName, string newFolderName, string path)
        {
            try
            {
                var oldPath = Path.Combine(path, oldFolderName);
                var newPath = Path.Combine(path, newFolderName);

                if (!Directory.Exists(oldPath))
                {
                    return new FolderOperationResult(false, "Original folder does not exist.");
                }

                if (Directory.Exists(newPath))
                {
                    return new FolderOperationResult(false, "Target folder name already exists.");
                }

                Directory.Move(oldPath, newPath);
                return new FolderOperationResult(true, "Folder renamed successfully.", newPath);
            }
            catch (Exception ex)
            {
                return new FolderOperationResult(false, $"Error renaming folder: {ex.Message}");
            }
        }
    }
}
