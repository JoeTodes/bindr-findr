<template>
  <div class="card mt-5 bg-secondary border-dark">
    <form @submit.prevent>
      <div class="form-group px-3 pt-2">
        <label for="cardListEntry" class="text-light">Card List</label>
        <textarea
          v-bind:value="cardlistText"
          v-on:input="$emit('input', $event.target.value)"
          class="form-control"
          id="cardListEntry"
          rows="5"
        ></textarea>
      </div>
      <button
        @click="$emit('cards-submitted')"
        type="submit"
        class="btn btn-primary border-dark ml-3 mb-3"
      >Submit</button>
    </form>
  </div>
</template>
<script>
export default {
  props: ["cardlistText"]
};
</script>

