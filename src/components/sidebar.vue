<template>
    <div class="sidebar" :class="sidebar_full ? 'sidebar_full' : 'sidebar_mini'">
        <h2 class="sidebar_title" v-if="sidebar_full">Hyrule Warriors <br /> Definitive Edition</h2>
        <div class="sidebar_content" v-if="sidebar_full">
            <ul class="sidebar_content-group group1">
                <li :class="activepage == 'home'? 'active' : ''" @click="loadPage('home');">Home</li>
                <!-- <li><router-link to="/map">Legend Mode</router-link></li> -->
                <li :class="activepage == 'adventure'? 'active' : ''" @click="loadPage('adventure');">Adventure Map</li>
                <!-- <li :class="currentPage == 'home' ? 'active' : ''" @click="emitNewPageSelect('/', 'home')">Home</li>
                <li :class="currentPage == 'legend' ? 'active' : ''" @click="emitNewPageSelect('map', 'legend')">Legend Mode</li>
                <li :class="currentPage == 'adventure' ? 'active' : ''" @click="emitNewPageSelect('map', 'adventure')">Adventure Map</li>
                <li :class="currentPage == 'greatsea' ? 'active' : ''" @click="emitNewPageSelect('map', 'greatsea')">Great Sea Map</li>
                <li :class="currentPage == 'masterquest' ? 'active' : ''" @click="emitNewPageSelect('map', 'masterquest')">Master Quest Map</li>
                <li :class="currentPage == 'masterwindwaker' ? 'active' : ''" @click="emitNewPageSelect('map', 'masterwindwaker')">Master Wind Waker Map</li>
                <li :class="currentPage == 'twilight' ? 'active' : ''" @click="emitNewPageSelect('map', 'twilight')">Twilight Map</li>
                <li :class="currentPage == 'termina' ? 'active' : ''" @click="emitNewPageSelect('map', 'termina')">Termina Map</li>
                <li :class="currentPage == 'koholint' ? 'active' : ''" @click="emitNewPageSelect('map', 'koholint')">Koholint Island Map</li>
                <li :class="currentPage == 'grandtravels' ? 'active' : ''" @click="emitNewPageSelect('map', 'grandtravels')">Grand Travels Map</li>
                <li :class="currentPage == 'lorule' ? 'active' : ''" @click="emitNewPageSelect('map', 'lorule')">Lorule Map</li>
                <li :class="currentPage == 'rewards' ? 'active' : ''" @click="emitNewPageSelect('map', 'rewards')">Rewards Map</li> -->
            </ul>
            <ul class="sidebar_content-group group2">
                <!-- <li :class="currentPage == 'characters' ? 'active' : ''" @click="emitNewPageSelect('characters', 'characters')">Characters</li>
                <li :class="currentPage == 'heart' ? 'active' : ''" @click="emitNewPageSelect('heart', 'heart')">Heart Containers</li>
                <li :class="currentPage == 'skulltula' ? 'active' : ''" @click="emitNewPageSelect('skulltula', 'skulltula')">Skulltula Locations</li>
                <li :class="currentPage == 'costumes' ? 'active' : ''" @click="emitNewPageSelect('costumes', 'costumes')">Costumes</li>
                <li :class="currentPage == 'fairy' ? 'active' : ''" @click="emitNewPageSelect('fairy', 'fairy')">Fairy</li>
                <li :class="currentPage == 'skills' ? 'active' : ''" @click="emitNewPageSelect('skills', 'skills')">Skills</li>
                <li :class="currentPage == 'materials' ? 'active' : ''" @click="emitNewPageSelect('materials', 'materials')">Materials</li>
                <li :class="currentPage == 'badge' ? 'active' : ''" @click="emitNewPageSelect('badge', 'badge')">Badge List</li> -->
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
            activepage: 'home'
        }
    },
    emits: ['newPageSelect'],
    methods: {
        loadPage(page: string) {
            this.activepage = page;
            this.$emit('newPageSelect', page);
            if (page == 'home') {
                this.$router.push('/');
            } else {
                this.$router.push(`/${page}map`);
            }
        }
    }
}
</script>