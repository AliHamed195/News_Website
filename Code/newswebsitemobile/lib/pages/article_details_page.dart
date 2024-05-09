// pages/article_details_page.dart
import 'package:flutter/material.dart';
import 'package:html/parser.dart' show parse;
import 'dart:convert';
import '../models/article_details.dart';
import '../api/api_service.dart';

class ArticleDetailsPage extends StatelessWidget {
  final String articleUrl;

  const ArticleDetailsPage({super.key, required this.articleUrl});

  Future<ArticleDetails> _fetchArticleDetails() async {
    return await ApiService.fetchArticleByUrl(articleUrl);
  }

  List<Widget> _parseHtml(String htmlData) {
    final document = parse(htmlData);
    final elements = document.body?.children ?? [];
    List<Widget> widgets = [];

    for (var element in elements) {
      switch (element.localName) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          widgets.add(
            Text(
              element.text,
              style: TextStyle(
                fontSize: 24 -
                    (element.localName == 'h1'
                        ? 0
                        : int.parse(element.localName![1]) * 2),
                fontWeight: FontWeight.bold,
              ),
            ),
          );
          break;
        case 'p':
          final textContent = element.text.trim();
          final urlRegex = RegExp(r'Website:\s*(https?://[^\s]+)');
          final match = urlRegex.firstMatch(textContent);

          if (match != null) {
            final url = match.group(1);
            widgets.add(
              Image.network(
                url!,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return Container(
                    color: Colors.grey[200],
                    child: const Icon(
                      Icons.broken_image,
                      size: 80,
                      color: Colors.grey,
                    ),
                  );
                },
              ),
            );
          } else {
            widgets.add(
              Text(
                textContent,
                style: const TextStyle(fontSize: 16),
              ),
            );
          }
          break;
        case 'img':
          final src = element.attributes['src'];
          if (src != null) {
            widgets.add(
              Image.network(
                src,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return Container(
                    color: Colors.grey[200],
                    child: const Icon(
                      Icons.broken_image,
                      size: 80,
                      color: Colors.grey,
                    ),
                  );
                },
              ),
            );
          }
          break;
        case 'section':
          widgets.addAll(_parseHtml(element.innerHtml));
          break;
        default:
          break;
      }
      widgets.add(const SizedBox(height: 16));
    }

    return widgets;
  }

  Widget _convertImage(String coverImagePath) {
    final isBase64Image = coverImagePath.startsWith('data:image/');
    if (isBase64Image) {
      final base64Str = coverImagePath.split(',').last;
      final decodedBytes = base64Decode(base64Str);
      return Image.memory(
        decodedBytes,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) {
          return const Icon(
            Icons.broken_image,
            size: 80,
            color: Colors.grey,
          );
        },
      );
    } else {
      return Image.network(
        coverImagePath,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) {
          return Container(
            color: Colors.grey[200],
            child: const Icon(
              Icons.broken_image,
              size: 40,
              color: Colors.grey,
            ),
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Article Details'),
      ),
      body: FutureBuilder<ArticleDetails>(
        future: _fetchArticleDetails(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData) {
            return const Center(child: Text('No article found'));
          } else {
            final article = snapshot.data!;
            final parsedContent = _parseHtml(article.bodyStructureAsHtmlCode);
            return SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (article.coverImagePath.isNotEmpty)
                      _convertImage(article.coverImagePath),
                    const SizedBox(height: 16),
                    Text(
                      article.title,
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'By ${article.createdByFullName}',
                      style: const TextStyle(
                        fontSize: 16,
                        color: Colors.grey,
                      ),
                    ),
                    const SizedBox(height: 16),
                    ...parsedContent,
                  ],
                ),
              ),
            );
          }
        },
      ),
    );
  }
}
