<template>
    <h1>Results</h1>
</template>

<script>
export default {
    name: 'ResultsPage',
    data() {
        return {
            results: [],
        };
    },
    async fetch() {
        this.results = await fetch('http://localhost:3000/api/results').then(res => res.json());
    }
}
</script>