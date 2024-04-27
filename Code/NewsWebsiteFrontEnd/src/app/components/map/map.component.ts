import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgIf, isPlatformBrowser } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';
import { GeneralArticleDetailsViewModel } from '../../models/article/general-article-details-view-model';
import { ArticlesService } from '../../Services/Articles/articles.service';
import { toStringHDMS } from 'ol/coordinate';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgIf],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map!: Map;
  private popup!: Overlay;
  articles: GeneralArticleDetailsViewModel[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadArticles();
    }
  }

  loadArticles() {
    const paginationModel = { startRow: 0, endRow: 1000 };
    this.articlesService.getAllPublicationsArticles(paginationModel).subscribe({
      next: (response) => {
        this.articles = response.data.filter(
          (x: GeneralArticleDetailsViewModel) => x.lat != 0 && x.lng != 0
        );
        console.log('this.articles', this.articles);
        this.initMap();
      },
      error: (err) => console.error('Error loading articles:', err),
    });
  }

  initMap() {
    this.map = new Map({
      target: 'map',
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    this.popup = new Overlay({
      element: document.getElementById('popup')!,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50],
    });
    this.map.addOverlay(this.popup);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: this.createFeaturesFromArticles(),
      }),
    });

    console.log(vectorLayer);

    this.map.addLayer(vectorLayer);

    this.map.on('pointermove', this.pointerMoveHandler.bind(this));
    this.map.on('singleclick', this.pointerClickHandler.bind(this));
  }

  createFeaturesFromArticles(): Feature[] {
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: '../../../assets/images/locationpin.png',
        scale: 0.05,
        color: '#FF0000',
      }),
    });

    return this.articles.map((article) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([article.lng, article.lat])),
        article: article,
      });
      feature.setStyle(iconStyle);
      return feature;
    });
  }

  pointerMoveHandler(event: any) {
    if (event.dragging) {
      this.popup.setPosition(undefined);
      return;
    }

    const pixel = this.map.getEventPixel(event.originalEvent);
    const features: any[] = [];
    this.map.forEachFeatureAtPixel(pixel, (feat) => {
      features.push(feat);
    });

    if (features.length > 0) {
      const article = features[0].get(
        'article'
      ) as GeneralArticleDetailsViewModel;
      const coordinate = event.coordinate;

      const element = this.popup.getElement() as HTMLElement;
      element.innerHTML = `
        <div>
          <strong>${article.title}</strong>
          <img src="${article.coverImagePath}" alt="${article.title}" style="width: 100px; height: auto;"/>
        </div>
      `;
      element.style.display = 'block';
      this.popup.setPosition(coordinate);
    } else {
      this.popup.setPosition(undefined);
      (this.popup.getElement() as HTMLElement).style.display = 'none';
    }
  }

  pointerClickHandler(event: any) {
    console.log('pointerClickHandler', event);
    const feature = this.map.forEachFeatureAtPixel(event.pixel, (feat) => feat);
    if (feature) {
      const article: GeneralArticleDetailsViewModel = feature.get('article');
      if (article && article.urlAsText) {
        this.router.navigate(['/Home/article-details-home', article.urlAsText]);
      }
    }
  }
}
