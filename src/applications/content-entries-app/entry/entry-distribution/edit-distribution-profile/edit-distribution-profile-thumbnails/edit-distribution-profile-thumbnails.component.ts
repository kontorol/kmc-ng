import { Component, Input } from '@angular/core';
import { ExtendedKontorolDistributionThumbDimensions } from '../edit-distribution-profile.component';

@Component({
  selector: 'kEditDistributionProfileThumbnails',
  templateUrl: './edit-distribution-profile-thumbnails.component.html',
  styleUrls: ['./edit-distribution-profile-thumbnails.component.scss']
})
export class EditDistributionProfileThumbnailsComponent {
  @Input() requiredThumbnails: ExtendedKontorolDistributionThumbDimensions[] | null = [];
}

