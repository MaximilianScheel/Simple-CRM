import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, docData, addDoc } from '@angular/fire/firestore';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date = new Date();


  constructor(private firestore: Firestore) {} 
 
  saveUser() {
    this.user.birthDate = this.birthDate.getTime();

    const collectionInstance = collection(this.firestore, 'users');
    const userObject = this.user.toJSON();
    addDoc(collectionInstance, userObject);
    console.log('adding user')
  }
}
