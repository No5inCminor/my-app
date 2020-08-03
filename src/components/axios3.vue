<template>
  <div class="home">
    
  </div>
</template>

<script>

import axios from 'axios'
import { config } from 'vue/types/umd'

export default {
  name: 'axios3',
  components: {
  },
  created() {
    //axios实例、参数配置
    axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,
        url: '/data.json',
        method: 'get, post, put, patch, delete',
        headers: {
            token: ''
        },
        params: {},
        data: {}
    })
    axios.defaults.timeout = 2000
    axios.defaults.baseURL = 'http://localhost:8080'
    let instance = axios.create({
        timeout: 1000,
        baseURL: ''
    })
    instance.defaults.timeout = 3000
    instance.get('/data.json',{
        timeout: 5000
    }).then((res)=>{
        console.log(res)
    })

    //拦截器
    axios.interceptors.request.use((config)=>{
        return config
    }, (err)=>{
        return Promise.reject(err)
    })
    axios.interceptors.response.use((res)=>{
        return res;
    }, (err)=>{
        return Promise.reject(err)
    })

    let instance = axios.create({})
    instance.interceptors.request.use((config)=>{
        config.headers.token = ''
        return config
    })

    let instance_phone = axios.create({})
    instance_phone.interceptors.request.use((config)=>{
        $('#modal').show()
        return config
    })
    instance_phone.interceptors.response.use((res)=>{
        $('#modal').hide()
        return res
    })
  }
}
</script>
