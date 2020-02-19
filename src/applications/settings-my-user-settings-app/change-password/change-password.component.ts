import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AreaBlockerMessage} from '@kontorol-ng/kontorol-ui';
import {PopupWidgetComponent} from '@kontorol-ng/kontorol-ui';
import { cancelOnDestroy, tag } from '@kontorol-ng/kontorol-common';
import {KontorolPartnerAuthenticationType, KontorolUser} from 'kontorol-ngx-client';
import {UserUpdateLoginDataActionArgs} from 'kontorol-ngx-client';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import {AppAuthentication} from "app-shared/kmc-shell";

@Component({
  selector: 'kChangePassword',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [KontorolLogger.createLogger('ChangePasswordComponent')]
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  @Input() parentPopupWidget: PopupWidgetComponent;
  @Input() user: KontorolUser;
  @Input() blockerMessage: AreaBlockerMessage;

  @Output() updateLoginData = new EventEmitter<UserUpdateLoginDataActionArgs>();

  public _changePasswordForm: FormGroup;
  @Input() public set showAuthenticator(val: boolean){
      this._showAuthenticator = val;
      if (val && !this._changePasswordForm.get('authentication')){
          this._changePasswordForm.addControl('authentication', new FormControl('', Validators.required));
      }
  }
  public get showAuthenticator(): boolean{
      return this._showAuthenticator;
  }
  public _showAuthenticator = false;
  constructor(private _fb: FormBuilder,
              private _appAuthentication: AppAuthentication,
              private _logger: KontorolLogger) {
  }

  ngOnInit() {
    this._showAuthenticator = this._appAuthentication.appUser.partnerInfo.authenticationType === KontorolPartnerAuthenticationType.twoFactorAuth;
      this._createForm();
  }

  ngOnDestroy() {
  }

  public _passwordMatchValidator(passControl: AbstractControl): ValidationErrors | null {
    return passControl.parent && passControl.parent.value.newPassword === passControl.value ? null : { 'mismatch': true };
  }

  // Create empty structured form on loading
  private _createForm(): void {
    let formConfig = {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        reTypeNewPassword: ['', Validators.compose([Validators.required, this._passwordMatchValidator])]
    };
    if (this._showAuthenticator){
        formConfig['authentication'] = ['', Validators.required];
    }
    this._changePasswordForm = this._fb.group(formConfig);
  }

  public _updateLoginData(): void {
    this._logger.info(`handle send update password action by user`);
    if (this._changePasswordForm.valid) {
      const formData = this._changePasswordForm.value;
      let updateLoginDataEvent =  {
          oldLoginId: this.user.email,
          password: formData.currentPassword,
          newPassword: formData.newPassword,
      };
      if (this._showAuthenticator){
          updateLoginDataEvent['otp'] = formData.authentication;
      }
      this.updateLoginData.emit(updateLoginDataEvent);
    } else {
      this._logger.info(`change password form is not valid, abort action`, { errors: this._changePasswordForm.errors });
    }
  }
}
