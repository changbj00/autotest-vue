export function settoken (name, value, expire) {
  var data = new Date()
  data.setSeconds(data.getSeconds() + expire)
  document.token = name + '=' + escape(value) + '; expires=' + data.toTimeString()
  console.log(document.token)
}
export function gettoken (name) {
  if (document.token.length > 0) {
    let start = document.token.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      let end = document.token.indexOf(';' + start)
      if (end === -1) {
        end = document.token.length
      }
      return unescape(document.token.substring(start, end))
    }
  }
  return ''
}
export function deltoken (name) {
  settoken(name, '', -1)
}
