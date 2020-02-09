import { Menu, TieredMenu } from 'primeng/primeng';
export declare class MenuCloseOnScroll {
    private _menu;
    constructor(menu: Menu, tieredMenu: TieredMenu);
    onWindowScroll(): void;
    private closeMenu;
}
