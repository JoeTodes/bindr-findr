<template>
    <div id="app">
        <div class="jumbotron mt-2 py-1 bg-secondary border-dark text-light">
            <h1 class="display-4">MTG Binder Finder</h1>
        </div>

        <Submission @cards-submitted="onSubmit" v-model="cardListText"></Submission>

        <div class="mx-auto w-75">
            <button
                @click="sortSets"
                v-if="cardsReceived"
                class="mb-2 btn btn-warning border-dark justify-self-right"
            >Re-Sort</button>
        </div>

        <div id="accordion">
            <div v-for="set in sortedSetNames" :key="set">
                <set-view
                    @rem-card="removeAllCards"
                    @rem-printing="removePrinting"
                    :set="sets[set]"
                ></set-view>
            </div>
        </div>
    </div>
</template>

<script>
import Submission from "./components/Submission.vue";
import SetView from "./components/SetView.vue";
import axios from "axios";
import Vue from "vue";
import mtgparser from "mtg-parser";

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
            cardNames: "",
            queryResult: "",
            sets: {},
            parsedCards: {},
            queryText: "",
            sortedSetNames: []
        };
    },
    computed: {
        cardsReceived: function() {
            return Object.keys(this.sets).length > 1;
        }
    },
    methods: {
        onSubmit() {
            this.clearSets();
            this.parseInput();
            this.getData();
        },
        clearSets() {
            Object.keys(this.sets).forEach(setCode => {
                var set = this.sets[setCode];
                if (set.cards) {
                    set.cards = [];
                }
            });
        },
        parseInput() {
            this.cardNames = this.cardListText;
            if (isNaN(this.cardNames[0])) {
                this.cardNames = "1 " + this.cardNames;
                this.cardNames = this.cardNames.replace(
                    /(?:\r\n|\r|\n)/g,
                    "\n1 "
                );
            }
            this.parsedCards = mtgparser(this.cardNames, "mtgo");
            this.parsedCards["cardArrays"] = [];
            this.splitCardArray(
                this.parsedCards.cards,
                this.parsedCards.cardArrays
            );
            //TODO
        },
        splitCardArray(array, dest) {
            if (array.length > 45) {
                dest.push(array.slice(0, 45));
                this.splitCardArray(array.slice(45), dest);
            } else {
                dest.push(array);
            }
        },
        getData() {
            this.parsedCards.cardArrays.forEach((array, j) => {
                this.queryText = 'https://api.scryfall.com/cards/search?q=!"';

                array.forEach((el, i) => {
                    if (
                        !(
                            el.name.toUpperCase() === "MOUNTAIN" ||
                            el.name.toUpperCase() === "PLAINS" ||
                            el.name.toUpperCase() === "ISLAND" ||
                            el.name.toUpperCase() === "SWAMP" ||
                            el.name.toUpperCase() === "FOREST"
                        )
                    ) {
                        if (el.name.length > 0) {
                            this.queryText += el.name.replace(/ /g, "+");
                            if (
                                j + 1 < this.parsedCards.cardArrays.length ||
                                i + 1 < array.length
                            ) {
                                this.queryText += '"+OR+!"';
                            }
                        }
                    }
                });

                this.queryText += '"&unique=prints&order=color';

                axios
                    .get(this.queryText)
                    .then(res => {
                        this.queryResult = res;
                        this.populateSets();
                        this.getHasMore();
                    })
                    .catch(err => {
                        // handle error
                        console.log(err);
                    });
            });
        },
        getHasMore() {
            if (this.queryResult.data.has_more) {
                axios.get(this.queryResult.data.next_page).then(res => {
                    this.queryResult = res;
                    this.populateSets();
                    this.getHasMore();
                    //this.sortSets();
                });
            } else {
                this.sortSets();
            }
        },
        populateSets() {
            for (const card of this.queryResult.data.data) {
                if (
                    card.promo ||
                    card.set_type == "planechase" ||
                    card.set_type == "duel_deck" ||
                    card.set_type == "box" ||
                    card.set_type == "spellbook" ||
                    card.set_type == "premium_deck" ||
                    !card.games.includes("paper")
                ) {
                    continue;
                }

                if (card.set_type == "commander") {
                    card.set = "c18";
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
        removePrinting(setCode, card) {
            var index = this.sets[setCode].cards.indexOf(card);
            if (index != -1) {
                this.sets[setCode].cards.splice(index, 1);
            }
        },
        removeAllCards(cardName) {
            Object.keys(this.sets).forEach(setCode => {
                var set = this.sets[setCode];
                for (var i = 0; i < set.cards.length; i++) {
                    if (set.cards[i].name === cardName) {
                        set.cards.splice(i, 1);
                    }
                }
            });
        }
    }
};
</script>

<style>
</style>
