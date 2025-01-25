<template>
    <div class="mapdetails">
        <div class="mapdetails_gridblock mapimg">
            <div class="toggle">
                <div class="tab" :class="TAB_search_image ? 'active' : ''" @click="TAB_search_image = true">Search</div>
                <div class="tab" :class="!TAB_search_image ? 'active' : ''" @click="TAB_search_image = false">Battle Info</div>
            </div>
            <div class="mapimg_select">
                <div v-if="TAB_search_image && tileData.search" class="img" :style="`background-image:url(../../assets/mapimg/${tileData.mapname}/unlocks/${tileData.mapcode}_unlock.webp)`"></div>
                <div v-else-if="TAB_search_image && !tileData.search" class="img_nosearch">
                    <p>No Search Requirements</p>
                </div>                
                <div v-else>
                    <ul>
                        <li v-for="d in tileData.treasure" :key="d.ID">{{ displayLocations(d) }}</li>
                        <li v-if="tileData.type == 'key'">{{ `Key Location: ${tileData.notes}` }}</li>
                        <li v-if="tileData.type == 'quiz'">{{ `Defeat Order: ${tileData.notes}` }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mapdetails_gridblock mission">
            <h2>{{ `${tileData.mapcode.slice(4, 6)} - ${tileData.mission}` }}</h2>
        </div>

        <div class="mapdetails_gridblock arank">
            <h3>A Rank Reward</h3>
            <div class="rewarditem" v-for="d in tileData.reward_arank" :key="d.ID">

                <div class="rewarditem_wrapper" v-if="d.identity == 'heartcontainer' || d.identity == 'heartpiece'">
                    <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                    <p>{{ d.character }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'material'">
                    <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                    <p>{{ `${d.name} Material` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'weapon'">
                    <div class="weapon_wrapper">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ d.level }}</p>
                    </div>
                    <p>{{ `${d.name} [${d.character}]` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else>
                    <p>{{ d }}</p>
                </div>

            </div>
        </div>

        <div class="mapdetails_gridblock victory">
            <h3>Victory Reward</h3>
            <div class="rewarditem" v-for="d in tileData.reward_victory" :key="d.ID">

                <div class="rewarditem_wrapper" v-if="d.identity == 'heartcontainer' || d.identity == 'heartpiece'">
                    <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                    <p>{{ d.character }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'material'">
                    <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                    <p>{{ `${d.name} Material` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'weapon'">
                    <div class="weapon_wrapper">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ d.level }}</p>
                    </div>
                    <p>{{ `${d.name} [${d.character}]` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'card'">
                    <img class="iconimg" :src="`../../assets/icons/${d.character}.jpg`" />
                    <p>{{ `${d.name} Card` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'character'">
                    <p>{{ `Unlock [${d.character}]` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'costume'">
                    <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                    <p>{{ `${d.name} [${d.character}]` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else>
                    <p>{{ d }}</p>
                </div>

            </div>
        </div>

        <div class="mapdetails_gridblock treasure">
            <h3>Treasures</h3>
            <div class="inline">

                <div class="rewarditem">
                    <div class="rewarditem_wrapper" v-if="fetchCharacterName('heartcontainer')">
                        <img class="iconimg" :src="`../../assets/icons/heartcontainer.png`" />
                        <p>{{ fetchCharacterName('heartcontainer') }}</p>
                    </div>

                    <div class="rewarditem_wrapper disable" v-else>
                        <img class="iconimg" :src="`../../assets/icons/heartcontainer.png`" />
                        <p>NONE</p>
                    </div>
                </div>

                <div class="rewarditem">
                    <div class="rewarditem_wrapper" v-if="fetchCharacterName('heartpiece')">
                        <img class="iconimg" :src="`../../assets/icons/heartpiece.png`" />
                        <p>{{ fetchCharacterName('heartpiece') }}</p>
                    </div>

                    <div class="rewarditem_wrapper disable" v-else>
                        <img class="iconimg" :src="`../../assets/icons/heartpiece.png`" />
                        <p>NONE</p>
                    </div>
                </div>
                
                <div class="rewarditem" v-for="d in fetchRewardTreasures(tileData.treasure)" :key="d.ID">

                    <div class="rewarditem_wrapper" v-if="d.identity == 'weapon'">
                        <div class="weapon_wrapper">
                            <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                            <p>{{ d.level }}</p>
                        </div>
                        <p>{{ `${d.name} [${d.character}]` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'costume'">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ `${d.name} [${d.character}]` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'fairy'">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ `${d.name} [${d.character}]` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'salon'">
                        <img class="iconimg" :src="`../../assets/icons/fairy_${d.identity}.png`" />
                        <p>{{ `${d.name} [${d.character}]` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'food'">
                        <img class="iconimg" :src="`../../assets/icons/fairy_${d.identity}.png`" />
                        <p>{{ `${d.name} [${d.character}]` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'skulltula'">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ `${d.name} #${d.no}` }}</p>
                    </div>

                </div>
            </div>
        </div>

        <div class="mapdetails_gridblock conditions">
            <div class="inline">
                <div class="subblock">
                    <h3>A Rank KO</h3>
                    <p v-if="tileData.arank_ko">{{ tileData.arank_ko }}</p>
                    <p v-else>-</p>
                </div>

                <div class="subblock">
                    <h3>A Rank Time</h3>
                    <p v-if="tileData.arank_time">{{ `${tileData.arank_time} Minutes` }}</p>
                    <p v-else>-</p>
                </div>

                <div class="subblock">
                    <h3>A Rank Damage</h3>
                    <p v-if="tileData.arank_damage">{{ `${tileData.arank_damage}% Health` }}</p>
                    <p v-else>-</p>
                </div>
                <div class="subblock">
                    <h3>Skulltula Conditions</h3>
                    <p>{{ `${fetchSkulltulaCondition(1, tileData.treasure)}` }}</p>
                    <p>{{ `${fetchSkulltulaCondition(2, tileData.treasure)}` }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: 'Map Details',
    props: ['tileData'],
    data() {
        return {
            TAB_search_image: true
        }
    },
    methods: {
        fetchCharacterName(type: string) {
            let results = this.tileData.treasure.filter((d: any) => d.aquire == 'treasure' && d.identity == type)
            return results.length == 0 ? false : results[0].character
        },
        fetchRewardTreasures(arr: any) {
            let results = this.tileData.treasure.filter((d: any) => d.identity !== 'heartcontainer' && d.identity !== 'heartpiece')
            return results
        },
        fetchSkulltulaCondition(num: number, arr: any) {
            let results = arr.filter((d: any) => d.identity === 'skulltula' && d.piece == num)[0]
            if (!results && num == 1) {return '-'}
            return results ? results.type : ''
        },
        displayLocations(arr: any) {
            if (arr.identity == 'heartcontainer') {
                return `Heart Container - ${arr.area}`
            } else if (arr.identity == 'heartpiece') {
                return `Heart Piece - ${arr.area}`
            } else if (arr.identity == 'fairy') {
                return `Fairy - ${arr.area}`
            } else if (arr.identity == 'salon') {
                return `Fairy Clothes - ${arr.area}`
            } else if (arr.identity == 'food') {
                return `Fairy Food - ${arr.area}`
            } else {
                return ''
            }
        }
    }
}
</script>