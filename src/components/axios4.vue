<template>
  <div class="home">

  </div>
</template>

<script>

import axios from 'axios'
import { config } from 'vue/types/umd'

export default {
  name: 'axios4',
  components: {
  },
  created() {
    //错误处理
    axios.interceptors.request.use((config)=>{
        return config
    },err=>{
        return Promise.reject(err)
    })
    axios.interceptors.response.use((res)=>{
        return res
    },err=>{
        return Promise.reject(err)
    })
    axios.get('/data.json').then((res)=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })

    //实例、错误处理
    let instance = axios.create({})
    instance.interceptors.request.use((config)=>{
        return config
    },err=>{
        $('#modal').show()
        setTimeout(()=>{
            $('#modal').hide()
        },2000)
        return Promise.reject(err)
    })
    instance.interceptors.response.use(res=>{
        return res
    },err=>{
        $('#modal').show()
        setTimeout(()=>{
            $('#modal').hide()
        },2000)
        return Promise.reject(err)
    })
    instance.get('/data.json').then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
  }
}
</script>
