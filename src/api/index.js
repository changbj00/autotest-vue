import axios from './http'
function QUERY_LIST () {
  return axios.get('/list')
}
export default {
  QUERY_LIST
}
