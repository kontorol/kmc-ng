import { KontorolMediaEntryFilterForPlaylist } from 'kontorol-ngx-client';
import { KontorolPlayableEntryOrderBy } from 'kontorol-ngx-client';

export interface PlaylistRule {
  selectionId?: string;
  name: string;
  entriesCount: number;
  entriesDuration: number;
  orderBy: KontorolPlayableEntryOrderBy;
  limit: number;
  originalFilter: KontorolMediaEntryFilterForPlaylist
}
