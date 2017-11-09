import { Injectable } from '@angular/core';
import { ObjectHelper } from '../object.helper';

declare let localforage: any;

@Injectable()

export class StorageService {

    constructor(
      private objectHelper: ObjectHelper
    ) {}

    public addItemToStorage(storage, item) {
        return localforage.getItem(storage).then(items => {
            items = items || [];
            items.push(item);
            localforage.setItem(storage, items);
        })
    }

    public createOrUpdateItem(storage, id, data) {
        return localforage.getItem(storage).then(items => {
            items = items || [];
            const found = items.find(item => item.localId === id);
            if (found) {
                this.objectHelper.updateFromObject(found, data);
            } else {
                items.push(data);
            }
            return localforage.setItem(storage, items);
        })
    }

    public deleteItem(storage, id) {
        return localforage.getItem(storage).then(items => {
            items = items || [];
            items.forEach((item, index) => {
               if (item.localId === id) {
                   items.splice(index, 1);
               }
            });

            return localforage.setItem(storage, items);
        })
    }

    public updateStorage(storage, items) {
        return localforage.setItem(storage, items);
    }
}
