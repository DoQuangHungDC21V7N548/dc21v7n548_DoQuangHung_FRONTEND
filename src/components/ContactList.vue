<template>
  <ul class="list-group">
    <li
      v-for="(contact, index) in filteredContacts"
      :key="contact._id"
      class="list-group-item"
      :class="{ active: index === activeIndex }"
      @click="$emit('select', contact, index)"
    >
      {{ contact.name }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    contacts: Array,
    activeIndex: Number,
    searchText: String,
  },
  computed: {
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      const text = this.searchText.toLowerCase();
      return this.contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(text) ||
          c.email.toLowerCase().includes(text) ||
          c.address.toLowerCase().includes(text)
      );
    },
  },
};
</script>
