const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const { PrismaClient } = require('@prisma/client');

app.get('/api', (req, res) => {
    return res.json('This or That - API');
});

app.get('/api/questions', async (req, res) => {
    const prisma = new PrismaClient();

    const questions = await prisma.questions.findMany({
        include: {
            answers: true,
        },
    });

    return res.json(questions);
});

module.exports = app;
