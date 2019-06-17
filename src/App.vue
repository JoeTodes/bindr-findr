<template>
  <div id="app">
    <Submission @cards-submitted="parseInput" v-model="cardListText"></Submission>
  </div>
</template>

<script>
import Submission from "./components/Submission.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    Submission
  },
  data() {
    return {
      cardListText: "",
      cardName: "",
      printings: ""
    };
  },
  methods: {
    parseInput() {
      this.cardName = this.cardListText;

      axios
        .get(
          "https://api.scryfall.com/cards/search?q=" +
            this.cardName +
            "&unique=prints"
        )
        .then(res => {
          this.printings = res;
          //for (const card of this.printings.data.cards) {
          //  console.log(card.set);
          //}
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
