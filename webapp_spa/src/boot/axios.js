import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({ baseURL: 'https://hytruck.landscape-geoinformatics.eu/hytruck-api/v1' })

const config = axios.create({
  guestId: '00000000-0000-0000-0000-000000000000',
  serviceAreaUrl: 'https://hytruck.landscape-geoinformatics.eu/isochrone'
})

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  app.config.globalProperties.$api = api
  app.config.globalProperties.$config = config
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  // accessible through this.$api.defaults.baseURL
})

export { api, config }
