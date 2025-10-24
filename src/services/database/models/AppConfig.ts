import { Model } from '@nozbe/watermelondb';
import { field, date, readonly } from '@nozbe/watermelondb/decorators';
import { GPIConfigResponse } from '../../../types/gpi-config';

export default class AppConfig extends Model {
  static table = 'app_configs';

  @field('config_data') configData!: string;
  @field('version') version!: string;
  @field('is_active') isActive!: boolean;
  @field('last_sync') lastSync?: number;
  
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  // Helper method to get parsed config data
  get parsedConfig(): GPIConfigResponse | null {
    try {
      return JSON.parse(this.configData);
    } catch (error) {
      console.error('Error parsing config data:', error);
      return null;
    }
  }

  // Helper method to set config data
  setConfigData(config: GPIConfigResponse): void {
    this.configData = JSON.stringify(config);
  }
}
