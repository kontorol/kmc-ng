import { Injectable } from '@angular/core';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { AppLocalization } from '@kontorol-ng/mc-shared';
import {
    ContentCategoriesMainViewService,
    ContentEntriesMainViewService,
    ContentModerationMainViewService,
    ContentPlaylistsMainViewService,
    ContentSyndicationMainViewService,
    ContentUploadsMainViewService,
    ContentBulkUploadsMainViewService,
    ContentDropFoldersMainViewService,
    StudioV3MainViewService,
    StudioV2MainViewService,
    UsageDashboardMainViewService,
    LiveAnalyticsMainViewService,
    AdminUsersMainViewService,
    AdminRolesMainViewService,
    AdminMultiAccountMainViewService,
    AnalyticsMainViewService,
    SettingsAccountSettingsMainViewService,
    SettingsIntegrationSettingsMainViewService,
    SettingsAccessControlMainViewService,
    SettingsTranscodingMainViewService,
    SettingsMetadataMainViewService,
    SettingsMyUserSettingsMainViewService,
    SettingsAccountInformationMainViewService,
    ServicesDashboardMainViewService,
    AnalyticsNewMainViewService,
} from './main-views';
import { Observable } from 'rxjs';

export interface KMCAppMenuItem {
    menuTitle: string;
    icon?: string;
    isAvailable: boolean;
    isActiveView: (activePath: string) => boolean;
    position?: string;
    open?: () => void;
    openWithState?: Observable<{ opened: boolean }>;
    children?: KMCAppMenuItem[];
    customMenuItemId?: string;
    customMenuItemCallback?: (event) => void;
}

@Injectable()
export class KmcMainViewsService {

    private _logger: KontorolLogger;
    private _cache: KMCAppMenuItem[] = [];


    constructor(
        logger: KontorolLogger,
        private _contentEntriesMain: ContentEntriesMainViewService,
        private _contentCategoriesMain: ContentCategoriesMainViewService,
        private _contentModerationMain: ContentModerationMainViewService,
        private _contentPlaylistsMain: ContentPlaylistsMainViewService,
        private _contentSyndicationMain: ContentSyndicationMainViewService,
        private _contentUploadsMain: ContentUploadsMainViewService,
        private _contentBulkUploadsMain: ContentBulkUploadsMainViewService,
        private _contentDropFoldersMain: ContentDropFoldersMainViewService,
        private _studioV2Main: StudioV2MainViewService,
        private _studioV3Main: StudioV3MainViewService,
        private _usageDashboardMain: UsageDashboardMainViewService,
        private _servicesDashboardMain: ServicesDashboardMainViewService,
        private _analyticsMainViewService: AnalyticsMainViewService,
        private _analyticsNewMainViewService: AnalyticsNewMainViewService,
        private _liveAnalyticsMain: LiveAnalyticsMainViewService,
        private _adminUsersMain: AdminUsersMainViewService,
        private _adminRolesMain: AdminRolesMainViewService,
        private _adminMultiAccountMain: AdminMultiAccountMainViewService,
        private _settingsAccountSettingsMain: SettingsAccountSettingsMainViewService,
        private _settingsIntegrationSettingsMain: SettingsIntegrationSettingsMainViewService,
        private _settingsAccessControlMain: SettingsAccessControlMainViewService,
        private _settingsTranscodingMain: SettingsTranscodingMainViewService,
        private _settingsMetadataMain: SettingsMetadataMainViewService,
        private _settingsMyUserSettingsMain: SettingsMyUserSettingsMainViewService,
        private _settingsAccountInformationMain: SettingsAccountInformationMainViewService,
        private _appLocalization: AppLocalization
    ) {
        this._logger = logger.subLogger('KmcMainViewsService');
    }

    private _getMainViewsList(): KMCAppMenuItem[] {
        return [
            {
                menuTitle: this._appLocalization.get('app.titles.content'),
                isAvailable: true,
                isActiveView: (activePath: string) => (activePath.indexOf(`/content`) !== -1),
                position: 'left',
                children: [
                    {
                        isAvailable: this._contentEntriesMain.isAvailable(),
                        isActiveView:  (path) => this._contentEntriesMain.isActiveView(path),
                        open: () => {
                            this._contentEntriesMain.open();
                        },
                        menuTitle: this._contentEntriesMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._contentModerationMain.isAvailable(),
                        isActiveView:  (path) => this._contentModerationMain.isActiveView(path),
                        open: () => {
                            this._contentModerationMain.open();
                        },
                        menuTitle: this._contentModerationMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._contentPlaylistsMain.isAvailable(),
                        isActiveView:  (path) => this._contentPlaylistsMain.isActiveView(path),
                        open: () => {
                            this._contentPlaylistsMain.open();
                        },
                        menuTitle: this._contentPlaylistsMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._contentSyndicationMain.isAvailable(),
                        isActiveView:  (path) => this._contentSyndicationMain.isActiveView(path),
                        open: () => {
                            this._contentSyndicationMain.open();
                        },
                        menuTitle: this._contentSyndicationMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._contentCategoriesMain.isAvailable(),
                        isActiveView:  (path) => this._contentCategoriesMain.isActiveView(path),
                        open: () => {
                            this._contentCategoriesMain.open();
                        },
                        menuTitle: this._contentCategoriesMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._contentUploadsMain.isAvailable(),
                        isActiveView:  (path) => this._contentUploadsMain.isActiveView(path),
                        open: () => {
                            this._contentUploadsMain.open();
                        },
                        menuTitle: this._contentUploadsMain.getViewMetadata().menu,
                        'position': 'right'
                    },
                    {
                        isAvailable: this._contentBulkUploadsMain.isAvailable(),
                        isActiveView:  (path) => this._contentBulkUploadsMain.isActiveView(path),
                        open: () => {
                            this._contentBulkUploadsMain.open();
                        },
                        menuTitle: this._contentBulkUploadsMain.getViewMetadata().menu,
                        'position': 'right'
                    },
                    {
                        isAvailable: this._contentDropFoldersMain.isAvailable(),
                        isActiveView:  (path) => this._contentDropFoldersMain.isActiveView(path),
                        open: () => {
                            this._contentDropFoldersMain.open();
                        },
                        menuTitle: this._contentDropFoldersMain.getViewMetadata().menu,
                        'position': 'right'
                    }
                ]
            },
            {
                menuTitle: this._appLocalization.get('app.titles.studio'),
                isAvailable: true,
                isActiveView: (activePath: string) => (activePath.indexOf(`/studio`) !== -1),
                position: 'left',
                children: [
                    {
                        isAvailable: this._studioV2Main.isAvailable(),
                        isActiveView:  (path) => this._studioV2Main.isActiveView(path),
                        open: () => {
                            this._studioV2Main.open();
                        },
                        menuTitle: this._studioV2Main.getViewMetadata().menu
                    },
                    {
                        isAvailable: this._studioV3Main.isAvailable(),
                        isActiveView:  (path) => this._studioV3Main.isActiveView(path),
                        open: () => {
                            this._studioV3Main.open();
                        },
                        menuTitle: this._studioV3Main.getViewMetadata().menu
                    },
                ]
            },
            {
                isAvailable: this._usageDashboardMain.isAvailable(),
                isActiveView:  (path) => this._usageDashboardMain.isActiveView(path),
                open: () => {
                    this._usageDashboardMain.open();
                },
                position: 'left',
                menuTitle: this._usageDashboardMain.getViewMetadata().menu,
            },
            {
                isActiveView: (activePath: string) => activePath.indexOf(`/analytics`) !== -1,
                position: 'left',
                isAvailable: this._analyticsMainViewService.isAvailable(),
                menuTitle: this._analyticsMainViewService.getViewMetadata().menu,
                open: () => {
                    this._analyticsMainViewService.open();
                },
                children: !this._analyticsNewMainViewService.isAvailable()
                    ? [
                        {
                            isAvailable: this._liveAnalyticsMain.isAvailable(),
                            isActiveView: (path) => this._liveAnalyticsMain.isActiveView(path),
                            open: () => {
                                this._liveAnalyticsMain.open();
                            },
                            menuTitle: this._liveAnalyticsMain.getViewMetadata().menu
                        }
                    ]
                    : []
            },
            {
                isAvailable: this._servicesDashboardMain.isAvailable(),
                isActiveView:  (path) => this._servicesDashboardMain.isActiveView(path),
                open: () => {
                    this._servicesDashboardMain.open();
                },
                position: 'left',
                menuTitle: this._servicesDashboardMain.getViewMetadata().menu,
            },
            {
                isActiveView: (activePath: string) => activePath.indexOf(`/settings`) !== -1,
                isAvailable: true,
                menuTitle: this._appLocalization.get('app.titles.settings'),
                icon: 'kIcongear',
                position: 'right',
                children: [
                    {
                        isAvailable: this._settingsAccountSettingsMain.isAvailable(),
                        isActiveView:  (path) => this._settingsAccountSettingsMain.isActiveView(path),
                        open: () => {
                            this._settingsAccountSettingsMain.open();
                        },
                        menuTitle: this._settingsAccountSettingsMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._settingsIntegrationSettingsMain.isAvailable(),
                        isActiveView:  (path) => this._settingsIntegrationSettingsMain.isActiveView(path),
                        open: () => {
                            this._settingsIntegrationSettingsMain.open();
                        },
                        menuTitle: this._settingsIntegrationSettingsMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._settingsAccessControlMain.isAvailable(),
                        isActiveView:  (path) => this._settingsAccessControlMain.isActiveView(path),
                        open: () => {
                            this._settingsAccessControlMain.open();
                        },
                        menuTitle: this._settingsAccessControlMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._settingsTranscodingMain.isAvailable(),
                        isActiveView:  (path) => this._settingsTranscodingMain.isActiveView(path),
                        open: () => {
                            this._settingsTranscodingMain.open();
                        },
                        menuTitle: this._settingsTranscodingMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._settingsMetadataMain.isAvailable(),
                        isActiveView:  (path) => this._settingsMetadataMain.isActiveView(path),
                        open: () => {
                            this._settingsMetadataMain.open();
                        },
                        menuTitle: this._settingsMetadataMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._settingsMyUserSettingsMain.isAvailable(),
                        isActiveView:  (path) => this._settingsMyUserSettingsMain.isActiveView(path),
                        open: () => {
                            this._settingsMyUserSettingsMain.open();
                        },
                        menuTitle: this._settingsMyUserSettingsMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._settingsAccountInformationMain.isAvailable(),
                        isActiveView:  (path) => this._settingsAccountInformationMain.isActiveView(path),
                        open: () => {
                            this._settingsAccountInformationMain.open();
                        },
                        menuTitle: this._settingsAccountInformationMain.getViewMetadata().menu,
                        'position': 'left'
                    }
                ]
            }, {
                isActiveView: (activePath: string) => activePath.indexOf(`/administration`) !== -1,
                isAvailable: true,
                menuTitle: this._appLocalization.get('app.titles.administration'),
                icon: 'kIconuser',
                position: 'right',
                children: [
                    {
                        isAvailable: this._adminUsersMain.isAvailable(),
                        isActiveView:  (path) => this._adminUsersMain.isActiveView(path),
                        open: () => {
                            this._adminUsersMain.open();
                        },
                        menuTitle: this._adminUsersMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._adminRolesMain.isAvailable(),
                        isActiveView:  (path) => this._adminRolesMain.isActiveView(path),
                        open: () => {
                            this._adminRolesMain.open();
                        },
                        menuTitle: this._adminRolesMain.getViewMetadata().menu,
                        'position': 'left'
                    },
                    {
                        isAvailable: this._adminMultiAccountMain.isAvailable(),
                        isActiveView:  (path) => this._adminMultiAccountMain.isActiveView(path),
                        open: () => {
                            this._adminMultiAccountMain.open();
                        },
                        menuTitle: this._adminMultiAccountMain.getViewMetadata().menu,
                        'position': 'left'
                    }
                ]
            }
        ];
    }

    getMenu(): KMCAppMenuItem[] {
        return this._cache;
    }


    public rebuildMenu(): void {
        this._logger.info('build app menu');

        const openFirstChild = function(this: KMCAppMenuItem): void {
              if (this.children && this.children.length > 0) {
                  this.children[0].open();
              }
        };

        const processItem = (target: KMCAppMenuItem[], item: KMCAppMenuItem): KMCAppMenuItem[] => {
            if (item.children && item.children.length) {
                item.children = item.children.reduce(processItem, []);
            }
            if (item.isAvailable) {
                const itemHasChildren = item.children && item.children.length > 0;
                const itemIsActionable = !!item.open;
                if (itemHasChildren || itemIsActionable) {
                    if (itemHasChildren) {
                        if (item.open) {
                            this._logger.warn('override menu item open behavior, will select the first available child instead', {
                                titleToken: item.menuTitle,
                                itemHasChildren: !!itemHasChildren,
                                itemIsActionable: !!itemIsActionable
                            });
                        }
                        item.open = openFirstChild.bind(item);
                    }
                    target.push(item);
                } else {
                    this._logger.debug(`remove menu item from app main views list`, {
                        titleToken: item.menuTitle,
                        itemHasChildren: !!itemHasChildren,
                        itemIsActionable: !!itemIsActionable
                    });
                }
            } else {
                this._logger.debug(`remove menu item from app main views list`, {titleToken: item.menuTitle,
                    isAvailable: !!item.isAvailable});
            }

            return target;
        };

        this._cache = this._getMainViewsList().reduce(processItem, []);
    }
}
