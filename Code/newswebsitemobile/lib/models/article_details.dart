class ArticleDetails {
  final int id;
  final String title;
  final String coverImagePath;
  final String summary;
  final String createdByFullName;
  final String bodyStructureAsHtmlCode;

  ArticleDetails({
    required this.id,
    required this.title,
    required this.coverImagePath,
    required this.summary,
    required this.createdByFullName,
    required this.bodyStructureAsHtmlCode,
  });

  factory ArticleDetails.fromJson(Map<String, dynamic> json) {
    return ArticleDetails(
      id: json['id'] ?? 0,
      title: json['title'] ?? '',
      coverImagePath: json['coverImagePath'] ?? '',
      summary: json['summary'] ?? '',
      createdByFullName: json['createdByFullName'] ?? '',
      bodyStructureAsHtmlCode: json['bodyStructureAsHtmlCode'] ?? '',
    );
  }
}
