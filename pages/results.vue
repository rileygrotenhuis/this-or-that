<template>
    <div v-if="this.results.length > 0" class="results-container">
        <h3 class="results-title">
            {{ this.results[this.currentResult].content }}
        </h3>
        <div class="results-submissions-container">
            <div
                v-for="(value, index) in this.results[this.currentResult]
                    .answers"
                :key="index"
            >
                <h3 class="results-submission-item">
                    {{ value.content }} :
                    {{ results[currentResult].new_submissions[value.id] }} Total
                    Votes ({{ getPercentage(value) }}%)
                </h3>
            </div>
        </div>
        <div class="results-button-container">
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
        this.results = await this.$axios.$get('/api/results');
    },
    methods: {
        previousQuestion() {
            if (this.currentResult > 0) {
                this.currentResult--;
            }
        },
        nextQuestion() {
            if (this.currentResult < this.results.length - 1) {
                this.currentResult++;
            }
        },
        getPercentage(value) {
            return (
                (
                    this.results[this.currentResult].new_submissions[value.id] /
                    this.results[this.currentResult].submissions.length
                ).toFixed(2) * 100
            );
        },
    },
};
</script>
