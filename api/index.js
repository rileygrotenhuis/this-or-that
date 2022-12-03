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

app.post('/api/submit', async (req, res) => {
    const { question_id, answer_id } = req.body;

    const prisma = new PrismaClient();

    const submission = await prisma.submissions.create({
        data: {
            question_id: question_id,
            answer_id: answer_id,
        },
    });

    return res.json(submission);
});

module.exports = app;
