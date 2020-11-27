import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarsuService {

  private apiServer = "https://marsu-friends.herokuapp.com";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getProfile(id: any): Observable<any> {
    let endpoint = this.apiServer + '/marsu/profile/' + id;
    return this.http.get(endpoint, this.httpOptions);
  }

  updateProfile(id: any, data: any): Observable<any> {
    let endpoint = this.apiServer + '/marsu/profile/' + id;
    return this.http.put(endpoint, JSON.stringify(data), this.httpOptions);
  }

  getAllExceptUserLoggedIn(id: any): Observable<any> {
    let endpoint = this.apiServer + '/marsu/profile/' + id + '/friends';
    return this.http.get(endpoint, this.httpOptions);
  }

  getFriends(id: any): Observable<any> {
    let endpoint = this.apiServer + '/marsu/profile/' + id + '/friends/all';
    return this.http.get(endpoint, this.httpOptions);
  }

  addFriend(idFriend: any, idUser: any): Observable<any> {
    let endpoint = this.apiServer + '/marsu/profile/' + idUser + '/friends/add';
    let data = {
      id: idFriend
    }
    return this.http.put(endpoint, data, this.httpOptions);
  }

  deleteFriend(idFriend: any, idUser: any): Observable<any> {
    let endpoint = this.apiServer + '/marsu/profile/' + idUser + '/friends/delete';
    let data = {
      id: idFriend
    }
    return this.http.put(endpoint, data, this.httpOptions);
  }
}
