// const express = require('express');
import express from 'express';
// const morgan = require('morgan');
import morgan from 'morgan';
// const pool = require("./dbconfig")
// import { pool } from './dbconfig';
import pool from './dbconfig.js';

// import { nanoid } from 'nanoid'
// const nanoid = require('nanoid')
import { nanoid } from 'nanoid';

const app = express();



app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    pool.query('SELECT * FROM urls', (err, res) => {
        // console.log(err, res)
        console.dir(res.rows)
        // pool.end()
    })


    res.render('index')

});


app.get('/:id', async (req, res) => {
    const { id } = req.params
    const { rows } = await pool.query('SELECT * FROM urls WHERE sort = $1', [id])
    if (rows.length !== 0) {
        res.writeHead(302, { 'Location': `http://${rows[0].original}` });
        res.end();
    }
    else {
        res.writeHead(404, { 'Location': `google.com` });
        res.end();
    }


})

// app.get('/:id', (req, res) => {
//     const query = {
//         // give the query a unique name
//         name: 'fetch-url',
//         text: `SELECT * FROM urls WHERE sort = $9jInXpS3`,
//         // text: `SELECT * FROM urls WHERE sort = $${ req.params.id }`,
//         values: [1],
//     }

//     let data;
//     pool.query(query, (err, res1) => {
//         // console.log(err, res)
//         console.log(res1);
//         // console.dir(res1.rows)
//         // console.log(res1.rows.length);
//         // data = res1.rows;


//         // let iduser = req.params.id + "";
//         // console.log(iduser);
//         // console.log(res1.rows[1].sort)

//         // for (let i = 0; i < res1.rows.length; i++) {
//         //     if (res1.rows[i].sort == iduser) {
//         //         res.writeHead(200, { 'Location': `${ res1.rows[i].original }` });
//         //         res.end();
//         //         return;

//         //     }
//         //     else {
//         //         res.writeHead(302, { 'Location': `Error.com` });
//         //         res.end();

//         //     }
//         // }
//         // pool.end()
//     })



// });

app.post("/", (req, res) => {

    const originalUrl = req.body.url;
    const newUrl = nanoid(8)
    console.log(req.body.data)
    // insertUser()
    insertUser(req.body.data, newUrl).then(result => {
        if (result) {
            console.log('User inserted');
        }
    });

    res.render('newurl', { newUrl: newUrl })

    // res.send("here is new URl: " + newUrl + ".com")
})

//! postgess 

// !insert  data


const insertUser = async (original, short) => {
    try {
        await pool.connect();           // gets connection
        await pool.query(
            `INSERT INTO "urls"("original", "sort")  
             VALUES($1, $2)`, [original, short]); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
    //  finally {
    //     await pool.end();               // closes connection
    // }
};

// insertUser('this.com', 't.c').then(result => {
//     if (result) {
//         console.log('User inserted');
//     }
// });











































app.listen(process.env.PORT || 8000)
