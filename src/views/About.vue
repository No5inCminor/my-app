<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>Hello {{name}}</h3>
    <h3>it is {{$route.params.name}}{{$route.query.id}}</h3>
    <!-- <router-link to="/axiosTest">axios</router-link> -->
  </div>
</template>

<script>
export default {
  
  props: {
    name: {
      type: String, 
      default: 'Vue!'
    }
  }
  
}
</script>
