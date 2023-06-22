import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection, docData, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log('GOT ID', this.userId);
      this.getUser();
    });
  }

  getUser() {
    const docInstance = doc(this.firestore, 'users', this.userId);
    docData(docInstance, { idField: 'id' })
      .subscribe((res: any) => {
        this.user = new User(res);
        console.log('GOT USER', this.user);
      }
      );
  }


  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }


  /**
   * Get dialog from constructor and open the edit user dialog component
   */
  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;

  }
}
