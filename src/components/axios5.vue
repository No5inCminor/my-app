<template>
  <div class="home">
    
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'axios5',
  components: {
  },
  created() {
    let source = axios.CancelToken.source()
    axios.get('/data.json', {
        cancelToken: source.token
    }).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })

    //取消请求(Massage可选)
    source.cancel('cancal http')
  }
}
</script>
