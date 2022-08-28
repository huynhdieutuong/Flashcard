import axios, { AxiosError } from 'axios'

interface DataError {
  type: string
  title: string
  status: number
  traceId: string
  errors: any
}

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500))

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

axiosClient.interceptors.request.use(
  (config: any) => {
    let token = null
    if (localStorage.getItem('user'))
      token = JSON.parse(localStorage.getItem('user')!).token
    if (token) config.headers = { Authorization: `Bearer ${token}` }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  async (response: any) => {
    if (process.env.NODE_ENV === 'development') await sleep()

    return response
  },
  (error: AxiosError) => {
    const { data, status } = error.response!
    const dataError = data as DataError
    switch (status) {
      case 400:
        if (dataError.errors) {
          const modelStateErrors: string[] = []
          for (const key in dataError.errors) {
            if (dataError.errors[key])
              modelStateErrors.push(dataError.errors[key])
          }
          throw modelStateErrors.flat()
        }
        console.log(dataError.title)
        break
      case 401:
        console.log(dataError.title)
        break
      case 404:
        console.log(data as string)
        break
      case 500:
        console.log(dataError.title)
        break
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default axiosClient
