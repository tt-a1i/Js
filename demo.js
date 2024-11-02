class MyMap {
    constructor() {
        this.items = {};
    }

    set(key, value) {
        this.items[key] = value;
    }

    get(key) {
        return this.items[key];
    }

    has(key) {
        return this.items.hasOwnProperty(key);
    }

    delete(key) {
        if (this.has(key)) {
            delete this.items[key];
            return true;
        }
        return false;
    }

    clear() {
        this.items = {};
    }

    size() {
        return Object.keys(this.items).length;
    }

    keys() {
        return Object.keys(this.items);
    }

    values() {
        return Object.values(this.items);
    }

    entries() {
        return Object.entries(this.items);
    }
}

// Example usage:
const map = new MyMap();
map.set('name', 'Alice');
console.log(map.get('name')); // Alice
console.log(map.has('name')); // true
console.log(map.size()); // 1
map.delete('name');
console.log(map.size()); // 0
