import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-mominur-cv',
  templateUrl: './mominur-cv.component.html',
  styleUrls: ['./mominur-cv.component.scss']
})
export class MominurCvComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }
  openFaceboook(){
   window.open('https://www.facebook.com/rimon.mominur', '_blank');
  }
  openLinkedin(){
    window.open('https://www.linkedin.com/in/mominurcse13/', '_blank');
   }
   openGit(){
    window.open('https://github.com/Rimon19', '_blank');
   }
   openGoogle(){
    window.open('https://myaccount.google.com/profile/profiles-summary?hl=en','_blank')
   }
   openTwitter(){
    window.open(' https://twitter.com/MdRimon079419','_blank')
   }
   
  
}
