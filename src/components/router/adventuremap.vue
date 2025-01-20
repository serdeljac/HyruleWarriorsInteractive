<template>
    <section class="mapdisplay">
        <h1 class="mapdisplay_title">{{ mapSelected }} Map</h1>
        <div class="mapdisplay_filter">
            <p @click="changeFilter('difficulty')">Difficulty</p>
            <p @click="changeFilter('heart')">Heart</p>
            <p @click="changeFilter('weapon')">Weapon</p>
            <p @click="changeFilter('skulltula')">Skulltula</p>
            <p @click="changeFilter('fairy')">Fairy</p>
            <p @click="changeFilter('salon')">Salon</p>
            <p @click="changeFilter('character')">Character</p>
            <p @click="changeFilter('food')">Food</p>
            <p @click="changeFilter('costume')">Costume</p>
            <p @click="changeFilter('card')">Card</p>
        </div>
        <div class="mapzone" :class="mapSelected" :style="getGridDimensions(mapDimensions)">
            <div v-for="d in fullmapAppend" :key="d.ID" class="node" :class="`${d.mapcode}`"
                @click="getTileInfo(d.mapcode, d)">
                <div class="wrapper" :style="`background-image:url(../assets/mapimg/${mapSelected}/${d.mapcode}.webp)`">
                    <p>{{ `${d.mapcode}` }}</p>
                    <div class="tile" v-if="filter.difficulty" :class="`diff-style diff-${d.difficulty}`"></div>

                    <div class="tile" v-if="filter.heart" :class="`heart-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'heartcontainer')" :src="`../assets/icons/heartcontainer.png`" />
                        <img v-if="checkFilterAppend(d.mapcode, 'heartpiece')" :src="`../assets/icons/heartpiece.png`" />
                    </div>

                    <div class="tile" v-if="filter.weapon" :class="`weapon-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'weapon')" :src="`../assets/icons/weapon.png`" />
                    </div>

                    <div class="tile" v-if="filter.skulltula" :class="`skulltula-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'skulltula')" :src="`../assets/icons/skulltula.png`" />
                        <img v-if="checkFilterAppend(d.mapcode, 'skulltula')" :src="`../assets/icons/skulltula.png`" />
                    </div>

                    <div class="tile" v-if="filter.fairy" :class="`fairy-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'fairy')" :src="`../assets/icons/fairy.png`" />
                    </div>

                    <div class="tile" v-if="filter.salon" :class="`salon-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'salon')" :src="`../assets/icons/fairy_salon.png`" />
                    </div>

                    <div class="tile" v-if="filter.character" :class="`character-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'character')" :src="`../assets/icons/character.png`" />
                    </div>

                    <div class="tile" v-if="filter.food" :class="`food-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'food')" :src="`../assets/icons/fairy_food.png`" />
                    </div>

                    <div class="tile" v-if="filter.costume" :class="`costume-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'costume')" :src="`../assets/icons/costume.png`" />
                    </div>

                    <div class="tile" v-if="filter.card" :class="`card-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'card')" :src="`../assets/icons/${d.reward_victory[0].character}.jpg`" />
                    </div>

                </div>
            </div>
        </div>

        <mapdetails :mapSelected="mapSelected" :fullTileInfo="fullTileInfo" v-if="fullTileInfo" />

    </section>
</template>

<script lang="ts">
import adventureDATA from '../../../assets/data/adventuremap.json'
import mapdetails from './parts/mapdetails.vue'

export default {
    name: "Map Display",
    data() {
        return {
            mapTileData: undefined,
            fullmapAppend: adventureDATA,
            fullTileInfo: '',
            filter: {
                'heart': false,
                'weapon': false,
                'skulltula': false,
                'fairy': false,
                'salon': false,
                'character': false,
                'food': false,
                'costume': false,
                'difficulty': false,
                'card': false
            }
        }
    },
    props: ['mapDimensions', 'mapSelected', 'mapInfo'],
    components: { mapdetails },
    created() {
        for (let i = 0; i < this.fullmapAppend.length; i++) {
            //Simple Change to boolean values
            this.fullmapAppend[i].search = this.fullmapAppend[i].search === "FALSE" ? false : true

            //Fetch each tiles rewards
            let mapcode = this.fullmapAppend[i].mapcode
            let tileRewards = this.mapInfo.filter((d: any) => d.mapcode === mapcode)

            //Add boolean values to reward types for filters
            let filterVariables = {
                'heartcontain': this.checkFilter('heartcontainer', tileRewards),
                'heartpiece': this.checkFilter('heartpiece', tileRewards),
                'weapon': this.checkFilter('weapon', tileRewards),
                'skulltula': this.checkFilter('skulltula', tileRewards),
                'fairy': this.checkFilter('fairy', tileRewards),
                'salon': this.checkFilter('salon', tileRewards),
                'character': this.checkFilter('character', tileRewards),
                'food': this.checkFilter('food', tileRewards),
                'costume': this.checkFilter('costume', tileRewards),
            }
            this.fullmapAppend[i].filter = filterVariables

            //Append 
            this.fullmapAppend[i].reward_arank = this.appendRewards('arank', tileRewards)
            this.fullmapAppend[i].reward_victory = this.appendRewards('victory', tileRewards)
            this.fullmapAppend[i].treasure = this.appendRewards('treasure', tileRewards)
        }

        this.getTileInfo('adv_h8')
    },
    methods: {
        getGridDimensions(dim: any) {
            let setWidth = dim[0] * 80;
            return `grid-template-columns: repeat(${dim[0]}, 1fr); grid-template-rows: repeat(${dim[1]}, 1fr); width: ${setWidth}px;`;
        },
        checkFilter(condition: string, arr: []) {
            let results = arr.filter((d: any) => d.identity === condition);
            return results.length > 0 ? true : false
        },
        checkFilterAppend(mapcode: string, type: string) {
            let results = this.mapInfo.filter((d: any) => d.mapcode == mapcode);
            for (let i=0; i < results.length; i++) {
                if (results[i].identity == type) {
                    return true
                }
            }
            return false
        },
        appendRewards(type: string, arr: []) {
            let results = arr.filter((d: any) => d.aquire === type);
            return results
        },
        getTileInfo(tile: string,d: any) {
            let tileInfo = this.fullmapAppend.filter((d: any) => d.mapcode === tile)[0];
            this.fullTileInfo = tileInfo
        },
        changeFilter(name: string) {

            if (this.filter[name]) {
                this.filter[name] = false
                return false;
            }

            this.filter = {
                'heart': false,
                'weapon': false,
                'skulltula': false,
                'fairy': false,
                'salon': false,
                'character': false,
                'food': false,
                'costume': false,
                'difficulty': false,
                'card': false
            };

            this.filter[name] = true
        }
    }
}

</script>
