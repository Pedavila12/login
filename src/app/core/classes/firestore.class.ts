import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from "@angular/fire/compat/firestore";

export abstract class Firestore<T extends { id: string}> {

    protected collection: AngularFirestoreCollection<T>;

    constructor(protected db: AngularFirestore){
        //this.collection = this.db.collection;
    }

    protected setCollection(path: string, queryFn?: QueryFn){
        this.collection = path ? this.db.collection(path, queryFn) : null;
    }

    private setItem(item: T, operation: string): Promise<T>{
        return this.collection
        .doc<T>(item.id)
        [operation](item)
        .then(() => item);
    }

    getAll(): Observable<T[]>{
        return this.collection.valueChanges();
    }

    cerate(item: T):Promise<T>{
        item.id = this.db.createId();
        return this.setItem(item , 'set');
    }

    update(item: T): Promise<T>{
        return this.setItem(item, 'upgrade');
    }

    delete(item: T): Promise<void>{
        return this.collection.doc<T>(item.id).delete();
    }

    get(id: string): Observable<T>{
        return this.collection.doc<T>(id).valueChanges();
    }
}
