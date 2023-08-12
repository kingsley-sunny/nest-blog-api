export interface FetchQuery {
  search?: string;
  limit?: number;
  startDate?: string | Date;
  endDate?: string | Date;
  endDateCol?: string;
  filterBy?: string;
  page?: number;
}

export interface IBase {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
}
