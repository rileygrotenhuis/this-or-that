<template>
    <div class="quiz-container" v-if="((questions.length > 0) && !quizOver)">
        <h3>{{ this.questions[this.currentQuestion].content }}</h3>
        <div class="quiz-button-container">
            <button class="quiz-button" v-for="answer in this.questions[this.currentQuestion].answers" :key="answer">
                {{ answer.content }}
            </button>
        </div>
    </div>
</template>

<script>
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
        this.questions = await fetch('/api/questions').then(res => res.json());
    },
};
</script>
