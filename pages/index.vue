<template>
  <div class="container">
    <p class="title is-3">MIRO Broker</p>
    
    <div class="importer">
      <p>
        <a class="instruction" href="https://scrapbox.io/kawabeyuki23-26108247/MIRO_broker_%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9" target="blank">使い方</a>
      </p>
      <input v-model="uploadForm.credential" type="password" class="input" placeholder="Access tokenを入力してください。">
      <input v-model="uploadForm.boardID" type="text" class="input" placeholder="流し込むボードIDを入力してください。">
      <div class="file has-name is-boxed">
        <label class="file-label">
          <input class="file-input" type="file" name="csv" accept=".csv" @change="uploadfilechange">
          <span class="file-cta">
            <span class="file-icon">
              <img src="~/assets/img/download-arrow.svg" alt="">
            </span>
          </span>
          <span class="file-name">
            {{uploadfiletxt}}
          </span>
        </label>
      </div>
      <label class="shuffle">
        <span>シャッフルする</span>
        <input v-model="uploadForm.shuffle" type="checkbox">
      </label>
      <button class="button is-primary" :disabled="uploadstatus != 0" :class="{'is-loading': uploadstatus == 1}" @click="upload">{{uploadstatus == 0 ? "流し込み" : uploadstatus == 2 ? "成功": "失敗：もう一度お試しください"}}</button>
    </div>
    <!--
    <hr>
    <div class="exporter">
      <p class="title is-4">PDFダウンロード</p>
      <input type="password" class="input" placeholder="クレデンシャルコードを入力してください。">
      <input type="text" class="input" placeholder="ダウンロードするボードIDを入力してください。">
      <button class="button is-info" :class="{'is-loading': downloadstatus == 1}">{{downloadstatus == 0 ? "ダウンロード" : downloadstatus == 2 ? "成功": "失敗：もう一度お試しください"}}</button>
    </div>
    -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      uploadstatus: 0,
      uploadfiletxt: "CSVファイルを選択してください。",
      downloadstatus: 0,
      uploadForm: {
        credential: "",
        boardID: "",
        data: null,
        shuffle: false
      }
    }
  },
  methods: {
    upload () {
      if (this.uploadForm.data != null) {
        this.uploadstatus = 1
        let formData = new FormData
        formData.append('credential', this.uploadForm.credential)
        formData.append('boardID', this.uploadForm.boardID)
        formData.append('file', this.uploadForm.data)
        formData.append('shuffle', this.uploadForm.shuffle)
        this.$axios.$post('https://miro-broker.herokuapp.com/api/upload',
          formData,
          {        
            headers: {
              'Content-type': 'multipart/form-data'
            },
            timeout: 1200000
          }
        ).then(res => {
          console.log(res)
          this.uploadstatus = 2
        })
      }
    },
    uploadfilechange (e) {
      this.uploadstatus = 0
      this.uploadfiletxt = e.target.files[0].name
      this.uploadForm.data = e.target.files[0]
    }
  }
}
</script>
<style>
.container {
  max-width: 500px;
  margin-top: 20px
}

input[type="text"], input[type="password"], button, .file, .shuffle {
  margin-top: 20px;
  width: 100%;
}

.file-label {
  width: 100%;
  text-align: center;
}

.file-name {
  width: 100%;
  max-width: 100%;
  text-align: center;
}

.shuffle {
  display: flex;
  align-items: center;  
}

.shuffle span {
  padding-right: 10px;
}

.shuffle input {
  width: 18px;
  height: 18px;
}

.instruction {
  text-decoration: underline
}
</style>
