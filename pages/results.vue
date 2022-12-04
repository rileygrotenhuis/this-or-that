<template>
    <div v-if="(this.results.length > 0)">
        <h3>{{ this.results[this.currentResult].content }}</h3>
        <div></div>
        <div>
            <button class="result-button" @click="previousQuestion">
                Last Question
            </button>
            <button class="result-button" @click="nextQuestion">
                Next Question
            </button>
        </div>
    </div>
    <div v-else>
        <h3>Retrieving Results...</h3>
    </div>
</template>

<script>
export default {
    name: 'ResultsPage',
    data() {
        return {
            currentResult: 0,
            results: [],
        };
    },
    async fetch() {
        this.results = await fetch('http://localhost:3000/api/results').then(res => res.json());
    },
    methods: {
        previousQuestion() {
            if (this.currentResult > 0) {
                this.currentResult--;
            }
        },
        nextQuestion() {
            if (this.currentResult < this.results.length -1) {
                this.currentResult++;
            }
        }
    }
}
</script>