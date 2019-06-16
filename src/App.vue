<template>
  <div id="app">
    <Submission @cards-submitted="parseInput" v-model="cardListText"></Submission>
  </div>
</template>

<script>
import Submission from "./components/Submission.vue";

export default {
  name: "app",
  components: {
    Submission
  },
  data() {
    return {
      cardListText: ""
    };
  },
  methods: {
    parseInput() {
      console.log("entered list is: " + this.cardListText);
    }
  }
};
</script>

<style>
</style>
