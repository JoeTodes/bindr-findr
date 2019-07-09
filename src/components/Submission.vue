<template>
    <div class="card mx-auto w-75 mt-3 mb-3 bg-secondary border-dark">
        <div class="collapse show" id="body">
            <div class="card-body pt-3 px-4">
                <div class="form-group">
                    <label for="cardListEntry" class="text-light pb-1">Card List</label>
                    <i
                        tabindex="0"
                        class="mx-2 icon far fa-question-circle"
                        data-toggle="popover"
                        title="Welcome to MTG Binder Finder"
                        :data-content="instructions"
                        data-html:true
                        data-trigger="focus"
                    ></i>
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
            show: true,
            instructions: `This tool is designed to streamline the deck building process at your LGS.
            <br />
            <br />
To get a sorted list of sets your cards have been printed in, simply copy and paste your decklist into this form in one of the formats below.
<br />
<br />
If you edit the decklist, all of the data will be fetched again, so any printings or cards you have removed will reappear.
<br />
<br />
Acceptable Formats:
<br />
<br />


<div class="row">
<div class="col">Forest<br />
Mox Emerald<br />
Birds of Paradise<br />
Wrath of God<br />
Fact or Fiction<br />
etc..</div>

<div class="col">12 Forest<br />
3 Mox Emerald<br />
2 Birds of Paradise<br />
2 Wrath of God<br />
1 Fact or Fiction<br />
etc..</div>

<div class="col">12x Forest<br />
3x Mox Emerald<br />
2x Birds of Paradise<br />
2x Wrath of God<br />
1x Fact or Fiction<br />
etc..</div>
</div>

<br />

  **Note: Basic lands are automatically removed from the search<br />
  **Note: Commander Sets have been grouped together<br />
  **Note: Only paper, non-promo printings are shown<br />

`
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
.icon {
    color: white;
}
</style>


