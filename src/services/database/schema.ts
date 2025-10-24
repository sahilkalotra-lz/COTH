import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string', isIndexed: true },
        { name: 'avatar', type: 'string', isOptional: true },
        { name: 'phone', type: 'string', isOptional: true },
        { name: 'address', type: 'string', isOptional: true },
        { name: 'is_active', type: 'boolean' },
        { name: 'last_sync', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'app_configs',
      columns: [
        { name: 'config_data', type: 'string' }, // JSON string of GPI config
        { name: 'version', type: 'string' },
        { name: 'is_active', type: 'boolean' },
        { name: 'last_sync', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'articles',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'excerpt', type: 'string', isOptional: true },
        { name: 'author', type: 'string', isOptional: true },
        { name: 'category', type: 'string', isOptional: true },
        { name: 'tags', type: 'string', isOptional: true }, // JSON array
        { name: 'featured_image', type: 'string', isOptional: true },
        { name: 'is_published', type: 'boolean' },
        { name: 'is_favorite', type: 'boolean' },
        { name: 'external_id', type: 'string', isIndexed: true },
        { name: 'last_sync', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
