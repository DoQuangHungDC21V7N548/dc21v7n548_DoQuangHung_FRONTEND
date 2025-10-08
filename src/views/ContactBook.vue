<template>
  <div class="page">
    <InputSearch @search="searchText = $event" />

    <div class="row mt-3">
      <div class="col-md-6">
        <h5>Danh bạ <i class="fa fa-address-book"></i></h5>
        <ContactList
          :contacts="filteredContacts"
          :activeIndex="activeIndex"
          :searchText="searchText"
          @select="selectContact"
        />
      </div>

      <div class="col-md-6">
        <h5>Chi tiết Liên hệ <i class="fa fa-id-card"></i></h5>
        <ContactCard :contact="activeContact" />
      </div>
    </div>

    <div class="mt-3">
      <button @click="refreshList" class="btn btn-primary">
        <i class="fa fa-sync"></i> Làm mới
      </button>

      <button @click="goToAdd" class="btn btn-success ms-2">
        <i class="fa fa-plus"></i> Thêm mới
      </button>

      <button @click="removeAllContacts" class="btn btn-danger ms-2">
        <i class="fa fa-trash"></i> Xóa tất cả
      </button>
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactCard from "@/components/ContactCard.vue";
import ContactService from "@/services/contact.service";

export default {
  name: "ContactBook",
  components: { InputSearch, ContactList, ContactCard },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  computed: {
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      const text = this.searchText.toLowerCase();
      return this.contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(text) ||
          (c.email && c.email.toLowerCase().includes(text)) ||
          (c.address && c.address.toLowerCase().includes(text))
      );
    },
    activeContact() {
      return this.activeIndex >= 0 ? this.filteredContacts[this.activeIndex] : null;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    selectContact(contact, index) {
      this.activeIndex = index;
    },
    async removeAllContacts() {
      if (confirm("Xóa tất cả liên hệ?")) {
        await ContactService.deleteAll();
        this.refreshList();
      }
    },
    goToAdd() {
      this.$router.push({ name: "contact.edit", params: { id: "add" } });
    },
  },
  mounted() {
    this.retrieveContacts();
  },
};
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: auto;
}
</style>
