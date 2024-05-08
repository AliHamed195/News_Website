import 'package:flutter/material.dart';
import '../models/category.dart';

class CategoryList extends StatelessWidget {
  final List<Category> categories;

  const CategoryList({super.key, required this.categories});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: categories.length,
      itemBuilder: (context, index) {
        final category = categories[index];
        return ListTile(
          title: Text('${category.name} (${category.articlesCount})'),
          onTap: () {
            // Navigate to articles under selected category
          },
        );
      },
    );
  }
}
