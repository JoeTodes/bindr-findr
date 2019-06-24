<template>
    <div class="col-7 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
        <div class="card bg-secondary border-0 text-light mx-2 mb-0 mt-0">
            <div class="row">
                <img class="card-img-top" :src="card.image_uris.small">
            </div>
            <div class="row">
                <button
                    @click="$emit('rem-printing', card.name)"
                    class="text-nowrap col-6 btn btn-warning btn-sm"
                    style="overflow:hidden;"
                >
                    Remove
                    <br>Printing
                </button>
                <button
                    @click="$emit('rem-card')"
                    class="text-nowrap col-6 btn btn-success btn-sm"
                    style="overflow:hidden;"
                >
                    Card
                    <br>Found
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        card: {}
    }
};
</script>

