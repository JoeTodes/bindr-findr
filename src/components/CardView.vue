<template>
    <div class="col-7 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
        <div class="card bg-secondary border-dark text-light">
            <img class="card-img-top" :src="card.image_uris.small">
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

