export enum Stores {
    Main
}

export enum Objects {
    Tasks = "tasks"
}

interface IHasId {
    id: IDBValidKey
}

export interface Task extends IHasId {
    name: string
    description: string
    due?: Date
    completed: boolean
}

export class MainStoreFactory {
    constructor() {
        throw new Error("This is a static class")
    }

    static getMainStore(store: Stores): IStore {
        const db = window.indexedDB.open(store.toString(), 1)

        return new MainStore(db)
    }
}

class MainStore implements IStore {
    request: IDBOpenDBRequest
    db: Promise<IDBDatabase>
    error: DOMException

    constructor(db: IDBOpenDBRequest) {
        this.request = db

        this.db = new Promise((resolve, reject) => {
            this.request.onsuccess = () => {
                resolve(this.request.result)
            }

            this.request.onerror = () => {
                this.error = this.request.error
                reject(null)
            }

            this.request.onupgradeneeded = (event) => {
                this.setUpObjectStores(event)
            }
        })
    }

    setUpObjectStores(event: IDBVersionChangeEvent) {
        const db = this.request.result;

        if (!db.objectStoreNames.contains(Objects.Tasks)) {
            console.log("Set up tasks store")
            db.createObjectStore(Objects.Tasks, { keyPath: "id", autoIncrement: true })
        }
    }

    get<TReturn>(objectStore: Objects, key: string): Promise<TReturn> {
        return this.db.then(db => {
            const tran = db.transaction(objectStore)
            const store = tran.objectStore(objectStore)
            const request = store.get(key)
            
            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    resolve(request.result)
                }

                request.onerror = () => {
                    reject(null)
                }
            })
        });
    }

    set<TType extends IHasId>(objectStore: Objects, value: TType, key?: string): Promise<IDBValidKey> {
        return this.db.then(db => {
            const tran = db.transaction(objectStore, "readwrite")
            const store = tran.objectStore(objectStore)

            if (!value.id) {
                delete value.id
            }
            
            const request = store.put(value, key)
            
            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    resolve(request.result)
                }

                request.onerror = () => {
                    console.log(request.error)
                    reject(null)
                }
            })
        });
    }

    getAll<TReturn>(objectStore: Objects): Promise<Array<TReturn>> {
        return this.db.then(db => {
            const tran = db.transaction(objectStore)
            const store = tran.objectStore(objectStore)
            const request = store.getAll()

            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    resolve(request.result)
                }

                request.onerror = () => {
                    reject([])
                }
            })
        })
    }

    delete(objectStore: Objects, key: IDBValidKey): Promise<boolean> {
        return this.db.then(db => {
            const tran = db.transaction(objectStore, "readwrite")
            const store = tran.objectStore(objectStore)
            const request = store.delete(key)

            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    resolve(true)
                }

                request.onerror = () => {
                    reject(false)
                }
            })
        })
    }
}

export interface IStore {
    get<TReturn>(objectStore: Objects, key: string): Promise<TReturn>
    set<TType extends IHasId>(objectStore: Objects, value: TType, key?: string): Promise<IDBValidKey>
    getAll<TReturn>(objectStore: Objects): Promise<Array<TReturn>>
    delete(objectStore: Objects, key: IDBValidKey): Promise<boolean>
}