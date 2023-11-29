-- Inserts com dados de teste para o banco de dados

\connect bocadb;

INSERT INTO tags (tag_name, tag_value)
VALUES ('domain', 'basic select');

INSERT INTO tags (tag_name, tag_value)
VALUES ('domain', 'basic join');

INSERT INTO tags (tag_name, tag_value)
VALUES ('domain', 'basic group by');

INSERT INTO tags (tag_name, tag_value)
VALUES ('domain', 'basic having');

INSERT INTO contest_tags (contest_id, tag_id)
VALUES (3, 1);

INSERT INTO contest_tags (contest_id, tag_id)
VALUES (3, 4);