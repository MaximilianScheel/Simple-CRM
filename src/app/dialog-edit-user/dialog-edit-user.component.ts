import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { collection, docData, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {

  user!: User;
  userId: string = '';
  loading = false;
  birthDate: Date = new Date();
  
    constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) { }
  
    saveUser() {
      this.user.birthDate = this.birthDate.getTime();
      this.loading = true;
      const collectionInstance = collection(this.firestore, 'users');
      const userObject = this.user.toJSON();
      updateDoc(doc(this.firestore, 'users', this.userId), userObject);
      setInterval(() => {
        this.loading = false;
        this.dialogRef.close();
      }, 1000);

    }
}
