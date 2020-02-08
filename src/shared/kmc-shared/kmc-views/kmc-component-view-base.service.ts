import { KontorolLogger } from '@kontorol-ng/kontorol-logger';

export abstract class KmcComponentViewBaseService<TArgs> {

    protected constructor(protected _logger: KontorolLogger) {
    }

    abstract isAvailable(args: TArgs): boolean;
}
