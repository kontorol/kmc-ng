import { Component, Input, ViewChild } from '@angular/core';
import { KontorolLogger, LogLevels } from '@kontorol-ng/kontorol-logger';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { AppAuthentication, BrowserService } from 'app-shared/kmc-shell';
import { globalConfig } from 'config/global';
import * as moment from 'moment';

@Component({
    selector: 'k-logs-record',
    templateUrl: './logs-record.component.html',
    styleUrls: ['./logs-record.component.scss'],
    providers: [KontorolLogger.createLogger('LogsRecordComponent')]
})
export class LogsRecordComponent {
    @Input() mode: 'link' | 'button';

    @Input() set logLevel(value: LogLevels) {
        if (typeof value === 'string') {
            const capitalizedValue = <LogLevels>(value.charAt(0).toUpperCase() + value.slice(1)); // capitalize string
            const isValidValue = this._logLevelValues.indexOf(capitalizedValue) !== -1;
            if (isValidValue) {
                this._logger.info(`logLevel value received, set logLevel to '${capitalizedValue}'`);
                this._logLevel = capitalizedValue;
            } else {
                this._logger.warn(`invalid logLevel provided (${value}), set logLevel to 'All'`);
                this._logLevel = 'All';
            }
        } else {
            this._logger.warn(`invalid logLevel provided (${value}), set logLevel to 'All'`);
            this._logLevel = 'All';
        }
    }

    @ViewChild('recordPopup') _recordPopup: PopupWidgetComponent;

    private _appLogLevel: LogLevels = globalConfig.client.production ? 'Error' : 'All';

    public _isRecording = false;
    public _logLevel: LogLevels;

    public _logLevelOptions: { value: LogLevels, label: string }[] = [
        { value: 'All', label: 'All' },
        { value: 'Trace', label: 'Trace' },
        { value: 'Debug', label: 'Debug' },
        { value: 'Info', label: 'Info' },
        { value: 'Warn', label: 'Warn' },
        { value: 'Error', label: 'Error' },
        { value: 'Fatal', label: 'Fatal' }
    ];
    public _logLevelValues = this._logLevelOptions.map(({ value }) => value);

    constructor(private _logger: KontorolLogger,
                private _appAuth: AppAuthentication,
                private _browserService: BrowserService) {
    }

    private _getLogFileName(): string {
        const timestamp = moment().format('YY-DD-MM_HH-mm-ss');
        const partnerId = this._appAuth.appUser.partnerId;
        return `logs_${partnerId}_${timestamp}.txt`;
    }

    private _getContent(): string {
        const recordedLogs = this._logger.getRecordedLogs();
        let result = '';

        if (recordedLogs && recordedLogs.length) {
            const formattedLogs = recordedLogs.map(item => {
                if (typeof item === 'string') {
                    return item;
                }

                const message = item.message;
                const level = item.level;
                delete item.level;
                delete item.message;

                return `[${level}] ${message} ${JSON.stringify(item)}`;
            });
            result = formattedLogs.join('\r\n');
        }

        return result;
    }

    private _stopRecord(): void {
        this._logger.setOptions({ level: this._appLogLevel });
        this._recordPopup.open();
    }

    public _sendMailToSupport(): void {
        this._browserService.openSupport();
    }

    public _startRecord(): void {
        this._logger.setOptions({ level: this._logLevel });
        this._logger.startRecordingLogs();
        this._isRecording = true;
        this._recordPopup.close();
    }

    public _downloadLogs(): void {
        const content = this._getContent();
        this._browserService.download(content, this._getLogFileName(), 'plain/text');
        this._cancel();
    }

    public _cancel(): void {
        this._isRecording = false;
        this._recordPopup.close();
    }

    public _toggleRecord(): void {
        if (!this._isRecording) {
            this._recordPopup.open();
        } else {
            this._stopRecord();
        }
    }
}
