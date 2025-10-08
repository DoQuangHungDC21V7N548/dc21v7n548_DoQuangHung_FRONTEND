<template>
  <div v-if="contact" class="card p-3">
    <p><strong>Tên:</strong> {{ contact.name }}</p>
    <p><strong>E-mail:</strong> {{ contact.email }}</p>
    <p><strong>Địa chỉ:</strong> {{ contact.address }}</p>
    <p><strong>Điện thoại:</strong> {{ contact.phone }}</p>
    <p>
      <strong>Liên hệ yêu thích:</strong>
      <span v-if="contact.favorite">✔</span>
      <span v-else>✖</span>
    </p>
  </div>

  <p v-else>Chọn một liên hệ để xem chi tiết.</p>
</template>

<script>
export default {
  props: { contact: Object },
};
</script>
