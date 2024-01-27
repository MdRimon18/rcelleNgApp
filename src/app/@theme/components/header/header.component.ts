import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
//import { UserInfoTblService } from '../../../pages/merchandizer-module/ClientDb/user-info-tbl.service';
//import { ItemCartTblService } from '../../../pages/merchandizer-module/ClientDb/item-cart-tbl.service';
//import { InitialPageMENU_ITEMS, InitialPageMENU_ITEMSBangla } from '../../../pages/pages-menu';
//import { PageMenuTblService } from '../../../pages/merchandizer-module/ClientDb/page-menu-tbl.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit, OnDestroy {
  myDate ;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';
  language='';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  isBangla:false;
  phone: string;
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private datePipe: DatePipe,
              private router:Router,
              public languageService:LanguageConverterService,
            //  public itemCartTblService:ItemCartTblService,
   
            //  public userInfoTblService:UserInfoTblService,
            //  private pageMenuTblService:PageMenuTblService,
              ) {
                this. myDate = new Date();
                let language=localStorage.getItem('Language');
                
               // console.log(this.userInfoTblService.ObjectReciever.value)
                this.language=language;
             //   this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-MM');
  }
  
  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
   
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  OnChangeLanguage(){
    
    localStorage.setItem("Language",this.language);
    window.location.reload();
  //   this.router.navigateByUrl('/pages', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/pages/dashboard']);
  // }); 


  }
  itemCardExpand(){
    this.router.navigate(['/pages/inventory/item-card/']);
  }
  // logout(){
  //   this.userInfoTblService.initialLoad({});
  //   let language=localStorage.getItem('Language');
  //      this.language=language;
  //     if(this.language=='English'||this.language==null){
  //       this.pageMenuTblService.initialLoad(InitialPageMENU_ITEMS);}
  //       if(this.language=='Bangla'){
  //         this.pageMenuTblService.initialLoad(InitialPageMENU_ITEMSBangla);}
        
         
  //   localStorage.removeItem('phone')
  //   localStorage.removeItem('name')
  //   localStorage.removeItem('userType')
  //   localStorage.removeItem('key')
  //   localStorage.removeItem('returnUrl')
  //   localStorage.removeItem('shopOwner')
  //    this.router.navigate(['/pages/inventory/login']);
  // }
  
}
