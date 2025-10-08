<template>
  <Form @submit="submitContact" :validation-schema="contactSchema">
    <div class="form-group mb-3">
      <label for="name">Tên</label>
      <Field name="name" type="text" class="form-control" v-model="contactLocal.name" />
      <ErrorMessage name="name" class="text-danger" />
    </div>

    <div class="form-group mb-3">
      <label for="email">Email</label>
      <Field name="email" type="email" class="form-control" v-model="contactLocal.email" />
      <ErrorMessage name="email" class="text-danger" />
    </div>

    <div class="form-group mb-3">
      <label for="address">Địa chỉ</label>
      <Field name="address" type="text" class="form-control" v-model="contactLocal.address" />
    </div>

    <div class="form-group mb-3">
      <label for="phone">Điện thoại</label>
      <Field name="phone" type="text" class="form-control" v-model="contactLocal.phone" />
    </div>

    <div class="form-check mb-3">
      <Field name="favorite" type="checkbox" class="form-check-input" v-model="contactLocal.favorite" />
      <label class="form-check-label" for="favorite">Liên hệ yêu thích</label>
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>

      <button
        v-if="!isNew"
        type="button"
        class="btn btn-danger ms-2"
        @click="$emit('delete:contact')"
      >
        Xóa
      </button>

      <button type="button" class="btn btn-secondary ms-2" @click="cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "ContactForm",
  components: { Form, Field, ErrorMessage },
  props: {
    contact: Object,
    isNew: { type: Boolean, default: false },
  },
  emits: ["submit:contact", "delete:contact"],
  data() {
    return {
      contactLocal: { ...this.contact },
      contactSchema: yup.object().shape({
        name: yup.string().required("Tên không được để trống"),
        email: yup.string().email("Email không hợp lệ"),
      }),
    };
  },
  methods: {
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },
    cancel() {
      this.$router.push({ name: "contactbook" });
    },
  },
};
</script>
