import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users';

  @field('name') name!: string;
  @field('email') email!: string;
  @field('avatar') avatar?: string;
  @field('phone') phone?: string;
  @field('address') address?: string;
  @field('is_active') isActive!: boolean;
  @field('last_sync') lastSync?: number;
  
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
