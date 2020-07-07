CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
);

CREATE TABLE Vehicle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    ownerId INTEGER REFERENCES Person(id)
);

INSERT INTO Person (name, email) values ('trang', 'thutrang.kbc@gmail.com');
INSERT INTO Person (name, email) values ('mitsuki', 'babymitsuki@gmail.com');

INSERT INTO Vehicle (brand, model, ownerId) values ('audi', 'RB', 1);
INSERT INTO Vehicle (brand, model, ownerId) values ('mercedes', 'XV', 2);
INSERT INTO Vehicle (brand, model, ownerId) values ('bmw', 'V2', 1);


-- Down
DROP TABLE Person;
DROP TABLE Vehicle;