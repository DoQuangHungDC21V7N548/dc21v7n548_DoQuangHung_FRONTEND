<template>
  <div v-if="contact" class="page">
    <h4>{{ isNew ? "Thêm Liên hệ" : "Hiệu chỉnh Liên hệ" }}</h4>
    <ContactForm
      :contact="contact"
      :isNew="isNew"
      @submit:contact="saveContact"
      @delete:contact="deleteContact"
    />
  </div>
</template>

<script>
import ContactService from "@/services/contact.service";
import ContactForm from "@/components/ContactForm.vue";

export default {
  components: { ContactForm },
  props: ["id"],
  data() {
    return { contact: null };
  },
  computed: {
    isNew() {
      return this.id === "add";
    },
  },
  methods: {
    async saveContact(data) {
      try {
        if (this.isNew) await ContactService.create(data);
        else await ContactService.update(this.id, data);
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteContact() {
      if (!this.isNew && confirm("Xóa liên hệ này?")) {
        await ContactService.delete(this.id);
        this.$router.push({ name: "contactbook" });
      }
    },
    async getContact() {
      if (this.isNew) {
        this.contact = {
          name: "",
          email: "",
          address: "",
          phone: "",
          favorite: false,
        };
      } else {
        this.contact = await ContactService.get(this.id);
      }
    },
  },
  mounted() {
    this.getContact();
  },
};
</script>
