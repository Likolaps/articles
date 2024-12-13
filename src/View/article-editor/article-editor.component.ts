import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AbstractFormComponent } from '../../tools/abstract-form-component';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.css',
})
export class ArticleEditorComponent extends AbstractFormComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    src: new FormControl(null),
    titre: new FormControl('', { validators: [Validators.required] }),
    prix: new FormControl(0, { validators: [Validators.required] }),
  });

  constructor(
    private service: ArticleService,
    private router: Router,
    route: ActivatedRoute
  ) {
    super();
    route.data.subscribe(({ article }) => {
      if (article) this.form.patchValue(article);
    });
  }

  onSubmit$(): void {
    this.service[this.form.value.id ? 'update' : 'save'](
      this.form.value
    ).subscribe(() => this.router.navigate(['/home']));
  }
}
