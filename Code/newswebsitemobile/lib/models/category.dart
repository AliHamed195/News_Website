class Category {
  final int id;
  final String name;
  final int articlesCount;

  Category({
    required this.id,
    required this.name,
    required this.articlesCount,
  });

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['id'],
      name: json['name'],
      articlesCount: json['articlesCount'],
    );
  }
}
