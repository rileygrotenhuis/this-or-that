<template>
    <div class="quiz-container" v-if="((questions.length > 0) && !quizOver)">
        <h3>{{ this.questions[this.currentQuestion].content }}</h3>
        <div class="quiz-button-container">
            <button 
                class="quiz-button" 
                v-for="answer in this.questions[this.currentQuestion].answers" 
                :key="answer"
                @click="submitAnswer(answer)"
            >
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
        this.questions = await fetch('http://localhost:3000/api/questions').then(res => res.json());
    },
    methods: {
        async submitAnswer(answer) {
            await fetch('http://localhost:3000/api/submit', {
                method: 'POST',
                body: JSON.stringify({
                    question_id: this.questions[this.currentQuestion].id,
                    answer_id: answer.id
                }),
                headers: { 'Content-Type': 'application/json' }                
            });

            this.currentQuestion++;

            if (this.currentQuestion > this.questions.length) {
                this.quizOver = true;
            }
        }
    }
};
</script>
