import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor( private _snackBar: MatSnackBar,) { }
  openSnackBarSuccess(message: string, action: string) {
    this._snackBar.open(message, action
      ,
       {
      duration: 5* 1000,
     // horizontalPosition: 'right',
     // verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary']
     //panelClass: ['snackbar']
    }
    );
  }
  openSnackBarWarning(message: string, action: string) {
    this._snackBar.open(message, action
      ,
       {
      duration: 5* 1000,
      panelClass: ['mat-toolbar', 'mat-warn']
    }
    );
  }
  openSnackBarAlerming(message: string, action: string) {
    this._snackBar.open(message, action
      ,
       {
      duration: 5* 1000,
      panelClass: ['mat-toolbar', 'mat-accent']
    }
    );
  }
  saveMessage(){
    this._snackBar.open('Save Successfull !', 'Ok'
      ,
       {
      duration: 5* 1000,
      panelClass: ['mat-toolbar', 'mat-primary']
    }
    );
  }
  updateMessage(){
    this._snackBar.open('Update Successfull !', 'Ok'
      ,
       {
      duration: 5* 1000,
      panelClass: ['mat-toolbar', 'mat-primary']
    }
    );
  }
  deleteMessage(){
    this._snackBar.open('Deleted Successfully', 'Ok'
      ,
       {
      duration: 5* 1000,
      panelClass: ['mat-toolbar', 'mat-primary']
    }
    );
  }
  stockFinisMessage(available){
    this._snackBar.open(`Sorry! Stock Finished ! Available Qty ${available} `,'ok'
      ,
       {
      duration: 5* 1000,
      panelClass: ['mat-toolbar', 'mat-warn']
    }
    );
  }
  saveFirstMessage(){
    this._snackBar.open(`Please Save First !`,'ok'
    ,
     {
    duration: 5* 1000,
    panelClass: ['mat-toolbar', 'mat-warn']
  }
  );
  }
  errorMessage(){
    this._snackBar.open(`Something Wrong !`, 'Ok'
      ,
       {
      duration: 5* 1000,
      panelClass: ['mat-toolbar', 'mat-warn']
    }
    );
  }
  searchNotFoundMessage(){
    this._snackBar.open(`Search Not Found  !`, 'Ok'
      ,
       {
      duration: 5* 1000,
      panelClass: ['mat-toolbar', 'mat-warn']
    }
    );
  }
}
