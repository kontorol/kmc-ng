import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { AppAuthentication, AppShellService, BrowserService, PartnerPackageTypes } from "app-shared/kmc-shell";
import { buildDeployUrl } from 'config/server';
import * as $ from 'jquery';
import { PopupWidgetComponent } from '@kontorol-ng/kontorol-ui';

@Component({
  selector: 'kKMCDashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('appMenu', { static: true }) private _appMenuRef : any;
  @ViewChild('whatsNew', { static: true }) private _whatsNewWin : PopupWidgetComponent;

  public _bannerUri = buildDeployUrl('./assets/kontorol_connect_banner2x.jpg');
  private onResize : () => void;


  constructor(private appShellService : AppShellService, private appAuthentication: AppAuthentication, private _browserService: BrowserService) {
      this.onResize = this._resizeContent.bind(this);
  }

  private _resizeContent() : void
  {
    const $window = $(window);
    if (this._appMenuRef) {
        const $appMenu = $(this._appMenuRef.nativeElement);
        this.appShellService.setContentAreaHeight($window.outerHeight() - $appMenu.outerHeight());
    }
  }

  private _showWhatsNew(): void {
      const isRegisteredUser = this.appAuthentication.appUser.partnerInfo.partnerPackage !== PartnerPackageTypes.PartnerPackageFree;
      const whatsNewShown = this._browserService.getFromLocalStorage('connectPromoShown') || false;
      if (isRegisteredUser && !whatsNewShown){
          setTimeout(()=>{
              this._browserService.setInLocalStorage('connectPromoShown',true);
              this._whatsNewWin.open();
          },200);
      }
  }

    closeWin():void{
        this._whatsNewWin.close();
    }

    register():void{
        this._browserService.openLink('https://connect.kontorol.com');
    }

  ngAfterViewInit()
  {
    $(window).bind('resize', this.onResize); // We bind the event to a function reference that proxy 'actual' this inside
    this._resizeContent();
    // this._showWhatsNew();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    $(window).unbind('resize',this.onResize);
  }

}
