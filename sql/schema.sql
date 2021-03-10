DROP TABLE IF EXISTS suggestioncategory CASCADE;
DROP TYPE IF EXISTS contenttype;
CREATE TYPE contenttype AS ENUM ( 'image', 'text' );
DROP TYPE IF EXISTS sourcetype;
CREATE TYPE sourcetype AS ENUM ( 'DB', 'API' );

CREATE TABLE suggestioncategory (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE NOT NULL,
  contenttype contenttype NOT NULL,
  sourcetype sourcetype NOT NULL,
  title VARCHAR(20) NOT NULL,
  description VARCHAR(50) NOT NULL,
  basepath VARCHAR(100),
  jsonpaths JSONB,
  apikey VARCHAR(100)
);

DROP TABLE IF EXISTS suggestion;
CREATE TABLE suggestion (
  id SERIAL PRIMARY KEY,
  suggestioncategoryid INTEGER NOT NULL,
  content JSONB NOT NULL
);

ALTER TABLE suggestion ADD CONSTRAINT fk_suggestion_suggestioncategoryid_suggestioncategory_id FOREIGN KEY (suggestioncategoryid) REFERENCES suggestioncategory (id) ON DELETE NO ACTION;

DROP TABLE IF EXISTS game;
CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(1000),
  minplayers SMALLINT NOT NULL,
  maxplayers SMALLINT NOT NULL,
  url VARCHAR(150)
);

DROP TABLE IF EXISTS gamesuggestion;
CREATE TABLE gamesuggestion (
  gameid INTEGER,
  suggestioncategoryid INTEGER,
  amount SMALLINT NOT NULL
);

ALTER TABLE gamesuggestion ADD CONSTRAINT fk_gamesuggestion_suggestioncategoryid_suggestioncategory_id FOREIGN KEY (suggestioncategoryid) REFERENCES suggestioncategory (id) ON DELETE NO ACTION;
