const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// 1. Vite connection
app.use(cors({ origin: '*' }));

// 2. JSON Parser
app.use(express.json());

// 3. Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'music_store'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database!');
});

// 4. API Routes

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'andreiclashroyale7@gmail.com',
        pass: 'olaf xfhu vaym aajz'
    }
});

// GET: Autocomplete
app.get('/api/products/search', (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        return res.json([]);
    }

    const sql = `
        SELECT p.idProdus as id, p.numeProdus as name, p.pretProdus as price, p.imagineProdus as image, c.numeCategorie as category
        FROM tblProduse p
        LEFT JOIN tblCategorii c ON p.codCategorie = c.idCategorie
        WHERE p.numeProdus LIKE ? OR p.descriereProdus LIKE ?
        LIMIT 5
    `;

    const searchPattern = `%${searchQuery}%`;

    db.query(sql, [searchPattern, searchPattern], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET: All products
app.get('/api/products', (req, res) => {
    const query = `
        SELECT p.*, c.numeCategorie, a.numeArtist, b.numeBrand
        FROM tblProduse p
                 LEFT JOIN tblCategorii c ON p.codCategorie = c.idCategorie
                 LEFT JOIN tblArtisti a ON p.codArtist = a.idArtist
                 LEFT JOIN tblBranduri b ON p.codBrand = b.idBrand
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const products = results.map(row => ({
            id: row.idProdus,
            name: row.numeProdus,
            price: row.pretProdus,
            currency: 'RON',
            image: row.imagineProdus || 'https://via.placeholder.com/300',
            category: row.numeCategorie || 'Uncategorized',
            brand: row.numeBrand || row.numeArtist || 'Generic',
            brandId: row.codBrand,
            codCategorie: row.codCategorie,
            codArtist: row.codArtist,
            codBrand: row.codBrand,
            description: row.descriereProdus || 'No description available.',
            specs: typeof row.specificatii === 'string'
                ? JSON.parse(row.specificatii)
                : (row.specificatii || {}),
            gallery: typeof row.galerie === 'string'
                ? JSON.parse(row.galerie)
                : (row.galerie || [])
        }));
        res.json(products);
    });
});

// GET - Product from id
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
        return res.status(400).json({ message: 'ID produs invalid' });
    }

    const query = `
        SELECT p.*, c.numeCategorie, a.numeArtist, b.numeBrand
        FROM tblProduse p
                 LEFT JOIN tblCategorii c ON p.codCategorie = c.idCategorie
                 LEFT JOIN tblArtisti a ON p.codArtist = a.idArtist
                 LEFT JOIN tblBranduri b ON p.codBrand = b.idBrand
        WHERE p.idProdus = ?
    `;
    db.query(query, [productId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Product not found' });

        const product = results.map(row => ({
            id: row.idProdus,
            name: row.numeProdus,
            price: row.pretProdus,
            currency: 'RON',
            image: row.imagineProdus || 'https://via.placeholder.com/300',
            category: row.numeCategorie || 'Uncategorized',
            brand: row.numeBrand || row.numeArtist || 'Generic',
            brandId: row.codBrand,
            codCategorie: row.codCategorie,
            codArtist: row.codArtist,
            codBrand: row.codBrand,
            description: row.descriereProdus || 'No description available.',
            specs: typeof row.specificatii === 'string'
                ? JSON.parse(row.specificatii)
                : (row.specificatii || {}),
            gallery: typeof row.galerie === 'string'
                ? JSON.parse(row.galerie)
                : (row.galerie || [])
        }))[0];
        res.json(product);
    });
});

// POST: New Product
app.post('/api/products', (req, res) => {
    const { name, price, image, category, codCategorie, codArtist, codBrand, description, specs, gallery } = req.body;
    const specsJson = JSON.stringify(specs || {});
    const galleryJson = JSON.stringify(gallery || []);
    const catId = codCategorie || category || null;

    const query = `
        INSERT INTO tblProduse (numeProdus, pretProdus, imagineProdus, codCategorie, codArtist, codBrand, descriereProdus, specificatii, galerie)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [name, price, image, catId, codArtist || null, codBrand || null, description, specsJson, galleryJson], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Produs adăugat cu succes!', id: result.insertId });
    });
});

// PUT: Modify Product
app.put('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, price, image, category, codCategorie, codArtist, codBrand, description, specs, gallery } = req.body;
    const specsJson = JSON.stringify(specs || {});
    const galleryJson = JSON.stringify(gallery || []);
    const catId = codCategorie || category || null;

    const query = `
        UPDATE tblProduse
        SET numeProdus = ?, pretProdus = ?, imagineProdus = ?, codCategorie = ?, codArtist = ?, codBrand = ?, descriereProdus = ?, specificatii = ?, galerie = ?
        WHERE idProdus = ?
    `;

    db.query(query, [name, price, image, catId, codArtist || null, codBrand || null, description, specsJson, galleryJson, productId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Produs actualizat cu succes!' });
    });
});

// DELETE: Delete Product
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM tblProduse WHERE idProdus = ?';

    db.query(query, [productId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Produsul a fost șters cu succes!' });
    });
});

// GET: All Artists
app.get('/api/artists', (req, res) => {
    const query = 'SELECT * FROM tblArtisti';

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const artists = results.map(row => ({
            id: row.idArtist,
            name: row.numeArtist,
            country: row.taraOrigine || 'Necunoscuta',
            startYear: row.anActivitate || 0
        }));

        res.json(artists);
    });
});

// POST: Add Artist
app.post('/api/artists', (req, res) => {
    const { name, country, startYear } = req.body;
    const query = 'INSERT INTO tblArtisti (numeArtist, taraOrigine, anActivitate) VALUES (?, ?, ?)';

    db.query(query, [name, country, startYear], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Brand/Artist adăugat!', id: result.insertId });
    });
});

// PUT: Modify Artist
app.put('/api/artists/:id', (req, res) => {
    const artistId = req.params.id;
    const { name, country, startYear } = req.body;
    const query = 'UPDATE tblArtisti SET numeArtist = ?, taraOrigine = ?, anActivitate = ? WHERE idArtist = ?';

    db.query(query, [name, country, startYear, artistId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Brand/Artist actualizat cu succes!' });
    });
});

// DELETE: Delete Artist
app.delete('/api/artists/:id', (req, res) => {
    const artistId = req.params.id;
    const query = 'DELETE FROM tblArtisti WHERE idArtist = ?';

    db.query(query, [artistId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Artist șters cu succes!' });
    });
});

// GET: All Categories
app.get('/api/categories', (req, res) => {
    const query = 'SELECT * FROM tblCategorii';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        const categories = results.map(row => ({
            id: row.idCategorie,
            name: row.numeCategorie
        }));
        res.json(categories);
    });
});

// GET: All Brands
app.get('/api/brands', (req, res) => {
    const query = 'SELECT * FROM tblBranduri';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        const brands = results.map(row => ({
            id: row.idBrand,
            name: row.numeBrand
        }));
        res.json(brands);
    });
});

// POST: Add Brand
app.post('/api/brands', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO tblBranduri (numeBrand) VALUES (?)', [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: result.insertId });
    });
});

// PUT: Modify Brand
app.put('/api/brands/:id', (req, res) => {
    const { name } = req.body;
    db.query('UPDATE tblBranduri SET numeBrand = ? WHERE idBrand = ?', [name, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// DELETE: Delete Brand
app.delete('/api/brands/:id', (req, res) => {
    db.query('DELETE FROM tblBranduri WHERE idBrand = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// --- CART (COS CUMPARATURI) ---
app.get('/api/cart/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT c.cantitate, p.*, cat.numeCategorie, a.numeArtist, b.numeBrand
        FROM tblCos c
        JOIN tblProduse p ON c.codProdus = p.idProdus
        LEFT JOIN tblCategorii cat ON p.codCategorie = cat.idCategorie
        LEFT JOIN tblArtisti a ON p.codArtist = a.idArtist
        LEFT JOIN tblBranduri b ON p.codBrand = b.idBrand
        WHERE c.codUtilizator = ?
    `;
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const cartItems = results.map(row => ({
            id: row.idProdus,
            name: row.numeProdus,
            price: row.pretProdus,
            currency: 'RON',
            image: row.imagineProdus || 'https://via.placeholder.com/300',
            category: row.numeCategorie || 'Uncategorized',
            brand: row.numeBrand || row.numeArtist || 'Generic',
            quantity: row.cantitate,
        }));
        res.json(cartItems);
    });
});

app.post('/api/cart', (req, res) => {
    const { userId, productId, quantity } = req.body;

    const checkQuery = 'SELECT * FROM tblCos WHERE codUtilizator = ? AND codProdus = ?';
    db.query(checkQuery, [userId, productId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            const updateQuery = 'UPDATE tblCos SET cantitate = cantitate + ? WHERE codUtilizator = ? AND codProdus = ?';
            db.query(updateQuery, [quantity, userId, productId], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true, message: 'Cantitate actualizata' });
            });
        } else {
            const insertQuery = 'INSERT INTO tblCos (codUtilizator, codProdus, cantitate) VALUES (?, ?, ?)';
            db.query(insertQuery, [userId, productId, quantity], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ success: true, message: 'Produs adaugat in cos' });
            });
        }
    });
});

app.put('/api/cart', (req, res) => {
    const { userId, productId, quantity } = req.body;
    const query = 'UPDATE tblCos SET cantitate = ? WHERE codUtilizator = ? AND codProdus = ?';
    db.query(query, [quantity, userId, productId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.delete('/api/cart/:userId/:productId', (req, res) => {
    const { userId, productId } = req.params;
    const query = 'DELETE FROM tblCos WHERE codUtilizator = ? AND codProdus = ?';
    db.query(query, [userId, productId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// GET: All orders from user
app.get('/api/users/:userId/orders', (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT c.idComanda, c.dataComanda, c.statusComanda, c.totalPlata,
               d.cantitate, d.pretLaVanzare, p.numeProdus, p.imagineProdus, p.idProdus
        FROM tblComenzi c
        LEFT JOIN tblDetaliiComenzi d ON c.idComanda = d.codComanda
        LEFT JOIN tblProduse p ON d.codProdus = p.idProdus
        WHERE c.codUtilizator = ?
        ORDER BY c.dataComanda DESC
    `;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const ordersMap = new Map();
        results.forEach(row => {
            if (!ordersMap.has(row.idComanda)) {
                ordersMap.set(row.idComanda, {
                    id: row.idComanda,
                    date: row.dataComanda,
                    status: row.statusComanda,
                    total: row.totalPlata,
                    items: []
                });
            }
            if (row.idProdus) {
                ordersMap.get(row.idComanda).items.push({
                    productId: row.idProdus,
                    name: row.numeProdus,
                    quantity: row.cantitate,
                    price: row.pretLaVanzare,
                    image: row.imagineProdus
                });
            }
        });

        res.json(Array.from(ordersMap.values()));
    });
});

// PUT: Admin Modify
app.put('/api/admin/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const { status, items } = req.body;

    db.beginTransaction(err => {
        if (err) return res.status(500).json({ error: err.message });

        db.query('UPDATE tblComenzi SET statusComanda = ? WHERE idComanda = ?', [status, orderId], (err) => {
            if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

            if (!items || items.length === 0) {
                return db.commit(err => {
                    if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                    res.json({ success: true });
                });
            }

            let completed = 0;
            let newTotal = 0;

            items.forEach(item => {
                db.query('UPDATE tblDetaliiComenzi SET cantitate = ?, pretLaVanzare = ? WHERE codComanda = ? AND codProdus = ?',
                    [item.quantity, item.price, orderId, item.productId], (err) => {
                        if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

                        newTotal += (item.quantity * item.price);
                        completed++;

                        if (completed === items.length) {
                            db.query('UPDATE tblComenzi SET totalPlata = ? WHERE idComanda = ?', [newTotal, orderId], (err) => {
                                if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                                db.commit(err => {
                                    if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                                    res.json({ success: true, newTotal });
                                });
                            });
                        }
                    });
            });
        });
    });
});

app.post('/api/checkout', (req, res) => {
    const { userId, total, items } = req.body; // Primi items direct din React

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Trebuie să fii autentificat pentru a plasa o comandă.' });
    }

    if (!items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Coșul este gol.' });
    }

    db.beginTransaction(err => {
        if (err) return res.status(500).json({ error: err.message });

        const insertOrderQuery = 'INSERT INTO tblComenzi (codUtilizator, totalPlata, statusComanda) VALUES (?, ?, "Noua")';
        db.query(insertOrderQuery, [userId, total], (err, orderResult) => {
            if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

            const orderId = orderResult.insertId;

            const insertDetailsQuery = 'INSERT INTO tblDetaliiComenzi (codComanda, codProdus, cantitate, pretLaVanzare) VALUES ?';
            const detailsData = items.map(item => [orderId, item.id, item.quantity, item.price]);

            db.query(insertDetailsQuery, [detailsData], (err) => {
                if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

                db.commit(err => {
                    if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                    res.json({ success: true, message: 'Comanda a fost plasată cu succes!', orderId });
                });
            });
        });
    });
});

app.get('/api/users', (req, res) => {
    db.query('SELECT idUtilizator as id, numeComplet as name, email, rol as role FROM tblUtilizatori', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.put('/api/users/:id', (req, res) => {
    const { name, email, role } = req.body;
    db.query('UPDATE tblUtilizatori SET numeComplet = ?, email = ?, rol = ? WHERE idUtilizator = ?', [name, email, role, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.delete('/api/users/:id', (req, res) => {
    db.query('DELETE FROM tblUtilizatori WHERE idUtilizator = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM tblUtilizatori WHERE email = ? AND parola = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            const user = results[0];
            res.json({
                success: true,
                user: {
                    id: user.idUtilizator,
                    numeComplet: user.numeComplet,
                    email: user.email,
                    rol: user.rol
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'Email sau parola incorecta!' });
        }
    });
});

app.post('/api/register', (req, res) => {
    const { numeComplet, email, password } = req.body;

    const checkQuery = 'SELECT * FROM tblUtilizatori WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            return res.status(400).json({ success: false, message: 'Acest email este deja folosit!' });
        }

        const insertQuery = 'INSERT INTO tblUtilizatori (numeComplet, email, parola, rol) VALUES (?, ?, ?, "user")';
        db.query(insertQuery, [numeComplet, email, password], (insertErr, result) => {
            if (insertErr) return res.status(500).json({ error: insertErr.message });

            const mailOptions = {
                from: '"ByteHeap" <your_email@gmail.com>', // Replace with your sender email
                to: email, // Sends to the email the user just typed in
                subject: 'Bun venit la ByteHeap! 🎉',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #2563eb;">Salut, ${numeComplet}!</h2>
                        <p>Ne bucurăm să te avem alături. Contul tău a fost creat cu succes.</p>
                        <p>Acum poți explora catalogul nostru de echipamente profesionale, poți salva produsele favorite și poți urmări statusul comenzilor tale direct din cont.</p>
                        <br/>
                        <a href="http://localhost:5173/produse" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Începe Cumpărăturile</a>
                        <br/><br/>
                        <p>Cu prietenie,<br/><strong>Echipa ByteHeap</strong></p>
                    </div>
                `
            };

            // Send the email asynchronously (does not block the user from logging in)
            transporter.sendMail(mailOptions, (mailErr, info) => {
                if (mailErr) {
                    console.error('Eroare la trimiterea email-ului de bun venit:', mailErr);
                } else {
                    console.log('Email de bun venit trimis cu succes către:', email);
                }
            });

            // Keep your original response so the frontend logs the user in immediately
            res.json({
                success: true,
                user: {
                    id: result.insertId,
                    numeComplet,
                    email,
                    rol: 'user'
                }
            });
        });
    });
});

app.post('/api/update-address', (req, res) => {
    const { idUtilizator, adresa } = req.body;

    if (!idUtilizator) {
        return res.status(400).json({ success: false, message: 'Utilizator neidentificat.' });
    }

    // Validare strictă conform structurii bazei de date (VARCHAR(30))
    if (adresa && adresa.length > 30) {
        return res.status(400).json({ success: false, message: 'Adresa este prea lungă! Maxim 30 de caractere.' });
    }

    const sql = "UPDATE tblUtilizatori SET adresa = ? WHERE idUtilizator = ?";
    db.query(sql, [adresa, idUtilizator], (err, result) => {
        if (err) {
            console.error('Eroare la actualizarea adresei:', err);
            return res.status(500).json({ success: false, message: 'Eroare la baza de date.' });
        }
        res.json({ success: true, message: 'Adresa a fost salvată cu succes!' });
    });
});

const jwt = require('jsonwebtoken');

app.post('/api/request-password-reset', (req, res) => {
    const { email, idUtilizator } = req.body;

    const token = jwt.sign({ id: idUtilizator }, 'BYTEHEAP_SECRET_KEY', { expiresIn: '15m' });

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    const mailOptions = {
        from: '"ByteHeap Securitate" <andreiclashroyale7@gmail.com>', // Pune adresa ta
        to: email,
        subject: 'Schimbare Parolă - Cont ByteHeap',
        html: `
            <div style="font-family: Arial, sans-serif; max-w-md; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #2563eb;">Salut,</h2>
                <p>Am primit o cerere pentru schimbarea parolei contului tău.</p>
                <p>Apasă pe butonul de mai jos pentru a seta o parolă nouă. <b>Acest link este valabil doar 15 minute.</b></p>
                <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">Schimbă Parola</a>
                <p style="color: #666; font-size: 12px;">Dacă nu ai cerut tu acest lucru, poți ignora acest mesaj în siguranță.</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Eroare la trimiterea emailului.' });
        }
        res.json({ success: true, message: 'Email trimis cu succes!' });
    });
});

app.post('/api/reset-password', (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, 'BYTEHEAP_SECRET_KEY');
        const userId = decoded.id;

        const sql = "UPDATE tblUtilizatori SET parola = ? WHERE idUtilizator = ?";
        db.query(sql, [newPassword, userId], (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Eroare la baza de date.' });
            res.json({ success: true, message: 'Parola a fost actualizată cu succes!' });
        });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Link-ul este invalid sau a expirat.' });
    }
});

app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Completează toate câmpurile obligatorii.' });
    }

    const mailOptions = {
        from: '"ByteHeap Contact Form" <andreiclashroyale7@gmail.com>',
        replyTo: email,
        to: 'andreiclashroyale7@gmail.com',
        subject: `Mesaj nou de pe site: ${subject}`,
        html: `
            <h2>Ai primit un mesaj nou prin formularul de contact!</h2>
            <p><strong>De la:</strong> ${name} (${email})</p>
            <p><strong>Subiect:</strong> ${subject}</p>
            <hr/>
            <p><strong>Mesaj:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Eroare la trimiterea mesajului de contact:', error);
            return res.status(500).json({ success: false, message: 'Eroare la trimiterea mesajului.' });
        }
        res.json({ success: true, message: 'Mesajul a fost trimis cu succes!' });
    });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
});