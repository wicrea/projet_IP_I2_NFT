-- Tablespace: pg_default

-- DROP TABLESPACE IF EXISTS pg_default;

ALTER TABLESPACE pg_default
  OWNER TO postgres;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    last_login TIMESTAMP,
    consent_rgpd BOOLEAN DEFAULT FALSE,
    consent_date TIMESTAMP
);


CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    storage_url TEXT NOT NULL,
    format VARCHAR(20),
    capture_date TIMESTAMP,
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    width INT,
    height INT,
    size_mb NUMERIC(8,2),
    imported_at TIMESTAMP DEFAULT NOW(),
    is_duplicate BOOLEAN DEFAULT FALSE,
	brightness_score NUMERIC(5,2),
	sharpness_score NUMERIC(5,2),
	global_score NUMERIC(5,2),
	is_blurry BOOLEAN DEFAULT FALSE, 
	is_dark BOOLEAN DEFAULT FALSE,
	detected_place TEXT, 
	monument_name TEXT, 
	detected_scene TEXT
);

CREATE TABLE detected_objects (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
object_name VARCHAR(255), confidence_score NUMERIC(5,2) );

CREATE TABLE object_photos (
objects_id UUID REFERENCES detected_objects(id) ON DELETE CASCADE, 
photo_id UUID REFERENCES photos(id) ON DELETE CASCADE,
added_at TIMESTAMP DEFAULT NOW(), PRIMARY KEY (objects_id, photo_id) );

CREATE TABLE albums ( 
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
title VARCHAR(255) NOT NULL, description TEXT,
is_auto_generated BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT NOW() );

CREATE TABLE album_photos (
album_id UUID REFERENCES albums(id) ON DELETE CASCADE, 
photo_id UUID REFERENCES photos(id) ON DELETE CASCADE,
added_at TIMESTAMP DEFAULT NOW(), PRIMARY KEY (album_id, photo_id) );

CREATE TABLE tags ( 
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
label VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT NOW() );

CREATE TABLE photo_tags (
    photo_id UUID REFERENCES photos(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,

    PRIMARY KEY (photo_id, tag_id)
);


CREATE TABLE generated_videos ( 
id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
user_id UUID REFERENCES users(id) ON DELETE CASCADE, 
title VARCHAR(255), 
video_url TEXT, music_name TEXT,
narration_enabled BOOLEAN DEFAULT FALSE);


CREATE TABLE album_tags ( 
album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
tag_id UUID REFERENCES tags(id) ON DELETE CASCADE, 
PRIMARY KEY (album_id, tag_id) );

CREATE INDEX idx_photos_place ON photos(detected_place); 
CREATE INDEX idx_photos_scene ON photos(detected_scene); 
CREATE INDEX idx_album_user ON albums(user_id);
CREATE INDEX idx_album_photos_photo ON album_photos(photo_id); 
CREATE INDEX idx_photo_tags_photo ON photo_tags(photo_id);
CREATE INDEX idx_album_tags_album ON album_tags(album_id);