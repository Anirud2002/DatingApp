import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/members';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.apiBaseUrl + "users");
  }

  getMember(username: string){
    return this.http.get<Member>(this.apiBaseUrl + "users/" + username);
  }
}
