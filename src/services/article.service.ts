import { Injectable } from '@angular/core';
import { Article } from '../View/home/article/Article';
import { AbstractService } from '../tools/abstract-service';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends AbstractService<Article> {
  protected readonly ENDPOINT: string = '/articles';
}
