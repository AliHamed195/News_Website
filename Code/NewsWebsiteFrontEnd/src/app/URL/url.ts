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
