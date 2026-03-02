<template>
  <q-layout view="hHh Lpr fFf">
    <!-- navbar -->
    <q-header elevated class="bg-grey-1 text-white" style="height: 56px">
      <q-toolbar style="background-color: rgb(55, 109, 73); height: inherit;">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="this.mapStore.leftDrawerOpen = !this.mapStore.leftDrawerOpen"
        />
        <q-toolbar-title> {{ $t("web_gis") }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- drawer -->
    <q-drawer v-model="this.mapStore.leftDrawerOpen" bordered style="overflow-x: hidden;" overlay persistent>
      <img src="~assets/HyTruck_Logo_Standard_small.png" alt="HyTruck project logo" style="width: 300px;" class="q-pa-sm">
      <q-list class="q-mt-none">

        <!-- navigation links -->
        <div v-for="link in this.navigationLinks" v-bind:key="link">
          <div v-if="link[3] === '_self'">
            <q-item
              :to="link[0]"
              exact
              clickable
              v-ripple
              :active="currentRouterPath === link[0]"
              active-class="active-link"
            >
              <q-item-section avatar>
                <q-icon :name="link[1]" class="q-pl-sm"/>
              </q-item-section>
              <q-item-section>{{ $t(link[2]) }}</q-item-section>
            </q-item>
          </div>
          <div v-else>
            <q-item
              :href="link[0]"
              :target="link[3]"
              exact
              clickable
              v-ripple
              :active="currentRouterPath === link[0]"
              active-class="active-link"
            >
              <q-item-section avatar>
                <q-icon :name="link[1]" class="q-pl-sm"/>
              </q-item-section>
              <q-item-section>{{ $t(link[2]) }}</q-item-section>
            </q-item>
          </div>
        </div>

        <!-- layers list -->
        <LayersList v-if="currentRouterPath === '/map'" />
      </q-list>
    </q-drawer>

    <!-- page container -->
    <q-page-container>
      <router-view />
      <!-- page footer -->
    </q-page-container>
  </q-layout>
</template>

<script>
// components
import LayersList from "components/LayersList.vue";
import { gisStore } from 'src/stores/gis'
import { config } from 'src/boot/axios'

export default {
  name: "MainLayout",

  components: {
    LayersList,
  },

  setup() {
    const mapStore = gisStore();
    return { mapStore };
  },

  data() {
    return {
      locale: this.$i18n.locale,
      leftDrawerOpen: true,
      color: "",

      languages: [
        { label: "English", value: "en-US" },
        { label: "Eesti", value: "ee" },
      ],

      navigationLinks: [
        ["/about", "info_outline", "about", "_self"],
        ["/map", "public", "web_map", "_self"],
        ["/layers_weights", "layers", "layers_weights", "_self"],
        ["/docs/application_guide/basic_usage/", "help", "application_guide", "_blank"]
      ]
    };
  },

  watch: {
    // language changes
    locale(newValue, oldValue) {
      this.$i18n.locale = newValue;
    },

  },

  mounted() {
    // clear url if necessary
    if (this.$route.hash !== '') {
      let clearPath = this.$route.path
      this.$router.push({ path: clearPath })
    }

    if (this.$q.screen.width <= 600) this.leftDrawerOpen = false;
  },

  methods: {
  },

  computed: {
    currentRouterPath: function () {
      return this.$route.path;
    },

  },
};
</script>

<style lang="scss" scoped>
.active-link {
  background-color: $grey-2;
  color: rgb(150, 181, 57);
}
</style>

<style lang="scss"></style>
