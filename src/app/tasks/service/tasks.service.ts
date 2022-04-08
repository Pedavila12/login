import { AuthService } from './../../core/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Task } from '../models/task.model';

//import {firestore} from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class TasksService  extends Firestore<Task>{

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
   }

   private init(): void{
    this.authService.authState$.subscribe(user =>{
      if (user){
        this.setCollection(`/user/${user.uid}/tasks`, )
        return;
      }
      this.setCollection(null);
    });
   }
}
