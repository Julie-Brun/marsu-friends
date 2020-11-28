import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { MarsuService } from './marsu.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isReg: boolean = false;
  currentUser: any = {};

  private apiServer = "https://marsu-friends.herokuapp.com";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private router: Router, private marsuService: MarsuService) { }

  register(data: any): Observable<any> {
    this.isReg = true;
    return this.http.post<any>(this.apiServer + '/auth/register', JSON.stringify(data), this.httpOptions)
  }

  login(data: any) {
    return this.http.post<any>(this.apiServer + '/auth/login', JSON.stringify(data), this.httpOptions).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      console.log(res);
      const decoded: any = jwt_decode(res.token);
      console.log(decoded);
      this.marsuService.getProfile(decoded['id']).subscribe((res: any) => {
        this.currentUser = res;   
        console.log('01');
        this.router.navigate(['profile/' + this.currentUser[0]._id]);
        console.log('Logged In !');
      })
    })
  }

  logout() {
    return this.http.get<any>(this.apiServer + '/auth/logout', this.httpOptions).subscribe((res: any) => {
      localStorage.clear();
      this.router.navigate(['auth']);
    });
  }

  get isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    return (token !== null) ? true : false;
  }
}
