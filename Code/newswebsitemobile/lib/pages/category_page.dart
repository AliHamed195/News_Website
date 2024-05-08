import 'package:flutter/material.dart';
import '../api/api_service.dart';
import '../models/category.dart';
import '../widgets/category_list.dart';
import '../widgets/sidebar_menu.dart';

class CategoryPage extends StatefulWidget {
  @override
  _CategoryPageState createState() => _CategoryPageState();
}

class _CategoryPageState extends State<CategoryPage> {
  late Future<List<Category>> _categories;

  @override
  void initState() {
    super.initState();
    _categories = ApiService.fetchCategories();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Categories'),
      ),
      drawer: SidebarMenu(),
      body: FutureBuilder<List<Category>>(
        future: _categories,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Failed to load categories'));
          } else {
            return CategoryList(categories: snapshot.data!);
          }
        },
      ),
    );
  }
}
