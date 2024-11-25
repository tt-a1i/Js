class MapPolyfill {
	constructor(entries) {
		// Use object to store key-value pairs
		this._entries = {};
		this._size = 0;

		// Initialize with entries if provided
		if (entries) {
			for (let [key, value] of entries) {
				this.set(key, value);
			}
		}
	}

	// Convert key to string to use as object property
	_getKey(key) {
		return typeof key === "object" ? JSON.stringify(key) : String(key);
	}

	set(key, value) {
		const stringKey = this._getKey(key);
		if (!this._entries.hasOwnProperty(stringKey)) {
			this._size++;
		}
		this._entries[stringKey] = {
			key: key,
			value: value,
		};
		return this;
	}

	get(key) {
		const stringKey = this._getKey(key);
		return this._entries[stringKey]?.value;
	}

	has(key) {
		const stringKey = this._getKey(key);
		return this._entries.hasOwnProperty(stringKey);
	}

	delete(key) {
		const stringKey = this._getKey(key);
		if (this._entries.hasOwnProperty(stringKey)) {
			delete this._entries[stringKey];
			this._size--;
			return true;
		}
		return false;
	}

	clear() {
		this._entries = {};
		this._size = 0;
	}

	get size() {
		return this._size;
	}

	// Iterator methods
	keys() {
		return Object.values(this._entries).map((entry) => entry.key);
	}

	values() {
		return Object.values(this._entries).map((entry) => entry.value);
	}

	entries() {
		return Object.values(this._entries).map((entry) => [
			entry.key,
			entry.value,
		]);
	}

	forEach(callback, thisArg) {
		Object.values(this._entries).forEach((entry) => {
			callback.call(thisArg, entry.value, entry.key, this);
		});
	}
}

// Usage example:
const map = new MapPolyfill();
map.set("key1", "value1");
map.set("key2", "value2");
console.log(map.get("key1")); // 'value1'
console.log(map.size); // 2
