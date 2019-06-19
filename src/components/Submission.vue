<template>
    <div class="card mx-auto w-50 mt-5 bg-secondary border-dark">
        <div class="collapse show" id="body">
            <div class="card-body">
                <div class="form-group">
                    <label for="cardListEntry" class="text-light">Card List</label>
                    <textarea
                        v-model="cardlistText"
                        v-on:input="$emit('input', $event.target.value)"
                        class="form-control"
                        id="cardListEntry"
                        rows="5"
                    ></textarea>
                </div>
            </div>
        </div>

        <div class="card-footer">
            <button
                @click="submit"
                type="button"
                class="btn btn-primary border-dark"
                data-toggle="collapse"
                data-target="#body"
            >{{show?"Submit":"Edit"}}</button>
        </div>
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


