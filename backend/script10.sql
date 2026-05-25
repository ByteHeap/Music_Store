/*#############################################################*/
/* PARTEA 1 - STERGEREA SI RECREAREA BAZEi DE DATE             */
SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS music_store;
CREATE DATABASE music_store;
USE music_store;
SET FOREIGN_KEY_CHECKS = 1;
/*#############################################################*/

/*#############################################################*/
/* PARTEA 2 - CREAREA TABELELOR                                */

CREATE TABLE tblCategorii (
                              idCategorie INT AUTO_INCREMENT PRIMARY KEY,
                              numeCategorie VARCHAR(100) NOT NULL UNIQUE,
                              descriereCategorie VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE tblArtisti (
                            idArtist INT AUTO_INCREMENT PRIMARY KEY,
                            numeArtist VARCHAR(150) NOT NULL,
                            taraOrigine VARCHAR(50) DEFAULT 'Necunoscuta',
                            anActivitate INT
) ENGINE=InnoDB;

CREATE TABLE tblBranduri (
                             idBrand INT AUTO_INCREMENT PRIMARY KEY,
                             numeBrand VARCHAR(150) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE tblProduse (
                            idProdus INT AUTO_INCREMENT PRIMARY KEY,
                            numeProdus VARCHAR(200) NOT NULL,
                            pretProdus DECIMAL(10, 2) NOT NULL CHECK (pretProdus > 0),
                            stocProdus INT DEFAULT 0,
                            codCategorie INT NOT NULL,
                            codArtist INT NULL,
                            codBrand INT NULL,
                            imagineProdus VARCHAR(500) DEFAULT 'https://images.unsplash.com/photo-1470229722913-7c090b3320b3?q=80&w=800&auto=format&fit=crop',
                            descriereProdus TEXT,
                            specificatii JSON,
                            galerie JSON,
                            CONSTRAINT fk_categorie FOREIGN KEY (codCategorie) REFERENCES tblCategorii(idCategorie) ON UPDATE CASCADE ON DELETE RESTRICT,
                            CONSTRAINT fk_artist FOREIGN KEY (codArtist) REFERENCES tblArtisti(idArtist) ON UPDATE CASCADE ON DELETE SET NULL,
                            CONSTRAINT fk_brand FOREIGN KEY (codBrand) REFERENCES tblBranduri(idBrand) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE tblUtilizatori (
                                idUtilizator INT AUTO_INCREMENT PRIMARY KEY,
                                numeComplet VARCHAR(100) NOT NULL,
                                email VARCHAR(100) UNIQUE NOT NULL,
                                parola VARCHAR(255) NOT NULL,
                                rol ENUM('user', 'admin') DEFAULT 'user',
                                telefon VARCHAR(20) NULL,
                                adresa VARCHAR(30) NULL,
                                dataCreare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE tblComenzi (
                            idComanda INT AUTO_INCREMENT PRIMARY KEY,
                            dataComanda DATETIME DEFAULT CURRENT_TIMESTAMP,
                            statusComanda ENUM('Noua', 'Procesata', 'Livrata', 'Anulata') DEFAULT 'Noua',
                            totalPlata DECIMAL(10, 2) NOT NULL,
                            codUtilizator INT,
                            CONSTRAINT fk_utilizator_comanda FOREIGN KEY (codUtilizator) REFERENCES tblUtilizatori(idUtilizator) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE tblDetaliiComenzi (
                                   codComanda INT,
                                   codProdus INT,
                                   cantitate INT NOT NULL CHECK (cantitate > 0),
                                   pretLaVanzare DECIMAL(10, 2) NOT NULL,
                                   PRIMARY KEY (codComanda, codProdus),
                                   CONSTRAINT fk_comanda FOREIGN KEY (codComanda) REFERENCES tblComenzi(idComanda) ON DELETE CASCADE ON UPDATE CASCADE,
                                   CONSTRAINT fk_produs_comanda FOREIGN KEY (codProdus) REFERENCES tblProduse(idProdus) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE tblCos (
                        codUtilizator INT,
                        codProdus INT,
                        cantitate INT NOT NULL CHECK (cantitate > 0),
                        PRIMARY KEY (codUtilizator, codProdus),
                        CONSTRAINT fk_cos_utilizator FOREIGN KEY (codUtilizator) REFERENCES tblUtilizatori(idUtilizator) ON DELETE CASCADE ON UPDATE CASCADE,
                        CONSTRAINT fk_cos_produs FOREIGN KEY (codProdus) REFERENCES tblProduse(idProdus) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
/*#############################################################*/

/*#############################################################*/
/* PARTEA 3 - INSERAREA INREGISTRARILOR                        */

-- Inserare Categorii
INSERT INTO tblCategorii (numeCategorie, descriereCategorie) VALUES
                                                                 ('Rock Vinil', 'Discuri clasice rock'),
                                                                 ('Jazz CD', 'Colectii jazz premium'),
                                                                 ('Chitare', 'Instrumente cu corzi'),
                                                                 ('Sintetizatoare', 'Echipament electronic'),
                                                                 ('Tobe', 'Seturi percutie'),
                                                                 ('Casti', 'Audio studio'),
                                                                 ('Boxe', 'Sisteme monitorizare'),
                                                                 ('Accesorii', 'Cabluri si pene'),
                                                                 ('Interfete', 'Placi de sunet'),
                                                                 ('Techno Vinil', 'Muzica electronica'),
                                                                 ('Microfoane', 'Echipamente pentru inregistrare voce si instrumente'),
                                                                 ('Piane Digitale', 'Instrumente cu clape si senzori de presiune'),
                                                                 ('Muzica Clasica', 'Albume de compozitori celebri pe suport CD'),
                                                                 ('Software Audio', 'Licente pentru programe de productie muzicala'),
                                                                 ('Iluminat Scena', 'Reflectoare si sisteme de lumini pentru evenimente');

-- Inserare Artisti
INSERT INTO tblArtisti (numeArtist, taraOrigine, anActivitate) VALUES
                                                                   ('Pink Floyd', 'UK', 1965),
                                                                   ('Daft Punk', 'Franta', 1993),
                                                                   ('Miles Davis', 'SUA', 1944),
                                                                   ('Subcarpati', 'Romania', 2010),
                                                                   ('Phoenix', 'Romania', 1962),
                                                                   ('Kraftwerk', 'Germania', 1970),
                                                                   ('Arctic Monkeys', 'UK', 2002),
                                                                   ('Led Zeppelin', 'UK', 1968),
                                                                   ('Tame Impala', 'Australia', 2007),
                                                                   ('Aphex Twin', 'Irlanda', 1985),
                                                                   ('The Beatles', 'UK', 1960),
                                                                   ('Hans Zimmer', 'Germania', 1977),
                                                                   ('Enescu', 'Romania', 1890),
                                                                   ('Billie Eilish', 'SUA', 2015),
                                                                   ('Vivaldi', 'Italia', 1678);

-- Inserare Branduri
INSERT INTO tblBranduri (numeBrand) VALUES ('Yamaha'), ('Audio Technica'), ('Focusrite'), ('Fender'),
                                           ('Orange'), ('Roland'), ('Shure');

-- Inserare Produse
INSERT INTO tblProduse (numeProdus, pretProdus, stocProdus, codCategorie, codArtist, codBrand) VALUES
                                                                                                   ('Dark Side LP', 150.50, 10, 1, 1, NULL),
                                                                                                   ('Discovery CD', 85.00, 20, 10, 2, NULL),
                                                                                                   ('Fender Strat', 4200.00, 3, 3, NULL, 4),
                                                                                                   ('Moog One', 9500.00, 1, 4, NULL, 7),
                                                                                                   ('Kind of Blue', 120.00, 5, 2, 3, NULL),
                                                                                                   ('Satele Unite', 140.00, 15, 1, 4, NULL),
                                                                                                   ('Casti M50x', 650.00, 25, 6, NULL, 2),
                                                                                                   ('Yamaha HS5', 1800.00, 4, 7, NULL, 1),
                                                                                                   ('Scarlett 2i2', 750.00, 12, 9, NULL, 3),
                                                                                                   ('Muguri de Fluier', 130.00, 8, 1, 5, NULL),
                                                                                                   ('Shure SM58', 550.00, 15, 11, NULL, 7),
                                                                                                   ('Abbey Road LP', 190.00, 12, 1, 11, NULL),
                                                                                                   ('Roland FP-30', 3200.00, 5, 12, NULL, 6),
                                                                                                   ('Interstellar OST', 145.00, 7, 2, 12, NULL),
                                                                                                   ('Poema Romana CD', 65.00, 10, 13, 13, NULL),
                                                                                                   ('Ableton Live 12', 2100.00, 100, 14, NULL, NULL),
                                                                                                   ('ATH Led Par 64', 450.00, 20, 15, NULL, 2),
                                                                                                   ('Hit Me Hard LP', 185.00, 25, 10, 14, NULL),
                                                                                                   ('The Four Seasons', 95.00, 8, 13, 15, NULL),
                                                                                                   ('Sgt. Pepper LP', 210.00, 10, 1, 11, NULL);

-- Inserare Utilizatori
INSERT INTO tblUtilizatori (idUtilizator, numeComplet, email, parola, rol, telefon) VALUES
                                                                                        (1, 'Ion Popescu', 'ion@db.ro', 'user123', 'user', '0722111222'),
                                                                                        (2, 'Ana Radu', 'ana@db.ro', 'user123', 'user', NULL),
                                                                                        (3, 'Dan Marin', 'dan@db.ro', 'user123', 'user', '0733444555'),
                                                                                        (4, 'Mihai E.', 'mihai@db.ro', 'user123', 'user', NULL),
                                                                                        (5, 'Elena P.', 'elena@db.ro', 'user123', 'user', '0744555666'),
                                                                                        (6, 'Cristi S.', 'cristi@db.ro', 'user123', 'user', NULL),
                                                                                        (7, 'Laura V.', 'laura@db.ro', 'user123', 'user', '0755666777'),
                                                                                        (8, 'George I.', 'george@db.ro', 'user123', 'user', NULL),
                                                                                        (9, 'Andreea B.', 'andreea@db.ro', 'user123', 'user', '0766777888'),
                                                                                        (10, 'Robert T.', 'robert@db.ro', 'user123', 'user', NULL),
                                                                                        (11, 'Andrei Nistor', 'andrei.n@mail.ro', 'user123', 'user', '0788123456'),
                                                                                        (12, 'Simona Halep', 'simona@tennis.ro', 'user123', 'user', NULL),
                                                                                        (13, 'Marius Lacatus', 'marius.l@sport.ro', 'user123', 'user', '0799000111'),
                                                                                        (14, 'Adina Pop', 'adina.pop@design.it', 'user123', 'user', '0721222333'),
                                                                                        (15, 'Victor Rebengiuc', 'victor.r@teatru.ro', 'user123', 'user', NULL),
                                                                                        (16, 'Zeedo Admin', 'admin@zeedoshop.com', 'admin123', 'admin', NULL);

-- Inserare Comenzi (Foloseste codUtilizator)
INSERT INTO tblComenzi (codUtilizator, totalPlata, statusComanda) VALUES
                                                                      (1, 235.50, 'Livrata'), (2, 4200.00, 'Procesata'), (3, 9500.00, 'Noua'),
                                                                      (4, 140.00, 'Livrata'), (5, 650.00, 'Anulata'), (1, 120.00, 'Procesata'),
                                                                      (7, 1800.00, 'Livrata'), (8, 750.00, 'Noua'), (9, 130.00, 'Procesata'),
                                                                      (10, 85.00, 'Livrata'), (11, 740.00, 'Noua'), (12, 3200.00, 'Procesata'),
                                                                      (13, 1100.00, 'Livrata'), (14, 2100.00, 'Noua'), (1, 375.00, 'Procesata');

-- Inserare Detalii Comenzi
INSERT INTO tblDetaliiComenzi (codComanda, codProdus, cantitate, pretLaVanzare) VALUES
                                                                                    (1, 1, 1, 150.50), (1, 2, 1, 85.00),
                                                                                    (2, 3, 1, 4200.00),
                                                                                    (3, 4, 1, 9500.00),
                                                                                    (4, 6, 1, 140.00),
                                                                                    (5, 7, 1, 650.00),
                                                                                    (6, 5, 1, 120.00),
                                                                                    (7, 8, 1, 1800.00),
                                                                                    (8, 9, 1, 750.00),
                                                                                    (9, 10, 1, 130.00),
                                                                                    (11, 11, 1, 550.00), (11, 12, 1, 190.00),
                                                                                    (12, 13, 1, 3200.00),
                                                                                    (13, 11, 2, 550.00),
                                                                                    (14, 16, 1, 2100.00),
                                                                                    (15, 12, 1, 190.00),
                                                                                    (15, 18, 1, 185.00);
/*#############################################################*/

/*#############################################################*/

DESCRIBE tblCategorii;
DESCRIBE tblArtisti;
DESCRIBE tblProduse;
DESCRIBE tblComenzi;
DESCRIBE tblDetaliiComenzi;
DESCRIBE tblUtilizatori;
DESCRIBE tblBranduri;
SELECT * FROM tblCategorii;
SELECT * FROM tblArtisti;
SELECT * FROM tblProduse;
SELECT * FROM tblComenzi;
SELECT * FROM tblDetaliiComenzi;
SELECT * FROM tblUtilizatori;
SELECT * FROM tblBranduri;