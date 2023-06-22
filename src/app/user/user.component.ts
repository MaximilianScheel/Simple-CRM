import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore } from '@angular/fire/firestore';
import { OnInit } from '@angular/core';
import { collection, docData, collectionData, addDoc, doc, updateDoc, deleteDoc, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  userData!: Observable<any[]>;
  allUsers: DocumentData[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.getData();
  }


  ngOnInit(f: any) {
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, f.value)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((err) => {
        console.error('Error writing document: ', err);
      })
      
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'id' })
      .subscribe(changes => {
        this.allUsers = changes;
        console.log(this.allUsers);
      })

    this.userData = collectionData(collectionInstance, { idField: 'id' });
  }

  updateData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    const updateData = {
      name: 'updatedName',
    }

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((err) => {
        console.error('Error updating document: ', err);
      }
      );
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('Document successfully deleted!');
      })
  }

  user = new User();

  openDialog() {
    this.dialog.open(DialogAddUserComponent); {

    }
  };
}
