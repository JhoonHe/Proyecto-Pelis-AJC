import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movies } from 'src/app/models/movies';
import { series } from 'src/app/models/series';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  contenidos: any = movies.concat(series)
  idContenido: number = 0
  contenido: any;

  code: string = "";
  url: string = ``;
  safeUrl: SafeResourceUrl;

  constructor(private routeActivate: ActivatedRoute, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.idContenido = this.routeActivate.snapshot.params["id"];

    this.contenidos.forEach((elemento: any) => {
      if (elemento.id == this.idContenido) {
        this.contenido = elemento;

        this.code = elemento.trailer;
        this.url = `https://www.youtube.com/embed/${this.code}`;
      }
    })
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log("peli " + this.contenido.titulo);
  }
}
