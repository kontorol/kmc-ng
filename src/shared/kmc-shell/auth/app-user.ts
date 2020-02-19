import { KontorolPartnerAuthenticationType } from "kontorol-ngx-client";

export interface PartnerInfo {
    partnerId: number;
    name: string;
    partnerPackage: PartnerPackageTypes;
    landingPage: string;
    adultContent: boolean;
    publisherEnvironmentType: number;
    authenticationType: KontorolPartnerAuthenticationType;
}

export enum PartnerPackageTypes {
    PartnerPackageFree = 1,
    PartnerPackagePaid = 2,
    PartnerPackageDeveloper = 100
}


export interface AppUser {
    ks: string;
    id: string;
    partnerId: number;
    fullName: string;
    firstName: string;
    lastName: string;
    partnerInfo: PartnerInfo;
    createdAt: Date;
    publishersQuota: number;
}

