declare module '@gebruederheitz/wp-frontend-utils' {
    import type { Value } from 'classnames';

    type LogArg = Value | object | Array<never>;

    type LogFunction = (...args: LogArg[]) => void;

    export class Debuggable {
        constructor(namespace: string);

        get debug(): {
            log: LogFunction;
            warn: LogFunction;
            error: LogFunction;
        };

        globalJsDebug: boolean;
    }

    export function createDomElement(options: {
        type?: string;
        classNames?: string[];
        attributes?: Record<string, string | boolean>;
        parent?: Element;
        innerHtml?: string;
        innerText?: string;
    }): HTMLElement;

    export function $(
        parent?: Element
    ): (selector: string) => HTMLElement;

    export function $$(parent?: Element): (selector: string) => NodeList;
}
