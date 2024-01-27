import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {
  task:AngularFireUploadTask;
  percentage:Observable<number>;
  snapshot:Observable<any>;
  downloadURL:string;

  ImageUp=new ImageUp();
  
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private db: AngularFireDatabase,
    private storage:AngularFireStorage) { }

  startUpLoad(uploadNews,dbName){
    
    // const path=`${Company.cName}/${dbName}/${Date.now()}_${uploadNews.imageUrlFile.name}`;
    // uploadNews.imageUrlName=`${Date.now()}_${uploadNews.imageUrlFile.name}`;
    // const ref=this.storage.ref(path);

    const path=`${Company.cName}/${dbName}/${Date.now()}_${uploadNews.imageUrlFile.name}`;
 //   uploadNews.imageUrlName=`${Date.now()}_${uploadNews.imageUrlFile.name}`;
    const ref=this.storage.ref(path); 

    this.task=this.storage.upload(path,uploadNews.imageUrlFile);
  
  
    this.percentage=this.task.percentageChanges();
  
   
    this.snapshot=this.task.snapshotChanges().pipe(
      finalize(async()=>{
        await ref.getDownloadURL().toPromise().then(t=>{
           
          uploadNews.imageUrl=t;
          console.log(t);
          alert(t);
         this.db.list(`${Company.cName}/${dbName}/`).push(uploadNews).then(t=>{
          alert('Saved');
         });
        });
  
        
      
      }),
    );
        
    this.snapshot.subscribe(d=>{})
  }
  onFileSelected(event: any): void {
    this.selectedImage=null;
    this.ImageUp.imageUrlFile=null;
    
    const file: File = event.target.files[0];
    this.ImageUp.imageUrlFile =event.target.files[0];
    this.changeImageFile(file);
   // console.log(this.ImageUp.imageUrlFile);
  }
  changeImageFile(file:  File ) {
 
    if (file) {
      const image = new Image();
      image.src = window.URL.createObjectURL(file);
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = (e: any) => {
        const width = image.width;
        const height = image.height;
       
        if (width == 500 && height == 500) {
          // Image size is 500x500, you can proceed with the upload
              
             // console.log(file)
              this.selectedImage = e.target.result;
        } else {
          // Image does not meet the size requirement
          alert('Image must be 500x500 pixels.');
          // Optionally, you can clear the input field
          this.selectedImage=null;
          this.ImageUp.imageUrlFile=null;
        }
      
      };
    }
  }
  onFileSelectedForLog(event: any): void {
    this.selectedImage=null;
    this.ImageUp.imageUrlFile=null;
    
    const file: File = event.target.files[0];
    this.ImageUp.imageUrlFile =event.target.files[0];
    this.changeImageFileForLog(file);
   // console.log(this.ImageUp.imageUrlFile);
  }
  changeImageFileForLog(file:  File ) {
 
    if (file) {
      const image = new Image();
      image.src = window.URL.createObjectURL(file);
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = (e: any) => {
        const width = image.width;
        const height = image.height;
       console.log(width)
       console.log(height)
        if (width == 135 && height == 36) {
          // Image size is 500x500, you can proceed with the upload
              
             // console.log(file)
              this.selectedImage = e.target.result;
        } else {
          // Image does not meet the size requirement
          alert('Image must width*height-> 135x36 pixels.');
          // Optionally, you can clear the input field
          this.selectedImage=null;
          this.ImageUp.imageUrlFile=null;
        }
      
      };
    }
  }
saveImage(folderName:String,image: File): Promise<string> {
  const path=`${Company.cName}/${folderName}/${Date.now()}_${image.name}`;
  const ref = this.storage.ref(path); // get a reference to the file path
  const task = ref.put(image); // upload the file

  return new Promise<string>((resolve, reject) => {
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          resolve(url); // resolve with the download URL of the file
        });
      })
    ).subscribe();
  });
}

// Function to delete an image by its download URL
deleteImageByUrl(downloadUrl: string): Promise<void> {
  // Get the reference to the file from the download URL
  const storageRef = this.storage.storage.refFromURL(downloadUrl);

  // Delete the file
  return storageRef.delete();
}

}




export class ImageUp{
  imageUrlFile:File
}