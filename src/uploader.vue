<template>
  <div class="zealot-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <slot name="tips"></slot>
    <div ref="temp" style="width:0;height:0;overflow:hidden"></div>
    <ol class="zealot-uploader-fileList">
      <li v-for="file in fileList" :key="file.name">
        <template v-if="file.status === 'uploading'">
          <div class="zealot-uploader-spin-wrapper">
            <z-icon name="loading" class="zealot-uploader-spin"></z-icon>
          </div>
        </template>
        <template v-else-if="file.type.indexOf('image') === 0">
          <img class="zealot-uploader-image" :src="file.url" width="32" height="32">
        </template>
        <template v-else>
          <div class="zealot-uploader-defaultImage"></div>
        </template>
        <span class="zealot-uploader-name" :class="{[file.status] : file.status}">{{file.name}}</span>
        <z-button class="zealot-uploader-remove" @click="onRemoveFile(file)">x</z-button>
      </li>
    </ol>
  </div>
</template>
<script>
import { Stream } from "stream";
import ZButton from "./button/button";
import ZIcon from "./icon";
import http from "./http";
export default {
  name: "ZealotUploader",
  components: { ZButton, ZIcon },
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
    },
    sizeLimit: {
      type: Number,
      default: 2 * 1024 * 1024
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: "image/*"
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
        let index = copy.indexOf(file);
        copy.splice(index, 1);
        this.$emit("update:fileList", copy);
      }
    },
    onClickUpload() {
      let input = this.createInput();
      input.addEventListener("change", () => {
        this.uploadFiles(input.files);
        input.remove();
      });
      input.click();
    },
    uploadFiles(rawFiles) {
      let newNames = [];
      for (let i = 0; i < rawFiles.length; i++) {
        let rawFile = rawFiles[i];
        let { name, type } = rawFile;
        let newName = this.generateName(name);
        newNames[i] = newName;
      }
      if (!this.beforeUploadFiles(rawFiles, newNames)) {
        return;
      }
      for (let i = 0; i < rawFiles.length; i++) {
        let rawFile = rawFiles[i];
        let newName = newNames[i];
        let formData = new FormData();
        formData.append(this.name, rawFile);
        this.doUploadFiles(
          formData,
          response => {
            let url = this.parseResponse(response);
            this.url = url;
            this.afterUploadFiles(newName, url);
          },
          xhr => {
            this.uploadError(xhr, newName);
          }
        );
      }
    },
    afterUploadFiles(newName, url) {
      let file = this.fileList.filter(f => f.name === newName)[0];
      let index = this.fileList.indexOf(file);
      let fileCopy = JSON.parse(JSON.stringify(file));
      fileCopy.url = url;
      fileCopy.status = "success";
      let fileListCopy = [...this.fileList];
      fileListCopy.splice(index, 1, fileCopy);
      this.$emit("update:fileList", fileListCopy);
      this.$emit("uploaded");
    },
    beforeUploadFiles(rawFiles, newNames) {
      rawFiles = Array.from(rawFiles);
      for (let i = 0; i < rawFiles.length; i++) {
        let { size, type } = rawFiles[i];
        if (size > this.sizeLimit) {
          this.$emit("error", `文件大于${this.sizeLimit / 1024} kb`);
          return false;
        }
      }
      let x = rawFiles.map((rawFile, i) => {
        let { type, size } = rawFile;
        return { name: newNames[i], type, size, status: "uploading" };
      });
      this.$emit("update:fileList", [...this.fileList, ...x]);
      return true;
    },
    uploadError(xhr, newName) {
      let file = this.fileList.filter(f => f.name === newName)[0];
      let index = this.fileList.indexOf(file);
      let fileCopy = JSON.parse(JSON.stringify(file));
      fileCopy.status = "fail";
      let fileListCopy = [...this.fileList];
      fileListCopy.splice(index, 1, fileCopy);
      this.$emit("update:fileList", fileListCopy);
      let error = "";
      if (xhr.status === 0) {
        error = "网络无法连接";
      }
      this.$emit("error", error);
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
    doUploadFiles(formData, success, fail) {
      http[this.method.toLowerCase()](this.action, {
        success,
        fail,
        data: formData
      });
    },
    createInput() {
      this.$refs.temp.innerHTML = "";
      let input = document.createElement("input");
      input.accept = this.accept;
      input.type = "file";
      input.multiple = true;
      this.$refs.temp.appendChild(input);
      return input;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../style/var";
.zealot-uploader {
  box-shadow: $card-shadow;
  padding: 8px 0;
  border-radius: $border-radius;
  &-fileList {
    list-style: none;
    padding: 0;
    margin: 0;
    > li {
      display: flex;
      align-items: center;
      margin: 4px 0;
      border-radius: $border-radius;
      box-shadow: $card-item-shadow;
    }
  }
  &-defaultImage {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    border: none;
  }
  &-image {
    margin-right: 8px;
  }
  &-name {
    margin-right: auto;
    &.success {
      color: green;
    }
    &.fail {
      color: red;
    }
  }
  &-remove {
    width: 32px;
    height: 32px;
  }
  &-spin {
    width: 100%;
    height: 100%;
    @include spin;
    fill: $symbol-color;
    &-wrapper {
      height: 32px;
      width: 32px;
      padding: 4px;
      margin-right: 8px;
    }
  }
}
</style>
