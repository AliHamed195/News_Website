import 'package:flutter/material.dart';
import '../widgets/article_list_with_categories.dart';
import '../widgets/sidebar_menu.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('News App'),
      ),
      drawer: SidebarMenu(),
      body: const ArticleListWithCategories(),
    );
  }
}
