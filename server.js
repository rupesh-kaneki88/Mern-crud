const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors());
const port = 8080;

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
});

app.get('/', async (req, res) => {
    const sql = `
        SELECT student.sid, student.name, student.dep, student.address, internship.proj_name
        FROM student
        LEFT JOIN internship ON student.sid = internship.proj_id;
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while fetching the data' });
        }
        return res.json(data);
    });
});




app.post('/api/create', (req, res) => {
    const { sid, name, department, address } = req.body;
    const sql = "INSERT INTO student (sid, name, dep, address) VALUES (?, ?, ?, ?)";

    db.query(sql, [sid, name, department, address], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while inserting the data' });
        }
        return res.status(200).json({ message: 'Data inserted successfully', data: result });
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM student WHERE sid = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while deleting the data' });
        }
        return res.status(200).json({ message: 'Data deleted successfully', data: result });
    });
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM student WHERE sid = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while fetching the data' });
        }
        return res.status(200).json(result[0]); // Assuming the result is an array and we want the first item
    });
});

app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, dep, address } = req.body; // Use 'dep' here
    const sql = "UPDATE student SET name = ?, dep = ?, address = ? WHERE sid = ?";

    db.query(sql, [name, dep, address, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while updating the data' });
        }
        return res.status(200).json({ message: 'Data updated successfully', data: result });
    });
});


app.post('/insert', (req, res) => {
    const records = req.body;
    const insertPromises = records.map(record => {
        const { sid, name, dep, address } = record;
        const sql = "INSERT INTO student (sid, name, dep, address) VALUES (?, ?, ?, ?)";
        return new Promise((resolve, reject) => {
            db.query(sql, [sid, name, dep, address], (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(insertPromises)
        .then(results => {
            res.status(200).json({ message: 'Data inserted successfully', data: results });
        })
        .catch(error => {
            console.error('Error uploading data:', error);
            res.status(500).json({ error: 'An error occurred while inserting the data' });
        });
});
 

app.get('/project', (req, res) => {
    const sql = `
        SELECT internship.proj_id, internship.proj_name, student.name AS student_name
        FROM internship
        JOIN student ON internship.sid = student.sid;
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An error occurred while fetching the data' });
        }
        return res.json(data);
    });
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
