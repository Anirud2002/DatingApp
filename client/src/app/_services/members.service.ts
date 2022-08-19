import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Member } from '../_models/members';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  apiBaseUrl = environment.apiBaseUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers(){
    if(this.members.length > 0) return of(this.members)
    return this.http.get<Member[]>(this.apiBaseUrl + "users").pipe(
      map(members => {
        this.members = members
        return members;
      })
    )
  }

  getMember(username: string){
    const member = this.members.find(member => member.username === username);
    if(member !== undefined) return of(member)
    return this.http.get<Member>(this.apiBaseUrl + "users/" + username);
  }

  updateMember(member: Member){
    return this.http.put(this.apiBaseUrl + 'users/', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }
}
