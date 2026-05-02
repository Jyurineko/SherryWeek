import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_version_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`link\` text,
  	\`new_tab\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_header_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_header_v_version_nav_items_order_idx\` ON \`_header_v_version_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_version_nav_items_parent_id_idx\` ON \`_header_v_version_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_version_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	\`icon_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_header_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_header_v_version_social_links_order_idx\` ON \`_header_v_version_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_version_social_links_parent_id_idx\` ON \`_header_v_version_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_version_social_links_icon_idx\` ON \`_header_v_version_social_links\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_logo_id\` integer,
  	\`version_site_title\` text DEFAULT '赛博莉莉丝',
  	\`version_tagline\` text DEFAULT '探索技术，分享生活',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_header_v_version_version_logo_idx\` ON \`_header_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_version_version__status_idx\` ON \`_header_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_created_at_idx\` ON \`_header_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_updated_at_idx\` ON \`_header_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_latest_idx\` ON \`_header_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_links_order_idx\` ON \`_footer_v_version_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_links_parent_id_idx\` ON \`_footer_v_version_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_copyright\` text DEFAULT '© 2026 赛博莉莉丝. All rights reserved.',
  	\`version_icp\` text,
  	\`version_show_powered_by\` integer DEFAULT true,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_version__status_idx\` ON \`_footer_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_created_at_idx\` ON \`_footer_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_updated_at_idx\` ON \`_footer_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_latest_idx\` ON \`_footer_v\` (\`latest\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`link\` text,
  	\`new_tab\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_nav_items\`("_order", "_parent_id", "id", "label", "link", "new_tab") SELECT "_order", "_parent_id", "id", "label", "link", "new_tab" FROM \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_nav_items\` RENAME TO \`header_nav_items\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text,
  	\`url\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_social_links\`("_order", "_parent_id", "id", "platform", "url", "icon_id") SELECT "_order", "_parent_id", "id", "platform", "url", "icon_id" FROM \`header_social_links\`;`)
  await db.run(sql`DROP TABLE \`header_social_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_social_links\` RENAME TO \`header_social_links\`;`)
  await db.run(sql`CREATE INDEX \`header_social_links_order_idx\` ON \`header_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_social_links_parent_id_idx\` ON \`header_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_social_links_icon_idx\` ON \`header_social_links\` (\`icon_id\`);`)
  await db.run(sql`ALTER TABLE \`header\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`header__status_idx\` ON \`header\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_footer_links\`("_order", "_parent_id", "id", "label", "url") SELECT "_order", "_parent_id", "id", "label", "url" FROM \`footer_links\`;`)
  await db.run(sql`DROP TABLE \`footer_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_footer_links\` RENAME TO \`footer_links\`;`)
  await db.run(sql`CREATE INDEX \`footer_links_order_idx\` ON \`footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_links_parent_id_idx\` ON \`footer_links\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`enable_a_p_i_key\` integer;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`api_key\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`api_key_index\` text;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`footer__status_idx\` ON \`footer\` (\`_status\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`_header_v_version_nav_items\`;`)
  await db.run(sql`DROP TABLE \`_header_v_version_social_links\`;`)
  await db.run(sql`DROP TABLE \`_header_v\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_links\`;`)
  await db.run(sql`DROP TABLE \`_footer_v\`;`)
  await db.run(sql`DROP INDEX \`header__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`header\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`footer__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`_status\`;`)
  await db.run(sql`CREATE TABLE \`__new_header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link\` text NOT NULL,
  	\`new_tab\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_nav_items\`("_order", "_parent_id", "id", "label", "link", "new_tab") SELECT "_order", "_parent_id", "id", "label", "link", "new_tab" FROM \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_nav_items\` RENAME TO \`header_nav_items\`;`)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_social_links\`("_order", "_parent_id", "id", "platform", "url", "icon_id") SELECT "_order", "_parent_id", "id", "platform", "url", "icon_id" FROM \`header_social_links\`;`)
  await db.run(sql`DROP TABLE \`header_social_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_social_links\` RENAME TO \`header_social_links\`;`)
  await db.run(sql`CREATE INDEX \`header_social_links_order_idx\` ON \`header_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_social_links_parent_id_idx\` ON \`header_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_social_links_icon_idx\` ON \`header_social_links\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_footer_links\`("_order", "_parent_id", "id", "label", "url") SELECT "_order", "_parent_id", "id", "label", "url" FROM \`footer_links\`;`)
  await db.run(sql`DROP TABLE \`footer_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_footer_links\` RENAME TO \`footer_links\`;`)
  await db.run(sql`CREATE INDEX \`footer_links_order_idx\` ON \`footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_links_parent_id_idx\` ON \`footer_links\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`enable_a_p_i_key\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`api_key\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`api_key_index\`;`)
}
