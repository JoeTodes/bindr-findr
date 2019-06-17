<template>
  <div class="card mx-auto w-50 mt-5 bg-secondary border-dark">
    <form @submit.prevent>
      <div v-if="show" class="form-group px-3 pt-2 mb-0">
        <label for="cardListEntry" class="text-light">Card List</label>
        <textarea
          v-model="cardlistText"
          v-on:input="$emit('input', $event.target.value)"
          class="form-control"
          id="cardListEntry"
          rows="5"
        ></textarea>
      </div>
      <button
        @click="submit"
        type="submit"
        class="btn btn-primary border-dark ml-3 my-3"
      >{{show?"Submit":"Edit"}}</button>
    </form>
  </div>
</template>

<script>
export default {
  //props: ["cardlistText"],
  data: function() {
    return {
      cardlistText: "",
      show: true
    };
  },
  methods: {
    submit() {
      if (this.show) {
        this.$emit("cards-submitted");
        this.show = false;
      } else {
        this.show = true;
      }
    }
  }
};
</script>

<style scoped>
</style>


