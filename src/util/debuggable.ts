export interface DebugLog {
    log: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    enable: () => DebugLogger;
    disable: () => DebugLogger;
    toggle: (t: boolean) => DebugLogger;
    devnull: (...args: unknown[]) => DebugLogger;
}

class DebugLogger implements DebugLog {
    protected _enabled = true;
    protected _namespace: string | null = null;
    protected _parent: DebugLogger = this;

    constructor(
        namespace: string | null = null,
        enabled = true,
        parent: DebugLogger | null = null
    ) {
        if (namespace !== null) {
            this._namespace = namespace;
        }

        this._enabled = enabled;

        if (parent === null) {
            this._parent = this;
        } else {
            this._parent = parent;
        }
    }

    public enable(): DebugLogger {
        this._enabled = true;

        return this;
    }

    public disable(): DebugLogger {
        this._enabled = false;

        return this;
    }

    public toggle(toggle: boolean): DebugLogger {
        this._enabled = toggle;

        return this;
    }

    public log(...args: unknown[]): void {
        if (this._enabled) this._parent.log(this._prefix, ...args);
    }

    public warn(...args: unknown[]): void {
        if (this._enabled) this._parent.warn(this._prefix, ...args);
    }

    public error(...args: unknown[]): void {
        if (this._enabled) this._parent.error(this._prefix, ...args);
    }

    public devnull(): DebugLogger {
        return this;
    }

    protected get _prefix(): string {
        return this._namespace !== null ? `[${this._namespace}]` : '';
    }
}

class GlobalDebugLogger extends DebugLogger implements DebugLog {
    public spawn(namespace: string | null = null): DebugLogger {
        return new DebugLogger(namespace, this._enabled, this);
    }

    override log(...args: unknown[]): void {
        if (this._enabled) console.log(...args);
    }

    override warn(...args: unknown[]): void {
        if (this._enabled) console.warn(...args);
    }

    override error(...args: unknown[]): void {
        if (this._enabled) console.error(...args);
    }
}

export const debug = new GlobalDebugLogger('Global');
