import 'package:flutter/material.dart';
import '../models/article.dart';
import 'article_tile.dart';

class ArticleList extends StatelessWidget {
  final List<Article> articles;

  const ArticleList({super.key, required this.articles});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: articles.length,
      itemBuilder: (context, index) {
        final article = articles[index];
        return ArticleTile(
          article: article,
          onTap: () {},
        );
      },
    );
  }
}
