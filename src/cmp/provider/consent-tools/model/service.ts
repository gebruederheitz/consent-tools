import type { Category, Tier } from '../../../../util/settings/types';

export interface ServiceRecord {
    name: string;
    tier: Tier;
    hasConsent: boolean;
    description: string;
    category: Category;
}

export class Service {

    constructor(
        protected name: string,
    protected description: string,
    protected category: Category,
    protected tier: Tier,
    protected hasConsent: boolean = false,
    ) {
    }
}
