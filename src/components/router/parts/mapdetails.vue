<template>
    <div v-if="tileData.length > 0">
        <h1>Map Details</h1>
        {{ tileData }}
        <p>Difficulty: {{ tileData[0].difficulty }}</p>
        <p>Mission: {{ tileData[0].mission }}</p>
        <p>Objective: {{ tileData[0].search }}</p>
        <p>A Rank KO: {{ tileData[0].arank_ko }}</p>
        <p>A Rank Time: {{ tileData[0].arank_time }} Minutes</p>
        <p>A Rank Damage: {{ tileData[0].arank_damage }}</p>
        <p>Notes: {{ tileData[0].notes }}</p>
        <p>A Rank Victory: {{ searchArankVictory(tileData[0].reward_arank) }}</p>
        <p>Victory: {{ searchVictory(tileData[0].reward_victory) }}</p>
    </div>
</template>

<script lang="ts">

export default {
    name: 'Map Details',
    props: ['tileData'],
    methods: {
        searchArankVictory(e: string) {
            if (e) {return e}
            for (let i = 1; i < this.tileData.length; i++) {
                if (this.tileData[i].condition == 'arank') {
                    return `${this.tileData[i].type} - ${this.tileData[i].character}`
                }
            }
        },
        searchVictory(e: string) {
            if (e) {return e}
            for (let i = 1; i < this.tileData.length; i++) {
                if (this.tileData[i].condition == 'victory') {
                    return `${this.tileData[i].type} - ${this.tileData[i].character}`
                }
            }
        },
    }
}
</script>