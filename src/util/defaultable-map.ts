
export class DefaultableMap<K, T> extends Map<K, T> {
    private _default: T | undefined;

    constructor(initialValue?: Iterable<[K, T]>) {
        super(initialValue);

        if (initialValue instanceof DefaultableMap) {
            this._default = initialValue.default;
        }
    }

    public setDefault(defaultValue: T): DefaultableMap<K, T> {
        this._default = defaultValue;
        return this;
    }

    get default() {
        return this._default;
    }

    public override get(key: K): T | undefined {
        const v = super.get(key);
        if (typeof v === 'undefined') {
            return this._default;
        }

        return v;
    }
}
