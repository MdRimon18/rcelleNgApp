import { Injectable } from '@angular/core';
import { TeamLeaderInfo } from '../../data/marchanzider-model/team-leader-info.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseURL } from '../../data/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class TeamLeaderInfoService {

  constructor(public http:HttpClient) { }
  getAllTeamLeader():Observable<TeamLeaderInfo[]>{
    return this.http.get<TeamLeaderInfo[]>(BaseURL.apiUrl+'/TeamlederInfoes/Index');
  }
  addTeamLeader(TeamLeaderInfo:TeamLeaderInfo){
    console.log(TeamLeaderInfo);
    return this.http.post<TeamLeaderInfo[]>(BaseURL.apiUrl+'/TeamlederInfoes',TeamLeaderInfo);
  }
  updateTeamLeader(TeamLeaderInfo:TeamLeaderInfo){
    return this.http.put(BaseURL.apiUrl+'/TeamlederInfoes/'+TeamLeaderInfo.teamleaderId,TeamLeaderInfo);
  }
  deleteTeamLeader(id: number){
    return this.http.delete(BaseURL.apiUrl+'/TeamlederInfoes/'+id);
  }
}
