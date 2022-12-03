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

    prisma.$disconnect();

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

    prisma.$disconnect();

    return res.json(submission);
});

app.get('/api/results', async (req, res) => {
    const prisma = new PrismaClient();

    const results = await prisma.questions.findMany({
        include: {
            submissions: true,
        },
    });

    const totals = await prisma.submissions.groupBy({
        by: ['question_id'],
        _count: {
            question_id: true,
        },
    });

    const finalTotals = {};

    totals.forEach((value, index) => {
        finalTotals[value.question_id] = value._count.question_id;
    });

    prisma.$disconnect();

    const repsonse = { results, finalTotals };

    return res.json(repsonse);
});

module.exports = app;
