import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../View/register/register.component';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Credentials } from '../View/login/login.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentResponse: BehaviorSubject<AuthResponse | undefined> =
    new BehaviorSubject<AuthResponse | undefined>(undefined);
  private http: HttpClient = inject(HttpClient);
  private router = inject(Router);
  private readonly AUTH_KEY: string = 'AUTH_RESPONSE';

  login(credential: Credentials): Observable<AuthResponse> {
    return (
      this.http
        .post<AuthResponse>('/login', credential)
        // Ajouter des opérations lors de la préparation de l'observable
        .pipe(
          // Permet de lire la valeur qui sera retournée lors de la souscription
          tap((response) => this.currentResponse.next(response))
        )
    );
  }

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/register', user);
  }

  logout(): void {
    this.currentResponse.next(undefined);
  }

  get currentUser(): User | undefined {
    return this.currentResponse.value?.user;
  }

  get username() {
    return this.currentUser?.username;
  }

  get isLoggedIn(): boolean {
    return !!this.currentResponse.value;
  }

  constructor() {
    const auth = sessionStorage.getItem(this.AUTH_KEY);
    if (auth) this.currentResponse.next(JSON.parse(auth));

    this.currentResponse.subscribe((response) => {
      if (response)
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(response));
      else {
        this.router.navigate(['/home']);
        sessionStorage.clear();
      }
    });
  }
}

export interface AuthResponse {
  token: string;
  user: User;
}
