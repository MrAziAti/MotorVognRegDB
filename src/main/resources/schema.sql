CREATE TABLE Motorvogn(
    id INTEGER AUTO_INCREMENT NOT NULL,
    personnr VARCHAR (255) NOT NULL,
    navn VARCHAR (255) NOT NULL,
    adresse VARCHAR (255) NOT NULL,
    kjennetegn VARCHAR (255) NOT NULL,
    merke VARCHAR (255) NOT NULL,
    type VARCHAR (255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Biler(

    merke VARCHAR (255) NOT NULL,
    type VARCHAR (255) NOT NULL
);

CREATE TABLE Bruker (
    id INTEGER AUTO_INCREMENT NOT NULL,
    brukernavn varchar(255) NOT NULL,
    passord VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);