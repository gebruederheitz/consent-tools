import type { Tier as TierRank} from '../../../../util/settings/types';
import type { Service } from './service';

// enum ConsentType {
//     CATEGORY,
//     TIER,
//     INDIVIDUAL,
// }

export class Tier {
    constructor(
        protected readonly _name: string,
        protected readonly _description: string,
        protected readonly _rank: TierRank,
    ) {
    }

    public get name() {
        return this._name;
    }

    public get description() {
        return this._description;
    }

    public get rank() {
        return this._rank;
    }

    public get services(): Service[] {
        return [];
    }
}
