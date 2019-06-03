<template>
  <div class="zealot-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <slot name="tips"></slot>
    <div ref="temp" style="width:0;height:0;overflow:hidden"></div>
    <ol>
      <li v-for="file in fileList" :key="file.name">
        <template v-if="file.status === 'uploading'">这里有个菊花</template>
        <img :src="file.url" width="100" height="100">
        {{file.name}}
        <button @click="onRemoveFile(file)">x</button>
        <span>{{file.status}}</span>
      </li>
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
    onRemoveFile(file) {
      let answer = window.confirm("你确定要删除它吗?");
      if (answer) {
        let copy = [...this.fileList];
        let index = copy.indexOf();
        copy.splice(index, 1);
        this.$emit("update:fileList", copy);
      }
    },
    onClickUpload() {
      let input = this.createInput();
      input.addEventListener("change", () => {
        this.uploadFile(input.files[0]);
        input.remove();
      });
      input.click();
    },
    afterUploadFile(newName, url) {
      let file = this.fileList.filter(f => f.name === newName)[0];
      let index = this.fileList.indexOf(file);
      let fileCopy = JSON.parse(JSON.stringify(file));
      fileCopy.url = url;
      fileCopy.status = "success";
      let fileListCopy = [...this.fileList];
      fileListCopy.splice(index, 1, copy);
      this.$emit("update:fileList", fileListCopy);
    },
    beforeUploadFile(rawFile, newName, url) {
      let { size, type } = rawFile;
      this.$emit("update:fileList", [
        ...this.fileList,
        { name: newName, type, size, status: "uploading" }
      ]);
    },
    uploadFile(rawFile) {
      let { name, size, type } = rawFile;
      let newName = this.generateName(name);
      this.beforeUploadFile(rawFile, newName);
      let formData = new FormData();
      formData.append(this.name, rawFile);
      this.doUploadFile(
        formData,
        response => {
          let url = this.parseResponse(response);
          this.url = url;
          this.afterUploadFile(newName, url);
        },
        () => {
          this.uploadError(newName);
        }
      );
    },
    uploadError(newName) {
      let file = this.fileList.filter(f => f.name === newName)[0];
      let index = this.fileList.indexOf(file);
      let fileCopy = JSON.parse(JSON.stringify(file));
      fileCopy.status = "fail";
      let fileListCopy = [...this.fileList];
      fileListCopy.splice(index, 1, fileCopy);
      this.$emit("update:fileList", fileListCopy);
    },
    generateName(name) {
      while (this.fileList.filter(f => f.name === name).length > 0) {
        let dotIndex = name.lastIndexOf(".");
        let nameWithoutExtension = name.substring(0, dotIndex);
        let extension = name.substring(dotIndex);
        name = nameWithoutExtension + "(1)" + extension;
      }
      return name;
    },
    doUploadFile(formData, success, fail) {
      let xhr = new XMLHttpRequest();
      xhr.open(this.method, this.action);
      xhr.onload = () => {
        // success(xhr.response);
        fail();
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
