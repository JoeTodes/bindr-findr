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
            printings: "",
            sets: {}
        };
    },
    methods: {
        onSubmit() {
            this.parseInput();
            this.getData();
        },
        parseInput() {
            //TODO
        },
        getData() {
            this.cardName = this.cardListText;

            axios
                .get(
                    'https://api.scryfall.com/cards/search?q=!"' +
                        this.cardName +
                        '"&unique=prints'
                )
                .then(res => {
                    this.printings = res;
                    for (const card of this.printings.data.data) {
                        if (card.promo) {
                            break;
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
                })
                .catch(err => {
                    // handle error
                    console.log(err);
                });
        }
    }
};
</script>

<style>
</style>
