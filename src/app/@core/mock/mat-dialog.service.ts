import { Injectable } from '@angular/core';
//import { MatConfirmDialogComponent } from '../../pages/merchandizer-module/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { MatConfirmDialogComponent } from '../data/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MatDialogService {

  constructor(private dialog: MatDialog) { }
  openConfirmDialog(msg){
    return this.dialog.open(MatConfirmDialogComponent,{
       width: '390px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       position: { top: "10px" },
       data :{
         message : msg
       }
     });
   }
}
