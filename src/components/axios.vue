<template>
  <div class="home">
    
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'axios',
  components: {
  },
  created() {
    axios.get('/data.json', {
        params: {
            id: 12
        }
    }).then((res)=>{
        console.log(res)
    })
    axios({
        method: 'get',
        url: '/data.json',
        params: {
            id: 1
        }
    }).then((res)=>{
        console.log(res)
    })

    let data = {
        id: 13
    }
    axios.post('/post', data).then((res)=>{
        console.log(res)
    })
    axios({
        method: 'post',
        url: '/post',
        data: data
    }).then((res)=>{
        console.log(res)
    })

    let fromData = new FormData()
    for(let key in data) {
        fromData.append(key, data[key])
    }
    axios.post('/post', fromData).then((res)=>{
        console.log(res)
    })

    axios.put('/put', data).then((res)=>{
        console.log(res)
    })

    axios.patch('/patch', fromData).then((res)=>{
        console.log(res)
    })

    axios.delete('/delete', {
        params: {
            id: 14
        }
    }).then((res)=>{
        console.log(res)
    })
    axios.delete('/delete', {
        data: data
    }).then((res)=>{
        console.log(res)
    })
    axios({
        method: 'delete',
        url: '/delete',
        params: {},
        data: {}
    }).then((res)=>{
        console.log(res)
    })
  }
}
</script>
