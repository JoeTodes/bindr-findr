<template>
    <div v-show="hasLength" class="card mx-auto w-75 my-5 bg-secondary border-dark text-light">
        <div class="card-header">{{set.setName}}</div>
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
</template>

<script>
import CardView from "./CardView.vue";

export default {
    components: {
        CardView
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

