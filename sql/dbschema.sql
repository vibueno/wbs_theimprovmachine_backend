DROP TABLE IF EXISTS suggestioncategory CASCADE;
DROP TYPE IF EXISTS contenttype;
CREATE TYPE contenttype AS ENUM ( 'image', 'text' );
DROP TYPE IF EXISTS sourcetype;
CREATE TYPE sourcetype AS ENUM ( 'DB', 'API' );

CREATE TABLE suggestioncategory (
  id SERIAL PRIMARY KEY,
  contenttype contenttype NOT NULL,
  sourcetype sourcetype NOT NULL,
  title VARCHAR(20) UNIQUE NOT NULL,
  description VARCHAR(50) NOT NULL,
  basepath VARCHAR(100)
);

INSERT INTO suggestioncategory (id, sourcetype, contenttype, title, description, basepath)
VALUES
(1, 'DB', 'image', 'object', 'Object pictures from THINGS', null),
(2, 'DB', 'text', 'sms', 'The National University of Singapore SMS Corpus', null),
(3, 'DB', 'image', 'randomimage', 'Random images from Lorem Picsum', 'https://picsum.photos/seed/${seed}/1280/720'),
(4, 'API','image', 'randomimage2', 'Random images from Unsplash', null);

DROP TABLE IF EXISTS suggestion;
CREATE TABLE suggestion (
  id SERIAL PRIMARY KEY,
  suggestioncategoryid INTEGER NOT NULL,
  content JSONB NOT NULL
);

ALTER TABLE suggestion ADD CONSTRAINT fk_suggestion_suggestioncategoryid_suggestioncategory_id FOREIGN KEY (suggestioncategoryid) REFERENCES suggestioncategory (id) ON DELETE NO ACTION;

/* Object pictures */
INSERT INTO suggestion (id, suggestioncategoryid, content) VALUES
(1, 1, '{"text": "aardvark", "url": "https://imgur.com/LAJGlN0.jpg"}'),
(2, 1, '{"text": "abacus", "url": "https://imgur.com/peZeM0l.jpg"}');

/* SMS */
INSERT INTO suggestion (id, suggestioncategoryid, content)
VALUES
(3, 2, '{"text": "She didnt copy it frm me.she download it frm net da..its k u send"}'),
(4, 2, '{"text": "Ya even i didnt get any code frm ma frnds"}');

DROP TABLE IF EXISTS game;
CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(1000),
  minplayers SMALLINT NOT NULL,
  maxplayers SMALLINT NOT NULL,
  url VARCHAR(150)
);

INSERT INTO game (id, title, description, minplayers, maxplayers, url)
VALUES
(1, 'Park bench', 'Park Bench is a classic character exercise. The first player will assume a move, sound and want. She will approach the park bench and sit quietly maintaining character. The next player will create a character and approach the park bench sitting beside the first character. There will be a brief interaction and the first character will find a reason to leave the park bench. This will leave the second player alone until the third player with a new character approaches. And so on and so on.', 2, 30, 'https://www.learnimprov.com/?s=bench'),
(2, 'N-objects monologue', 'The player has to create a monologue based on a number N objects. The objects will be given to him/her randonmly by another member of the group. The objects have to be integrated in the story as quick as possible. Receiving the last object means that the story has to come to an end.', 2, 30, null);

DROP TABLE IF EXISTS gamesuggestion;
CREATE TABLE gamesuggestion (
  gameid INTEGER,
  suggestioncategoryid INTEGER,
  amount SMALLINT NOT NULL
);

ALTER TABLE gamesuggestion ADD CONSTRAINT fk_gamesuggestion_suggestioncategoryid_suggestioncategory_id FOREIGN KEY (suggestioncategoryid) REFERENCES suggestioncategory (id) ON DELETE NO ACTION;

INSERT INTO gamesuggestion (gameid, suggestioncategoryid, amount)
VALUES
(2, 1, 3);
