import axios from '@/axios';
export default {
    list(params) {
        return axios.get('/products/all', { params })
    },
    delete(params) {
        return axios.delete(`/products/${params.id}`)
    }
}