class Article {
  final int id;
  final String title;
  final String coverImagePath;
  final double ratingAvg;
  final int totalNumberOfViews;
  final String urlAsText;
  final String createdByFullName;
  final String location;

  Article({
    required this.id,
    required this.title,
    required this.coverImagePath,
    required this.ratingAvg,
    required this.totalNumberOfViews,
    required this.urlAsText,
    required this.createdByFullName,
    required this.location,
  });

  factory Article.fromJson(Map<String, dynamic> json) {
    return Article(
      id: json['id'],
      title: json['title'],
      coverImagePath: json['coverImagePath'],
      ratingAvg: json['ratingAvg'].toDouble(),
      totalNumberOfViews: json['totalNumberOfViews'],
      urlAsText: json['urlAsText'],
      createdByFullName: json['createdByFullName'],
      location: json['location'],
    );
  }
}
