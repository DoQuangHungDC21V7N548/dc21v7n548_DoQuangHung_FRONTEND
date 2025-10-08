<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Nhập thông tin cần tìm"
      v-model="searchText"
    />
    <button class="btn btn-outline-secondary" type="button">
      <i class="fa fa-search"></i> Tìm kiếm
    </button>
  </div>
</template>

<script>
export default {
  emits: ["search"],
  data() {
    return { searchText: "" };
  },
  watch: {
    searchText(value) {
      this.$emit("search", value);
    },
  },
};
</script>
