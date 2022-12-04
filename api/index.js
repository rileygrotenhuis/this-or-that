const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const { PrismaClient } = require('@prisma/client');

app.get('/', (req, res) => {
    return res.send('This or That - API');
});

app.get('/questions', async (req, res) => {
    const prisma = new PrismaClient();

    const questions = await prisma.questions.findMany({
        include: {
            answers: true,
        },
    });

    prisma.$disconnect();

    return res.send(questions);
});

app.post('/submit', async (req, res) => {
    const { question_id, answer_id } = req.body;

    const prisma = new PrismaClient();

    const submission = await prisma.submissions.create({
        data: {
            question_id: question_id,
            answer_id: answer_id,
        },
    });

    prisma.$disconnect();

    return res.send(submission);
});

app.get('/results', async (req, res) => {
    const prisma = new PrismaClient();

    let results = await prisma.questions.findMany({
        include: {
            submissions: true,
            answers: true,
        },
    });

    prisma.$disconnect();

    results.forEach((result, index) => {
        result.new_answers = {};

        result.answers.forEach((answer, index) => {
            result.new_answers[answer.id] = answer;
        });

        result.new_submissions = {};
        result.submissions.forEach((submission, index) => {
            if (result.new_submissions[submission.answer_id]) {
                result.new_submissions[submission.answer_id]++;
            } else {
                result.new_submissions[submission.answer_id] = 1;
            }
        });
    });

    return res.send(results);
});

export default {
    path: '/api',
    handler: app,
};
