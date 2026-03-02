import { boot } from 'quasar/wrappers'

const build_id = "__BUILDINFO__";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ( {app} ) => {
  // something to do
  app.config.globalProperties.$build_id = build_id;
})

export { build_id };
