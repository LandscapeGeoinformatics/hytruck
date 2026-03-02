<template>
  <div class="q-pa-lg">
    <div class="text-body2 q-pt-sm text-right">
      <div>Copyright: Landscape Geoinformatics Lab</div>
      <div>© 2023-{{ year }} (v.{{ buildinfo }})</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterCopyright",

  components: {},

  data() {
    return {
      buildinfo: this.$build_id,
    };
  },

  watch: {},

  created() { },

  methods: {},

  computed: {
    // current year
    year: function () {
      const date = new Date();
      let year = date.getFullYear();
      return year;
    },
  },
};
</script>

<style scoped></style>
