<template>
  <div class="home">
    
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'axios2',
  components: {
  },
  created() {
    axios.all(
        [
            axios.get('/city.json'),
            axios.get('data.json')
        ]
    ).then(
        axios.spread((dataRes, cityRes)=>{
            console.log(dataRes, cityRes)
        })
    )
  }
}
</script>
