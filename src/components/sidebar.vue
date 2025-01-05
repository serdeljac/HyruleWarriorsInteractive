<template>
    <div class="sidebar" :class="sidebar_full ? 'sidebar_full' : 'sidebar_mini'">
        <h2 class="sidebar_title" v-if="sidebar_full">Hyrule Warriors <br /> Definitive Edition</h2>

        <div class="sidebar_content" v-if="sidebar_full">
            <ul class="sidebar_content-group group1">
                <li @click="emitPageSelect('home')">Home</li>
                <li @click="emitPageSelect('legend')">Legend Mode</li>
                <li @click="emitPageSelect('adventure')">Adventure Map</li>
                <li @click="emitPageSelect('greatsea')">Great Sea Map</li>
                <li @click="emitPageSelect('masterquest')">Master Quest Map</li>
                <li @click="emitPageSelect('masterwindwaker')">Master Wind Waker Map</li>
                <li @click="emitPageSelect('twilight')">Twilight Map</li>
                <li @click="emitPageSelect('termina')">Termina Map</li>
                <li @click="emitPageSelect('koholint')">Koholint Island Map</li>
                <li @click="emitPageSelect('grand')">Grand Travels Map</li>
                <li @click="emitPageSelect('lorule')">Lorule Map</li>
                <li @click="emitPageSelect('rewards')">Rewards Map</li>
            </ul>
            <ul class="sidebar_content-group group2">
                <li @click="emitPageSelect('characters')">Characters</li>
                <li @click="emitPageSelect('heart')">Heart Containers</li>
                <li @click="emitPageSelect('skulltula')">Skulltula Locations</li>
                <li @click="emitPageSelect('costumes')">Costumes</li>
                <li @click="emitPageSelect('fairy')">Fairy</li>
                <li @click="emitPageSelect('skills')">Skills</li>
                <li @click="emitPageSelect('materials')">Materials</li>
                <li @click="emitPageSelect('badge')">Badge List</li>
            </ul>
        </div>

    </div>
</template>

<script lang="ts">
export default {
    name: "Sidebar",
    data() {
        return {
            sidebar_full: true,
            currentPage: ''
        }
    },
    props: ['pageSelected'],
    emits: ['emitPageSelect'],
    created() {
        this.currentPage = this.pageSelected;
        console.log(this.currentPage)
    },
    methods: {
        emitPageSelect(page: string) {
            this.currentPage = page
            this.$emit('emitPageSelect', page)
        }
    }
}
</script>