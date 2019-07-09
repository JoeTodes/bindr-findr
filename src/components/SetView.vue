<template>
    <div v-show="hasLength" class="card mx-auto w-75 my-0 bg-secondary border-dark text-light">
        <div
            class="card-header py-0"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            data-toggle="collapse"
            :data-target="'#'+set.setCode"
            :class="{ active: hover }"
        >
            <div class="row">
                <div class="col align-self-center py-3 pl-1">
                    <span class="badge badge-warning">{{this.set.cards.length}}</span>
                    {{set.setName}}
                </div>

                <img
                    class="col-2 col-sm-2 col-md-1 img-fluid p-3"
                    :src="'https://img.scryfall.com/sets/'+this.set.setCode+'.svg'"
                >
            </div>
        </div>
        <div class="collapse" :id="set.setCode" data-parent="#accordion">
            <div class="card-body">
                <div class="row">
                    <CardView
                        @rem-card="removeCard"
                        @rem-printing="removePrinting"
                        v-for="card in set.cards"
                        :key="card.id"
                        :card="card"
                    ></CardView>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardView from "./CardView.vue";

export default {
    components: {
        CardView
    },
    data() {
        return {
            hover: false
        };
    },
    props: {
        set: {
            setCode: String,
            setName: String,
            cards: [],
            setUri: String
        }
    },

    computed: {
        hasLength: function() {
            return this.set.cards.length > 0 ? true : false;
        }
    },
    methods: {
        removePrinting(card) {
            this.$emit("rem-printing", this.set.setCode, card);
        },
        removeCard(cardName) {
            this.$emit("rem-card", cardName);
        }
    }
};
</script>

<style scoped>
.active {
    background-color: rgb(138, 144, 150);
}
</style>


