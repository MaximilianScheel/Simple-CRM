import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, docData, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date = new Date();
  loading = false;


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: Firestore) { }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    const collectionInstance = collection(this.firestore, 'users');
    const userObject = this.user.toJSON();
    addDoc(collectionInstance, userObject);
    setInterval(() => {
      this.loading = false;
      this.dialogRef.close();
    }, 1000);
  }
}
