import { Component, inject } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArticleComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  //fetch from resolver
  articles = inject(ActivatedRoute).data.pipe(map(({ article }) => article));
}
