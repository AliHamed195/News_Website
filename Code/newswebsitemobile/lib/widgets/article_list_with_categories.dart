import 'package:flutter/material.dart';
import '../models/article.dart';
import '../models/category.dart';
import '../api/api_service.dart';
import 'article_tile.dart';

class ArticleListWithCategories extends StatefulWidget {
  const ArticleListWithCategories({Key? key}) : super(key: key);

  @override
  _ArticleListWithCategoriesState createState() =>
      _ArticleListWithCategoriesState();
}

class _ArticleListWithCategoriesState extends State<ArticleListWithCategories> {
  List<Category> _categories = [];
  List<Article> _articles = [];
  int _selectedCategoryId = -1;

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
        });
        _loadArticlesByCategory(_selectedCategoryId);
      }
    } catch (e) {
      print('Error loading categories: $e');
    }
  }

  Future<void> _loadArticlesByCategory(int categoryId) async {
    try {
      final articles =
          await ApiService.fetchArticlesByCategory(categoryId: categoryId);
      setState(() {
        _articles = articles;
      });
    } catch (e) {
      print('Error loading articles by category: $e');
    }
  }

  void _onCategoryTap(int categoryId) {
    setState(() {
      _selectedCategoryId = categoryId;
    });
    _loadArticlesByCategory(categoryId);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Category Tabs
        Container(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
          height: 60,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: _categories.length,
            separatorBuilder: (context, index) => const SizedBox(width: 8),
            itemBuilder: (context, index) {
              final category = _categories[index];
              final isSelected = category.id == _selectedCategoryId;
              return GestureDetector(
                onTap: () => _onCategoryTap(category.id),
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
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
          child: ListView.builder(
            itemCount: _articles.length,
            itemBuilder: (context, index) {
              final article = _articles[index];
              return ArticleTile(
                article: article,
                onTap: () {
                  // Navigate to article details page
                },
              );
            },
          ),
        ),
      ],
    );
  }
}
