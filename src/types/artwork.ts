export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number | null;
  date_end: number | null;
}

export interface ArtworkApiResponse {
  data: Artwork[];
  pagination: {
    current_page: number;
    limit: number;
    next_page: number | null;
    offset: number;
    total: number;
    total_pages: number;
  };
}

export interface SelectionState {
  [page: number]: {
    [id: number]: boolean;
  };
}
