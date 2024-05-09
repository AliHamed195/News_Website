import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:newswebsitemobile/models/article_details.dart';
import '../models/article.dart';
import '../models/category.dart';
import '../utils/constants.dart';

class ApiService {
  static const String _baseUrl = Constants.apiBaseUrl;

  static Future<List<Article>> fetchPublishedArticles(
      {int startRow = 0, int endRow = 10}) async {
    final response = await http.get(
      Uri.parse(
          '$_baseUrl/api/article/published?StartRow=$startRow&EndRow=$endRow'),
    );
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return List<Article>.from(data['data'].map((x) => Article.fromJson(x)));
    } else {
      throw Exception('Failed to load articles');
    }
  }

  static Future<List<Category>> fetchCategories(
      {int startRow = 0, int endRow = 10}) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/api/category/all?StartRow=$startRow&EndRow=$endRow'),
    );
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return List<Category>.from(data['data'].map((x) => Category.fromJson(x)));
    } else {
      throw Exception('Failed to load categories');
    }
  }

  static Future<List<Article>> fetchArticlesByCategory({
    required int categoryId,
    int startRow = 0,
    int endRow = 10,
  }) async {
    final response = await http.get(
      Uri.parse(
          '$_baseUrl/api/article/published-by-category/$categoryId?StartRow=$startRow&EndRow=$endRow'),
    );
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return List<Article>.from(data['data'].map((x) => Article.fromJson(x)));
    } else {
      throw Exception('Failed to load articles by category');
    }
  }

  static Future<ArticleDetails> fetchArticleByUrl(String url) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/api/article/from-url?url=$url'),
    );
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      if (data['success'] == true && data['data'] != null) {
        return ArticleDetails.fromJson(data['data']);
      } else {
        throw Exception('No article found');
      }
    } else {
      throw Exception('Failed to load article details');
    }
  }
}
