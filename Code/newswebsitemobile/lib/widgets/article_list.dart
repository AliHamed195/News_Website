import 'package:flutter/material.dart';
import '../models/article.dart';
import 'article_tile.dart';

class ArticleList extends StatelessWidget {
  final List<Article> articles;

  const ArticleList({Key? key, required this.articles}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: articles.length,
      itemBuilder: (context, index) {
        final article = articles[index];
        return ArticleTile(
          article: article,
          onTap: () {
            // Navigate to article details page
          },
        );
      },
    );
  }
}
