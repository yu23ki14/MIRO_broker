export default function({ $axios, redirect }) {
  // 注: ここの引数を今は使わないからと _ とかにするとエラーになる
  $axios.onResponse(config => {
    $axios.setHeader('Access-Control-Allow-Origin', 'https://api.miro.com')
  })
}