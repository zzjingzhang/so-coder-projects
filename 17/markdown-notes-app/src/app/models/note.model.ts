import { Tag } from './tag.model';

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}