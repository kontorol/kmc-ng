import {NgModule} from '@angular/core';
import {Calendar} from "./calendar/calendar";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";

@NgModule({
    imports: [
        CommonModule,
        ButtonModule
    ],
    declarations: [
        Calendar
    ],
    exports: [
        Calendar
    ]
})

export class KCommonModule {
}
