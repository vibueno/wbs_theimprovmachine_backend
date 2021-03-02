DROP TABLE IF EXISTS suggestioncategory CASCADE;
CREATE TABLE suggestioncategory (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  contenttype VARCHAR(10) NOT NULL,
  basepath VARCHAR(100)
);

INSERT INTO suggestioncategory (id, title, contenttype, basepath) VALUES (1, 'object', 'image', 'https://imgur.com/');
INSERT INTO suggestioncategory (id, title, contenttype, basepath) VALUES (2, 'sms', 'text', null);

DROP TABLE IF EXISTS suggestion;
CREATE TABLE suggestion (
  id SERIAL PRIMARY KEY,
  suggestioncategoryid INTEGER NOT NULL,
  title VARCHAR(50),
  content VARCHAR(300) NOT NULL
);

ALTER TABLE suggestion ADD CONSTRAINT fk_suggestion_suggestioncategoryid_suggestioncategory_id FOREIGN KEY (suggestioncategoryid) REFERENCES suggestioncategory (id) ON DELETE NO ACTION;

INSERT INTO suggestion (id, suggestioncategoryid, title, content) VALUES (1, 1, 'aardvark', 'LAJGlN0.jpg');
INSERT INTO suggestion (id, suggestioncategoryid, title, content) VALUES (2, 1, 'abacus', 'peZeM0l.jpg');
INSERT INTO suggestion (id, suggestioncategoryid, title, content) VALUES (3, 2, null, 'She didnt copy it frm me.she download it frm net da..its k u send');
INSERT INTO suggestion (id, suggestioncategoryid, title, content) VALUES (4, 2, null, 'Ya even i didnt get any code frm ma frnds');

DROP TABLE IF EXISTS game;
CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(1000),
  minplayers SMALLINT NOT NULL,
  maxplayers SMALLINT NOT NULL,
  url VARCHAR(150)
);

INSERT INTO game (id, title, description, minplayers, maxplayers, url) VALUES (1, 'Park bench', 'Park Bench is a classic character exercise. The first player will assume a move, sound and want. She will approach the park bench and sit quietly maintaining character. The next player will create a character and approach the park bench sitting beside the first character. There will be a brief interaction and the first character will find a reason to leave the park bench. This will leave the second player alone until the third player with a new character approaches. And so on and so on.', 2, 30, 'https://www.learnimprov.com/?s=bench');

INSERT INTO game (id, title, description, minplayers, maxplayers, url) VALUES (2, 'N-objects monologue', 'The player has to create a monologue based on a number N objects. The objects will be given to him/her randonmly by another member of the group. The objects have to be integrated in the story as quick as possible. Receiving the last object means that the story has to come to an end.', 2, 30, null);

DROP TABLE IF EXISTS gamesuggestion;
CREATE TABLE gamesuggestion (
  gameid INTEGER,
  suggestioncategoryid INTEGER,
  amount SMALLINT NOT NULL
);

ALTER TABLE gamesuggestion ADD CONSTRAINT fk_gamesuggestion_suggestioncategoryid_suggestioncategory_id FOREIGN KEY (suggestioncategoryid) REFERENCES suggestioncategory (id) ON DELETE NO ACTION;

INSERT INTO gamesuggestion (gameid, suggestioncategoryid, amount) VALUES (2, 1, 3);
