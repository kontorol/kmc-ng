import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupWidgetComponent, PopupWidgetStates } from '@kontorol-ng/kontorol-ui';
import { BrowserService } from 'app-shared/kmc-shell';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import { AppEventsService } from 'app-shared/kmc-shared';
import { CreateNewPlaylistEvent } from 'app-shared/kmc-shared/events/playlist-creation';
import { KontorolPlaylistType } from 'kontorol-ngx-client';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';

@Component({
  selector: 'kAddNewPlaylist',
  templateUrl: './add-new-playlist.component.html',
  styleUrls: ['./add-new-playlist.component.scss']
})
export class AddNewPlaylistComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() parentPopupWidget: PopupWidgetComponent;
  addNewPlaylistForm: FormGroup;
  private _showConfirmationOnClose = true;

  public _playlistTypes = KontorolPlaylistType;

  constructor(private _formBuilder: FormBuilder,
              public router: Router,
              private _browserService: BrowserService,
              private _appLocalization: AppLocalization,
              private _appEvents: AppEventsService) {
    // build FormControl group
    this.addNewPlaylistForm = _formBuilder.group({
      name: ['', Validators.required],
      description: '',
      playlistType: KontorolPlaylistType.staticList
    });
  }

  goNext() {
    if (this.addNewPlaylistForm.valid) {
      this._showConfirmationOnClose = false;
      this.parentPopupWidget.close();
      const { name, description, playlistType: type } = this.addNewPlaylistForm.value;
      this._appEvents.publish(new CreateNewPlaylistEvent({ name, description, type }))
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.parentPopupWidget) {
      this.parentPopupWidget.state$
        .pipe(cancelOnDestroy(this))
        .subscribe(({ state, context }) => {
          if (state === PopupWidgetStates.Open) {
            this._showConfirmationOnClose = true;
          }
          if (state === PopupWidgetStates.BeforeClose
            && context && context.allowClose
            && this.addNewPlaylistForm.dirty
            && this._showConfirmationOnClose) {
            context.allowClose = false;
            this._browserService.confirm(
              {
                header: this._appLocalization.get('applications.content.addNewPlaylist.cancelEdit'),
                message: this._appLocalization.get('applications.content.addNewPlaylist.discard'),
                accept: () => {
                  this._showConfirmationOnClose = false;
                  this.parentPopupWidget.close();
                }
              }
            );
          }
        });
    }
  }

  ngOnDestroy() {
  }
}

