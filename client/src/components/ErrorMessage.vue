<template>
    <div class="alert alert-success mt-2" role="alert">
        <h4 class="alert-heading text-center">{{ error }}</h4>
    </div>
</template>

<script>
export default {
    name: "error-message",
    props: ["error"]
}
</script>

<style>

</style>