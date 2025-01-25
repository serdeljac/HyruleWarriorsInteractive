<template>
    <div class="sidebar" :class="sidebar_full ? 'sidebar_full' : 'sidebar_mini'">
        <h2 class="sidebar_title" v-if="sidebar_full">Hyrule Warriors <br /> Definitive Edition</h2>
        <div class="sidebar_content" v-if="sidebar_full">
            <ul class="sidebar_content-group group1">
                <li :class="activepage == 'home'? 'active' : ''" @click="$emit('newPageSelect', 'home'); activepage='home'">Home</li>
                <li :class="activepage == 'adventure'? 'active' : ''" @click="$emit('newPageSelect', 'adventure'); activepage='adventure'">Adventure Map</li>
                <li :class="activepage == 'greatsea'? 'active' : ''" @click="$emit('newPageSelect', 'greatsea'); activepage='greatsea'">Great Sea Map</li>
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
    emits: ['newPageSelect'],
    data() {
        return {
            sidebar_full: true,
            activepage: 'home'
        }
    },
    
}
</script>