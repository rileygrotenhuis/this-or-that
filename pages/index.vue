<template>
    <div v-if="this.questions.length > 0">
        <div class="quiz-container" v-if="!this.quizOver">
            <h3>{{ this.questions[this.currentQuestion].content }}</h3>
            <div class="quiz-button-container">
                <button
                    class="quiz-button"
                    v-for="(answer, index) in this.questions[
                        this.currentQuestion
                    ].answers"
                    :key="index"
                    @click="submitAnswer(answer)"
                >
                    {{ answer.content }}
                </button>
            </div>
        </div>
        <div class="quiz-container" v-else>
            <h3>Quiz Over</h3>
            <a href="/results">
                <button>View Results</button>
            </a>
        </div>
    </div>
    <div class="quiz-container" v-else>
        <h3>Retrieving Quiz...</h3>
    </div>
</template>

<script>
import { apiUrl } from '../config';

export default {
    name: 'IndexPage',
    data() {
        return {
            quizOver: false,
            currentQuestion: 0,
            questions: [],
        };
    },
    async fetch() {
        this.questions = await this.$axios.$get('/api/questions', {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
        });
    },
    methods: {
        async submitAnswer(answer) {
            await this.$axios.$post('/api/submit', {
                question_id: this.questions[this.currentQuestion].id,
                answer_id: answer.id,
            });

            this.currentQuestion++;

            if (this.currentQuestion > this.questions.length - 1) {
                this.quizOver = true;
            }
        },
    },
};
</script>
