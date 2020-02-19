import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaBlockerMessage } from '@kontorol-ng/kontorol-ui';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';
import { KontorolUser } from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';

@Component({
  selector: 'kEditEmailAddress',
  templateUrl: './edit-email-address.component.html',
  styleUrls: ['./edit-email-address.component.scss'],
  providers: [KontorolLogger.createLogger('EditEmailAddressComponent')]
})
export class EditEmailAddressComponent implements OnInit, OnDestroy {
  @Input() parentPopupWidget: PopupWidgetComponent;
  @Input() user: KontorolUser;
  @Input() blockerMessage: AreaBlockerMessage;
  @Output() updateEmail = new EventEmitter<string>();

  public _editEmailAddressForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private _logger: KontorolLogger) {
  }

  ngOnInit() {
    this._createForm();
  }

  ngOnDestroy() {
  }

  // Create empty structured form on loading
  private _createForm(): void {
    this._editEmailAddressForm = this._fb.group({
      email: [this.user ? this.user.email : '', Validators.compose([Validators.required, Validators.email])],
    });
  }

  public _updateLoginData(): void {
    this._logger.info(`handle send update email action by user`);
    if (this._editEmailAddressForm.valid) {
      const formData = this._editEmailAddressForm.value;
      this.updateEmail.emit(formData.email);
    } else {
      this._logger.info(`change email form is not valid, abort action`, { errors: this._editEmailAddressForm.errors });
    }
  }
}
