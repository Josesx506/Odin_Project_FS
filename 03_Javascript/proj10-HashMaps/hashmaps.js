class HashMap {
    constructor(size=16){
        this.capacity = size;               // Hash bucket size
        this.lf = 0.75;                     // Load Factor
        this.table = Array(this.capacity).fill(null);
        this.primeNumber = 31;
        this.length = 0;
    }

    hash(key) {
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            hashCode = (this.primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    // Calculate the current load factor
    loadFactor() {
        return this.length / this.capacity;
    }

    // Resize the hash table
    resize() {
        const oldTable = this.table;
        this.capacity *= 2;                             // Double the capacity
        this.table = Array(this.capacity).fill(null);
        this.length = 0;                                // Reset length and re-add entries

        for (let bucket of oldTable) {
            if (bucket) {
                for (let [key, value] of bucket) {
                    this.set(key, value);               // Rehash and add to new table
                }
            }
        }
    }

    set(key, value) {
        if (this.loadFactor() > this.lf) {
            this.resize();
        }

        let hashVal = this.hash(key);
        if (!this.table[hashVal]) {
            this.table[hashVal] = [];
        } 
        
        // Update existing key-value pair
        let bucket = this.table[hashVal];
        for (let kyvl of bucket) {
            if (kyvl[0] === key) {
                kyvl[1] = value;
                return;
            }
        }

        // Insert new key-value pair
        bucket.push([key, value]);
        this.length += 1;
    }

    get(key) {
        let hashVal = this.hash(key);
        let bucket = this.table[hashVal];
        if (bucket) {
            for (let kyvl of bucket) {
                if (kyvl[0] === key) {
                    return kyvl[1];
                }
            }
        }
        return null;
    }

    has(key) {
        let hashVal = this.hash(key);
        let bucket = this.table[hashVal];
        if (bucket) {
            for (let kyvl of bucket) {
                if (kyvl[0] === key) {
                    return true;
                }
            }
        }
        return false;
    }

    remove(key) {
        let hashVal = this.hash(key);
        let bucket = this.table[hashVal];
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i, 1);
                    this.length -= 1;
                    return true;
                }
            }
        }
        return false;
    }

    clear() {
        this.table = Array(this.capacity).fill(null);
        this.length = 0;
        return this;
    }

    keys() {
        let keysArray = [];
        for (let bucket of this.table) {
            if (bucket) {
                for (let kyvl of bucket) {
                    keysArray.push(kyvl[0]);
                }
            }
        }
        return keysArray.sort();
    }

    values() {
        let valuesArray = [];
        for (let bucket of this.table) {
            if (bucket) {
                for (let kyvl of bucket) {
                    valuesArray.push(kyvl[1]);
                }
            }
        }
        return valuesArray;
    }

    entries() {
        let entriesArray = [];
        for (let bucket of this.table) {
            if (bucket) {
                for (let kyvl of bucket) {
                    entriesArray.push([kyvl[0],kyvl[1]]);
                }
            }
        }
        return entriesArray;
    }

    
};

console.log("#### HashMaps");
let hshMp = new HashMap() // or HashMap() if using a factory

hshMp.set("apple", "red")
hshMp.set("banana", "yellow")
hshMp.set("carrot", "orange")
hshMp.set("dog", "brown")
hshMp.set("elephant", "gray")
hshMp.set("frog", "green")
hshMp.set("grape", "purple")
hshMp.set("hat", "black")
hshMp.set("ice cream", "white")
hshMp.set("jacket", "blue")
hshMp.set("kite", "pink")
hshMp.set("lion", "golden")

console.log(hshMp.keys());
console.log(`${hshMp.capacity},${hshMp.length}`);

// Remove an entry
console.log(hshMp.remove("apple"));
console.log(hshMp.remove("john"));
console.log(hshMp.entries());
console.log(`${hshMp.capacity},${hshMp.length}`);

// Update an entry
hshMp.set("dog", "black");
console.log(hshMp.entries());
console.log(`${hshMp.capacity},${hshMp.length}`);

// Add additional entries to exceed the load factor
hshMp.set("apple", "red")
hshMp.set("moon", "silver")
hshMp.set("dolphin", "blue")
console.log(`${hshMp.capacity},${hshMp.length}`);

// Clear the table
hshMp.clear()
console.log(hshMp.table);


// Create a HashSet class or factory function that behaves the same as a HashMap but only contains keys with no values.
class HashSet {
    constructor(size=16){
        this.capacity = size;               // Hash bucket size
        this.lf = 0.75;                     // Load Factor
        this.table = Array(this.capacity).fill(null);
        this.primeNumber = 31;
        this.length = 0;
    }

    hash(key) {
        let hashCode = 0;
        for (let i = 0; i < key.length; i++) {
            hashCode = (this.primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    loadFactor() {
        return this.length / this.capacity;
    }

    resize() {
        const oldTable = this.table;
        this.capacity *= 2;
        this.table = Array(this.capacity).fill(null);
        this.length = 0;

        for (let key of oldTable) {
            if (key) {
                this.set(key);
                }
        }
    }

    set(key) {
        if (this.loadFactor() > this.lf) {
            this.resize();
        }

        let hashVal = this.hash(key);
        if (!this.table[hashVal]) {
            this.table[hashVal] = key;
            this.length += 1;
        } else {
            this.table[hashVal] = key;
        }
        return this;
    }

    get(key) {
        let hashVal = this.hash(key);
        if (this.table[hashVal]) {
            return this.table[hashVal];
        }
        return null;
    }

    has(key) {
        let hashVal = this.hash(key);
        if (this.table[hashVal]) {
            return true;
        }
        return false;
    }

    remove(key) {
        let hashVal = this.hash(key);
        if (this.table[hashVal]) {
            this.table[hashVal] = null;
            this.length -= 1;
            return true;
        }
        return false;
    }

    clear() {
        this.table = Array(this.capacity).fill(null);
        this.length = 0;
        return this;
    }

    entries() {
        let entriesArray = [];
        for (let entry of this.table) {
            if (entry) {
                entriesArray.push(entry);
            }
        }
        return entriesArray.sort();
    }
}

console.log("#### HashSets");
let hshSt = new HashSet();
hshSt.set("apple")
hshSt.set("banana")
hshSt.set("carrot")
hshSt.set("dogs")
hshSt.set("elephant")
hshSt.set("frog")
hshSt.set("grapes")
hshSt.set("hat")
hshSt.set("ice cream")
hshSt.set("jacket")
hshSt.set("kite")
hshSt.set("lion")
hshMp.set("moon")
hshMp.set("equinox")

console.log(hshSt.entries());
console.log(`${hshSt.capacity},${hshSt.length}`);
console.log(hshSt.table);