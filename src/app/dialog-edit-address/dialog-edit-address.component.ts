import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore } from '@angular/fire/firestore';
import { collection, docData, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user!: User;
  loading = false;
  userId: string = '';

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: Firestore ) { }

  saveUser() {
    this.loading = true;
    const userObject = this.user.toJSON();
    updateDoc(doc(this.firestore, 'users', this.userId), userObject);
    setInterval(() => {
      this.loading = false;
      this.dialogRef.close();
    }, 1000);
  }
}
