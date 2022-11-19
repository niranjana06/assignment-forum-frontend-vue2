<template>
  <div class="home">
    <Products></Products>
  </div>
</template>


<script>
// @ is an alias to /src
import Products from "@/components/Products";
import PendingPosts from "@/views/PendingPosts";

export default {
  name: 'HomeView',
  components: {
    PendingPosts,
    Products,
  },
}
</script>
