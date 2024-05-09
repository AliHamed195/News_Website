// pages/article_list_with_categories.dart
import 'package:flutter/material.dart';
import 'package:newswebsitemobile/pages/article_details_page.dart';
import '../models/article.dart';
import '../models/category.dart';
import '../api/api_service.dart';
import 'article_tile.dart';

class ArticleListWithCategories extends StatefulWidget {
  const ArticleListWithCategories({super.key});

  @override
  _ArticleListWithCategoriesState createState() =>
      _ArticleListWithCategoriesState();
}

class _ArticleListWithCategoriesState extends State<ArticleListWithCategories> {
  List<Category> _categories = [];
  List<Article> _articles = [];
  int _selectedCategoryId = -1;
  bool _isLoadingCategories = true;
  bool _isLoadingArticles = false;

  @override
  void initState() {
    super.initState();
    _loadCategoriesAndArticles();
  }

  Future<void> _loadCategoriesAndArticles() async {
    try {
      final categories = await ApiService.fetchCategories();
      if (categories.isNotEmpty) {
        setState(() {
          _categories = categories.where((c) => c.articlesCount > 0).toList();
          _selectedCategoryId = _categories.first.id;
          _isLoadingCategories = false;
        });
        await _loadArticlesByCategory(_selectedCategoryId);
      } else {
        setState(() {
          _isLoadingCategories = false;
        });
      }
    } catch (e) {
      print('Error loading categories: $e');
      setState(() {
        _isLoadingCategories = false;
      });
    }
  }

  Future<void> _loadArticlesByCategory(int categoryId) async {
    setState(() {
      _isLoadingArticles = true;
    });
    try {
      final articles =
          await ApiService.fetchArticlesByCategory(categoryId: categoryId);
      setState(() {
        _articles = articles;
        _isLoadingArticles = false;
      });
    } catch (e) {
      print('Error loading articles by category: $e');
      setState(() {
        _isLoadingArticles = false;
      });
    }
  }

  void _onCategoryTap(int categoryId) {
    setState(() {
      _selectedCategoryId = categoryId;
    });
    _loadArticlesByCategory(categoryId);
  }

  void _navigateToDetails(BuildContext context, String articleUrl) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ArticleDetailsPage(articleUrl: articleUrl),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Category Tabs
        Container(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
          height: 60,
          child: _isLoadingCategories
              ? const Center(child: CircularProgressIndicator())
              : ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: _categories.length,
                  separatorBuilder: (context, index) =>
                      const SizedBox(width: 8),
                  itemBuilder: (context, index) {
                    final category = _categories[index];
                    final isSelected = category.id == _selectedCategoryId;
                    return GestureDetector(
                      onTap: () => _onCategoryTap(category.id),
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: isSelected ? Colors.blue : Colors.grey[200],
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Center(
                          child: Text(
                            '${category.name} (${category.articlesCount})',
                            style: TextStyle(
                              color: isSelected ? Colors.white : Colors.black,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                ),
        ),

        // Article List
        Expanded(
          child: _isLoadingArticles
              ? const Center(child: CircularProgressIndicator())
              : ListView.builder(
                  itemCount: _articles.length,
                  itemBuilder: (context, index) {
                    final article = _articles[index];
                    return ArticleTile(
                      article: article,
                      onTap: () {
                        _navigateToDetails(context, article.urlAsText);
                      },
                    );
                  },
                ),
        ),
      ],
    );
  }
}
