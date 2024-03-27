<script setup>
import PokedexSection from '../components/modules/PokedexSection.vue'
import ColorInit from '../components/modules/ColorInit.vue'
import ArrowLeft from '../components/icons/ArrowLeft.vue'
import ArrowRight from '../components/icons/ArrowRight.vue'
import axios from 'axios'
</script>

<template>
    <div class="bg-gradient-to-b from-white to-rotomblue">
        <div class="p-10 flex flex-col items-center space-y-5">
            <div class="flex flex-row items-center ">
                <input type="text" id="searchID" v-model="searchID"
                    class="border-4 border-rotomblack bg-white text-rotomblack rounded-2xl p-4" />
                <button type="button" id="searchButton" @click="getPokemon(Number(searchID))"
                    class="border-4 border-rotomblack bg-rotomlightblue hover:bg-rotomblue text-white rounded-2xl p-4">{{
                        $t('pokedex.search')
                    }}</button>
            </div>
            <p class="text-rotomred p-2 size-1/5 font-bold" v-if="searchID < 1 || searchID > 1025">{{ $t('pokedex.alertID') }}</p>
            <button @click="randomPokeID()"
                class="border-rotomblack border-4 bg-rotomlightblue hover:bg-rotomblue text-white rounded-2xl p-4 size-2/5">{{
                    $t('pokedex.random') }}</button>
            <PokedexSection>
                <template #title>
                    <p class="font-bold">{{ curPoke.name }} #{{ curPoke.pokeID }}</p>
                </template>
                <template #sprite_normal><img :src="curPoke.normal_sprite" class="size-60" /></template>
                <template #sprite_shiny><img :src="curPoke.shiny_sprite" class="size-60" /></template>
                <template #type1>
                    <p :class="`${bgColor1} p-2 rounded-2xl border-black border-4`">{{ curPoke.type1 }}</p>
                </template>
                <template #type2 v-if="curPoke.type2 != null">
                    <p :class="`${bgColor2} p-2 rounded-2xl border-black border-4`">{{ curPoke.type2 }}</p>
                </template>
                <template #hp>{{ $t('stats.hp') }}: {{ curPoke.hp }}</template>
                <template #attack>{{ $t('stats.attack') }}: {{ curPoke.attack }}</template>
                <template #defense>{{ $t('stats.defense') }}: {{ curPoke.defense }}</template>
                <template #sp_attack>{{ $t('stats.sp_attack') }}: {{ curPoke.sp_attack }}</template>
                <template #sp_defense>{{ $t('stats.sp_defense') }}: {{ curPoke.sp_defense }}</template>
                <template #speed>{{ $t('stats.speed') }}: {{ curPoke.speed }}</template>
                <template #total>
                    <p class="font-bold">TOTAL: {{ total_stats }}</p>
                </template>
            </PokedexSection>
        </div>
        <div class="px-10 py-2 flex flex-row items-center justify-center">
            <button @click="getPokemon(id - 1)" class="size-2/5 relative ...">
                <section v-show="!firstPoke" class="border-slate border-4 bg-black text-white rounded-2xl p-4">
                    <h3>{{ $t('pokedex.previous') }}{{ prevPoke.name }} #{{ prevPoke.pokeID }}</h3><br>
                    <img :src='prevPoke.sprite' class="size-40 mx-auto" :alt='prevPoke.name' />
                    <ArrowLeft class="absolute bottom-0 left-0 ml-4 mb-4"></ArrowLeft>
                </section>
            </button>
            <button @click="getPokemon(id + 1)" class="size-2/5 relative ...">
                <section v-show="!lastPoke" class="border-slate border-4 bg-black text-white rounded-2xl p-4">
                    <h3>{{ $t('pokedex.next') }}{{ nextPoke.name }} #{{ nextPoke.pokeID }}</h3><br>
                    <img :src='nextPoke.sprite' class="size-40 mx-auto" :alt='nextPoke.name' />
                    <ArrowRight class="absolute bottom-0 right-0 mr-4 mb-4"></ArrowRight>
                </section>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: 1,
            searchID: 1,
            total_stats: 0,
            firstPoke: true,
            lastPoke: false,
            bgColor1: "",
            bgColor2: "",
            curPoke: {
                pokeID: this.id,
                name: "",
                normal_sprite: "",
                shiny_sprite: "",
                hp: 0,
                attack: 0,
                defense: 0,
                sp_attack: 0,
                sp_defense: 0,
                speed: 0,
                type1: "",
                type2: ""
            },
            prevPoke: {
                pokeID: this.id - 1,
                name: "",
                sprite: ""
            },
            nextPoke: {
                pokeID: this.id + 1,
                name: "",
                sprite: ""
            },
        };
    },
    methods: {
        async getData(id_interno) {
            this.cleanData()
            let id_prev = id_interno - 1
            let id_prox = id_interno + 1
            this.firstPoke = false
            this.lastPoke = false
            if (id_interno == 1) {
                id_prev = 1
                this.firstPoke = true
                this.lastPoke = false
            } else if (id_interno == 1025) {
                id_prox = 1025
                this.firstPoke = false
                this.lastPoke = true
            }
            axios.all([
                axios.get(`https://pokeapi.co/api/v2/pokemon/${id_interno}`),
                axios.get(`https://pokeapi.co/api/v2/pokemon/${id_prev}`),
                axios.get(`https://pokeapi.co/api/v2/pokemon/${id_prox}`)
            ])
                .then(axios.spread((responseCur, responsePrev, responseNext) => {
                    //console.log(responseCur);
                    //console.log(responsePrev)
                    //console.log(responseNext)
                    this.curPoke.pokeID = responseCur.data.id;
                    this.curPoke.name = responseCur.data.name.toUpperCase();
                    this.curPoke.normal_sprite = responseCur.data.sprites.other.home.front_default;
                    this.curPoke.shiny_sprite = responseCur.data.sprites.other.home.front_shiny;
                    this.curPoke.hp = responseCur.data.stats[0].base_stat;
                    this.curPoke.attack = responseCur.data.stats[1].base_stat;
                    this.curPoke.defense = responseCur.data.stats[2].base_stat;
                    this.curPoke.sp_attack = responseCur.data.stats[3].base_stat;
                    this.curPoke.sp_defense = responseCur.data.stats[4].base_stat;
                    this.curPoke.speed = responseCur.data.stats[5].base_stat;
                    this.curPoke.type1 = responseCur.data.types[0].type.name.toUpperCase();
                    this.bgColor1 = `bg-${responseCur.data.types[0].type.name}`
                    if ((responseCur.data.types[1] != null || responseCur.data.types[1] != undefined)) {
                        this.curPoke.type2 = responseCur.data.types[1].type.name.toUpperCase();
                        this.bgColor2 = `bg-${responseCur.data.types[1].type.name}`
                    } else {
                        this.bgColor2 = "bg-slate"
                        this.curPoke.type2 = null
                    }
                    this.total_stats = this.curPoke.speed + this.curPoke.sp_defense + this.curPoke.sp_attack + this.curPoke.defense + this.curPoke.attack + this.curPoke.hp
                    //console.log(this.bgColor1 + " " + this.bgColor2)
                    this.prevPoke.pokeID = responsePrev.data.id;
                    this.prevPoke.name = responsePrev.data.name.toUpperCase();
                    this.prevPoke.sprite = responsePrev.data.sprites.other.home.front_default;
                    this.nextPoke.pokeID = responseNext.data.id;
                    this.nextPoke.name = responseNext.data.name.toUpperCase();
                    this.nextPoke.sprite = responseNext.data.sprites.other.home.front_default;
                }))
                .catch((error) => {
                    console.log('Error');
                });
            //console.log(this.curPoke)
            //console.log(this.prevPoke)
            //console.log(this.nextPoke)
        },
        getPokemon(id_interno) {
            if (id_interno < 1 || id_interno > 1025) {
                return 'Falha, ID não existente'
            }
            this.curPoke.type2 = null
            this.id = id_interno
            //console.log("Current pokemon id: " + this.id)
            this.getData(this.id)
        },
        randomPokeID() {
            this.id = Math.floor(Math.random() * 1026)
            this.getPokemon(this.id)
        },
        cleanData() {
            this.curPoke.name = ""
            this.curPoke.normal_sprite = ""
            this.curPoke.shiny_sprite = ""
            this.curPoke.type1 = ""
            this.curPoke.type2 = ""
            this.prevPoke.name = ""
            this.nextPoke.name = ""
        }
    },
    mounted() {
        this.getData(1);
    }
}
</script>
