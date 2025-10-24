import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export default class Article extends Model {
  static table = 'articles';

  @field('title') title!: string;
  @field('content') content!: string;
  @field('excerpt') excerpt?: string;
  @field('author') author?: string;
  @field('category') category?: string;
  @field('tags') tags?: string; // JSON array as string
  @field('featured_image') featuredImage?: string;
  @field('is_published') isPublished!: boolean;
  @field('is_favorite') isFavorite!: boolean;
  @field('external_id') externalId!: string;
  @field('last_sync') lastSync?: number;
  
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  // Helper method to get parsed tags
  get parsedTags(): string[] {
    try {
      return this.tags ? JSON.parse(this.tags) : [];
    } catch (error) {
      console.error('Error parsing tags:', error);
      return [];
    }
  }

  // Helper method to set tags
  setTags(tags: string[]): void {
    this.tags = JSON.stringify(tags);
  }
}
