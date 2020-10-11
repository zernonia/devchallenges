export interface ImageType {
  _id: string,
  public_id: string,
  url: string,
  created_at: Date,
  label: string,
}

export interface Files {
  file: File;
  progress: number;
  result: string | ArrayBuffer | null;
  url: string;
}