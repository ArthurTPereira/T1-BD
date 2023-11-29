-- Criação de tables para gerenciar tags
-- Tabela de tags: contém os nomes e valores das tags
-- Tabela de contest_tags: contém as relações entre contest e tags

\connect bocadb;

CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(20) NOT NULL,
    tag_value VARCHAR(20),
    CONSTRAINT unique_tag_name_value UNIQUE (tag_name, tag_value)
);

CREATE TABLE contest_tags (
    contest_id INT,
    tag_id INT,
    FOREIGN KEY (contest_id) REFERENCES contesttable(contestnumber),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
    PRIMARY KEY (contest_id, tag_id)
);


