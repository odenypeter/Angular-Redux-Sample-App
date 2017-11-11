import { Injectable } from '@angular/core';

declare let localforage: any;

@Injectable()

export class StoreService {

    constructor(
    ) {}

    public addItemToStorage(key, value) {
        return localforage.getItem(key).then(items => {
            value = value ? value : [];
            value.push(value);
            localforage.setItem(key, value);
        })
    }

    public createItem (key, id, data) {
      return localforage.getItem(key).then(items => {
        items = items ? items : [];
        items.push(items);
        return localforage.setItem(key, items);
      });
    }

    public updateItem (key, id, data) {
      return localforage.getItem(key).then(items => {
        items = items ? items : [];
        const checkExists = items.find(item => item.localId === id);
        if (checkExists) {
          dataUpdate(checkExists, data);
        }

        return localforage.setItem(key, items);
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
export function dataUpdate(object_1, object_2) {
  for (const item in object_1) {
    if (object_2.hasOwnProperty(item)) {
      object_1[item] = object_2[item];
    }
  }
}
