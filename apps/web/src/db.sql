CREATE TABLE "pogetto_items" (
	"id"	INTEGER,
	"user_id"	TEXT NOT NULL,
	"url"	TEXT NOT NULL UNIQUE,
	"title"	TEXT,
	"description"	TEXT,
	"is_archived"	INTEGER DEFAULT 0,
	"word_count"	INTEGER,
	"domain"	TEXT,
	"favicon"	TEXT,
	"image"	TEXT,
	"published"	TEXT,
	"added_at"	TEXT DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	TEXT DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT)
)

CREATE TABLE "tags" (
	"id"	INTEGER,
	"user_id"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"created_at"	TEXT DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT),
	UNIQUE("user_id","name")
);

CREATE TABLE "pogetto_item_tags" (
	"id"	INTEGER,
	"item_id"	TEXT NOT NULL,
	"tag_id"	TEXT NOT NULL,
	"created_at"	TEXT DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT),
	UNIQUE("item_id","tag_id"),
	FOREIGN KEY("item_id") REFERENCES "pogetto_items"("id"),
	FOREIGN KEY("tag_id") REFERENCES "tags"("id")
);

CREATE TABLE "notes" (
	"id"	INTEGER,
	"item_id"	TEXT NOT NULL,
	"content"	TEXT NOT NULL,
	"created_at"	TEXT DEFAULT CURRENT_TIMESTAMP,
	"updated_at"	TEXT DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("item_id") REFERENCES "pogetto_items"("id")
);