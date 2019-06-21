<template>
    <div id="app">
        <Submission @cards-submitted="onSubmit" v-model="cardListText"></Submission>
        <div v-for="set in sets" :key="set.setName">
            <set-view :set="set"></set-view>
        </div>
    </div>
</template>

<script>
import Submission from "./components/Submission.vue";
import SetView from "./components/SetView.vue";
import axios from "axios";
import Vue from "vue";

export default {
    name: "app",
    components: {
        Submission,
        SetView
    },
    data() {
        return {
            cardListText: "",
            cardName: "",
            queryResult: "",
            sets: {},
            cardsReceived: false
        };
    },
    methods: {
        onSubmit() {
            this.clearSets();
            this.parseInput();
            this.getData();
        },
        clearSets() {
            this.sets = {};
        },
        parseInput() {
            //TODO
        },
        getData() {
            this.cardName = this.cardListText.replace(/ /g, "+");
            this.cardName = this.cardName.replace(/(?:\r\n|\r|\n)/g, '"+OR+!"');

            axios
                .get(
                    'https://api.scryfall.com/cards/search?q=!"' +
                        this.cardName +
                        '"&unique=prints'
                )
                .then(res => {
                    this.queryResult = res;
                    this.populateSets();
                    this.getHasMore();
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                });
        },
        getHasMore() {
            if (this.queryResult.data.has_more) {
                axios.get(this.queryResult.data.next_page).then(res => {
                    this.queryResult = res;
                    this.populateSets();
                    this.getHasMore();
                });
            }
        },
        populateSets() {
            for (const card of this.queryResult.data.data) {
                if (
                    card.promo ||
                    card.set_type == "planechase" ||
                    card.set_type == "duel_deck" ||
                    card.set_type == "box" ||
                    card.set_type == "spellbook"
                ) {
                    continue;
                }

                if (!Object.keys(this.sets).includes(card.set)) {
                    this.$set(this.sets, card.set, {
                        setName: card.set_name,
                        cards: [card],
                        setUri: card.set_uri
                    });
                    //this.sets[card.set] = [];
                } else {
                    this.sets[card.set].cards.push(card);
                }
            }
        }
    }
};
</script>

<style>
</style>
