import { Injectable } from '@angular/core';
import { ReachProfileWidget } from '../reach-profile-widget';
import { KontorolLogger } from '@kontorol-ng/kontorol-logger';
import { SettingsReachProfileViewSections } from "app-shared/kmc-shared/kmc-views/details-views";
import { Observable } from "rxjs";
import { KontorolCatalogItemLanguage, KontorolDictionary, KontorolMultiRequest, KontorolReachProfile } from "kontorol-ngx-client";

export interface Dictionary extends KontorolDictionary {
    words?: string[];
    isValid?: boolean;
    usedCharacters?: number;
}

@Injectable()
export class ReachProfileDictionaryWidget extends ReachProfileWidget {
    
    public _languages: { label: string, value: string }[] = [];
    public _dictionaries: Dictionary[] = [];
    public _maxCharacters = 4000;
    
    constructor(logger: KontorolLogger) {
        super(SettingsReachProfileViewSections.Dictionary, logger);
    }
    
    /**
     * Do some cleanups if needed once the section is removed
     */
    protected onReset(): void {
    
    }
    
    protected onActivate(firstTimeActivating: boolean): Observable<{ failed: boolean }> | void {
        // set Languages dropdown options
        this._languages = [];
        Object.keys(KontorolCatalogItemLanguage).forEach(key => {
            this._languages.push({label: KontorolCatalogItemLanguage[key], value: KontorolCatalogItemLanguage[key]});
        });
        
        // set dictionaries (clone objects)
        this._dictionaries = [];
        this.data.dictionaries.forEach((dictionary: KontorolDictionary) => {
            this._dictionaries.push(Object.assign({
                words: dictionary.data.split(String.fromCharCode(10)),
                usedCharacters: dictionary.data.split(String.fromCharCode(10)).join('').length,
                isValid: true
            }, dictionary));
        })
    }
    
    private validate(): boolean {
        let valid = true;
        this._dictionaries.forEach(dictionary => {
            if (!dictionary.isValid) {
                valid = false;
            }
        });
        return valid;
    }
    
    protected onValidate(wasActivated: boolean): Observable<{ isValid: boolean }> {
        return Observable.of({
            isValid: this.validate()
        });
    }
    
    protected onDataSaving(newData: KontorolReachProfile, request: KontorolMultiRequest): void {
        newData.dictionaries = [];
        this._dictionaries.forEach((dictionary: Dictionary) => {
            if (dictionary.words.length) {
                newData.dictionaries.push(new KontorolDictionary({
                    language: dictionary.language,
                    data: dictionary.words.join(String.fromCharCode(10))
                }));
            }
        });
    }
    
    public _onDataChange(index, data: string[] = null): void {
        if (data) {
            const numberOfCharacters = data.join('').length;
            this._dictionaries[index].usedCharacters = numberOfCharacters;
            this._dictionaries[index].isValid = numberOfCharacters <= this._maxCharacters;
        }
        super.updateState({
            isValid: data ? data.join('').length <= this._maxCharacters : true,
            isDirty: true
        });
    }
    
    public _addDictionary(): void {
        this._dictionaries.unshift({
            language: KontorolCatalogItemLanguage.en,
            data: '',
            words: [],
            isValid: true,
            usedCharacters: 0
        } as Dictionary);
    }
    
    public _deleteDictionary(index): void{
        this._dictionaries.splice(index, 1);
        super.updateState({
            isValid: this.validate(),
            isDirty: true
        });
    }
}
