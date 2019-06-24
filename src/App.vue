<template>
    <div id="app">
        <Submission @cards-submitted="onSubmit" v-model="cardListText"></Submission>

        <div v-for="set in sortedSetNames" :key="set">
            <set-view :set="sets[set]"></set-view>
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
            cardsReceived: false,
            sortedSetNames: []
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
                        '"&unique=prints&order=color'
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
                    this.sortSets();
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

                if (card.set_type == "commander") {
                    card.set = "cmdr";
                    card.set_name = "Commander Sets";
                }

                if (!Object.keys(this.sets).includes(card.set)) {
                    this.$set(this.sets, card.set, {
                        setCode: card.set,
                        setName: card.set_name,
                        cards: [card],
                        setUri: card.set_uri
                    });
                } else {
                    if (
                        !this.setContainsCardName(
                            this.sets[card.set],
                            card.name
                        )
                    ) {
                        this.sets[card.set].cards.push(card);
                    }
                }
            }
        },
        sortSets() {
            this.sortedSetNames = Object.keys(this.sets);

            this.sortedSetNames.sort((a, b) => {
                var aLen = this.sets[a].cards.length;
                var bLen = this.sets[b].cards.length;
                //console.log("a: " + this.aLen + " b: " + this.bLen);
                return bLen - aLen;
            });
            this.$forceUpdate;
        },
        setContainsCardName(set, cardName) {
            for (let index = 0; index < set.cards.length; index++) {
                if (set.cards[index].name === cardName) {
                    return true;
                }
            }

            return false;
        },
        removeCardFromSet(cardName, setCode) {}
    }
};
</script>

<style>
</style>
