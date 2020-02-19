import { Component } from '@angular/core';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';

@Component({
    selector: 'k-power-user-console',
    templateUrl: './power-user-console.component.html',
    styleUrls: ['./power-user-console.component.scss'],
    providers: [KontorolLogger.createLogger('LogsRecordComponent')]
})
export class PowerUserConsoleComponent {
    public _display = false;

    constructor(private _logger: KontorolLogger) {

    }

    public _openPowerUserPanel(): void {
        this._logger.info('open powerUserConsole by user');
        this._display = true;
    }
}
