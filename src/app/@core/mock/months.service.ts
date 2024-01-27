import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthsService {
monthArry=[
  {Id:1,name:'January'},
  {Id:2,name:'February'},
  {Id:3,name:'March'},
  {Id:4,name:'April'},
  {Id:5,name:'May'},
  {Id:6,name:'June'},
  {Id:7,name:'July'},
  {Id:8,name:'August'},
  {Id:9,name:'September'},
  {Id:10,name:'October'},
  {Id:11,name:'November'},
  {Id:12,name:'December'},
]
  constructor() { }
}
