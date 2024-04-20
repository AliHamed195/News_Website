export const baseUrl = 'https://localhost:44332/api';

export const authEndpoints = {
  login: `${baseUrl}/Account/login`,
  register: `${baseUrl}/Account/register`,
};

export const hashTagsEndpoints = {
  getAllHashTags: `${baseUrl}/HashTag/all`,
  createHashTag: `${baseUrl}/HashTag/create`,
  getHashTagById: `${baseUrl}/HashTag/`,
  updateHashTagById: `${baseUrl}/HashTag/update/`,
  deleteHashTagById: `${baseUrl}/HashTag/delete/`,
  hashTagCountAll: `${baseUrl}/HashTag/count/all`,
  hashTagCountIsUsed: `${baseUrl}/HashTag/count/isUsed`,
};

export const categoryEndpoints = {
  getAllCategorys: `${baseUrl}/Category/all`,
  getCategoryById: `${baseUrl}/Category/`,
  createCategory: `${baseUrl}/Category/create`,
  updateCategoryById: `${baseUrl}/Category/update/`,
  deleteCategoryById: `${baseUrl}/Category/delete/`,
  categoryCountAll: `${baseUrl}/Category/all/count`,
  categoryCountWithArticles: `${baseUrl}/Category/all/articles/count`,
};

export const questionsAnswersEndpoints = {
  getAllQuestionsAndAnswers: `${baseUrl}/QuestionAnswer/all`,
  getAllQuestions: `${baseUrl}/QuestionAnswer/all-questions`,
  getAllQuestionAndAnswerById: `${baseUrl}/QuestionAnswer/`,
  createQuestionAndAnswer: `${baseUrl}/QuestionAnswer/create`,
  updateQuestionAndAnswerById: `${baseUrl}/QuestionAnswer/update/`,
  deleteQuestionAndAnswerById: `${baseUrl}/QuestionAnswer/delete/`,
};

export const articleEndpoints = {
  getAllArticles: `${baseUrl}/Article/all`,
  getAllPublishedArticles: `${baseUrl}/Article/published`,
  getAllUnpublishedArticles: `${baseUrl}/Article/unpublished`,
  getAllArchivedArticles: `${baseUrl}/Article/archived`,
  getArticleById: `${baseUrl}/Article/`,
  createArticle: `${baseUrl}/Article/create`,
  updateArticleById: `${baseUrl}/Article/update/`,
  deleteArticleById: `${baseUrl}/Article/delete/`,
  archiveArticleById: `${baseUrl}/Article/archive/`,
  unarchiveArticleById: `${baseUrl}/Article/unarchive/`,
  rateArticleById: `${baseUrl}/Article/rate/`,
  commentArticleById: `${baseUrl}/Article/comment/`,
  deleteCommentById: `${baseUrl}/Article/delete-comment/`,
  getCommentsByArticleId: `${baseUrl}/Article/comments/`,
  publishArticleById: `${baseUrl}/Article/publish/`,
  unpublishArticleById: `${baseUrl}/Article/unpublish/`,
  getAllArticlesCount: `${baseUrl}/Article/all-count`,
  getPublishedArticlesCount: `${baseUrl}/Article/published-count`,
  getUnpublishedArticlesCount: `${baseUrl}/Article/unpublished-count`,
  getTopRated: `${baseUrl}/Article/top-rated`,
  getPublishedByCategoryId: `${baseUrl}/Article/published-by-category/`,
};

export const userEndpoints = {
  getAllUsers: `${baseUrl}/User/all`,
  getAllDeletedUsers: `${baseUrl}/User/all-deleted`,
  getUserById: `${baseUrl}/User/get/`,
  createNewUser: `${baseUrl}/User/create-new`,
  updateUserById: `${baseUrl}/User/update/`,
  blockUserById: `${baseUrl}/User/block/`,
  unblockUserById: `${baseUrl}/User/unblock/`,
  deleteUserById: `${baseUrl}/User/delete/`,
  undeleteUserById: `${baseUrl}/User/undelete/`,
  updateUserPassword: `${baseUrl}/User/update-password/`,
  getUsersCount: `${baseUrl}/User/count`,
  getBlockedUsersCount: `${baseUrl}/User/count-blocked`,
  getDeletedUsersCount: `${baseUrl}/User/count-deleted`,
  getUserTypes: `${baseUrl}/User/types`,
  getUserTypesCount: `${baseUrl}/User/types/count`,
  getUsersByType: `${baseUrl}/User/by-type/`,
};
