export class ScryptaDB {
    isBrowser = true
    data: any = {}
    dir = './this'

    constructor(isBrowser = true) {
        this.isBrowser = isBrowser
        this.data = {}
        this.dir = './this'
    }

    loadBrowserDB() {
        return new Promise(response => {
            const collections: any = ["settings", "wallet", "xsid"]
            for (const x in collections) {
                if (localStorage.getItem(collections[x]) !== null && localStorage.getItem(collections[x]) !== undefined) {
                    const collection = localStorage.getItem(collections[x])
                    this.data[collections[x]] = JSON.parse(collection || "[]")
                } else {
                    this.data[collections[x]] = []
                    localStorage.setItem(collections[x], JSON.stringify([]))
                }
            }
            response(true)
        })
    }

    put(collection: string, doc: any) {
        return new Promise(async response => {
            await this.loadBrowserDB()
            let found = false
            for (const x in this.data[collection]) {
                if (JSON.stringify(doc) === JSON.stringify(this.data[collection][x])) {
                    found = true
                }
            }
            if (!found) {
                this.data[collection].push(doc)
                localStorage.setItem(collection, JSON.stringify(this.data[collection]))
            }
            response(true)
        })
    }

    get(collection: string, selector = '', id = ''): any {
        return new Promise(async response => {
            await this.loadBrowserDB()
            if (selector !== '' && id !== '') {
                let found = false
                let doc
                for (const x in this.data[collection]) {
                    if (!found) {
                        if (this.data[collection][x][selector] === id) {
                            found = true
                            doc = this.data[collection][x]
                        }
                    }
                }

                if (found) {
                    response(doc)
                } else {
                    response([{}])
                }
            } else {
                response(this.data[collection])
            }
        })
    }

    update(collection: string, selector: any, id: any, doc: any) {
        return new Promise(async response => {
            await this.loadBrowserDB()

            let found = false
            for (const x in this.data[collection]) {
                if (!found) {
                    if (this.data[collection][x][selector] === id) {
                        found = true
                        this.data[collection][x] = doc
                    }
                }
            }

            if (found) {
                localStorage.setItem(collection, JSON.stringify(this.data[collection]))
                response(doc)
            } else {
                response(false)
            }
        })
    }

    delete(collection: string, selector: any, id: any) {
        return new Promise(async response => {
            await this.loadBrowserDB()
            const toStore = []
            for (const x in this.data[collection]) {
                if (this.data[collection][x][selector] !== id) {
                    toStore.push(this.data[collection][x])
                }
            }
            localStorage.setItem(collection, JSON.stringify(toStore))
            response(true)
        })
    }

    destroy(collection: string) {
        this.data[collection] = []
        return new Promise(async response => {
            await this.loadBrowserDB()
            localStorage.setItem(collection, '[]')

            response(true)
        })
    }
}