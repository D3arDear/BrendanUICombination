<template>
  <div class="zealot-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div ref="temp" style="width:0;height:0;overflow:hidden"></div>
    <img :src="url">
    <ol>
      <li v-for="file in fileList" :key="file.name">{{file.name}}</li>
      <li v-for="file in fileList" :key="file.size">{{parseFloat(file.size/1000)}} KB</li>
      <li v-for="file in fileList" :key="file.type">{{file.type}}</li>
    </ol>
  </div>
</template>
<script>
import { Stream } from "stream";
export default {
  name: "ZealotUploader",
  props: {
    name: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: "POST"
    },
    parseResponse: {
      type: Function,
      required: true
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      url: "about:blank"
    };
  },
  methods: {
    onClickUpload() {
      let input = this.createInput();
      input.addEventListener("change", () => {
        let file = input.files[0];
        this.uploadFile(file);
        input.remove();
      });
      input.click();
    },
    uploadFile(file) {
      let formData = new FormData();
      formData.append(this.name, file);
      let { name, size, type } = file;
      this.doUploadFile(formData, response => {
        let url = this.parseResponse(response);
        this.url = url;
        this.$emit("update:fileList", [...this.fileList, { name, type, size }]);
      });
    },
    doUploadFile(formData, success) {
      let xhr = new XMLHttpRequest();
      xhr.open(this.method, this.action);
      xhr.onload = () => {
        success(xhr.response);
      };
      xhr.send(formData);
    },
    createInput() {
      let input = document.createElement("input");
      input.type = "file";
      this.$refs.temp.appendChild(input);
      return input;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
