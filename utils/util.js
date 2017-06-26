
Array.prototype.contains = function (mem) {
  for (var i = 0; i<this.length; i++) {
    if (this[i] == mem)
      return true
  }
  return false
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function repeatCheckValue(repeats){
  var checks = new Array(false,false,false,false,false,false,false)
  if(repeats == '每天'){
    for(var i=0; i<7; i++)
      checks[i] = true
    return checks
  }
  
  if(repeats == '工作日'){
    for (var i = 0; i < 7; i++){
      if(i < 5)
        checks[i] = true
      else
        checks[i] = true
    }
    return checks    
  }

  if(repeats == '周末'){
    for (var i = 0; i < 7; i++) {
      if (i < 5)
        checks[i] = true
      else
        checks[i] = true
    }
    return checks       
  }

  var list = repeats.split(',')
  for(var i=0; i<list.length; i++){
    if(list[i] == '工作日'){
      for (var j = 0; j < 5; j++) {
        checks[j] = true
      }
    }else if(list[i] == '周末'){
      checks[5] = true
      checks[6] = true
    }else{
      if(list[i] == '周一'){
        checks[0] = true
      }
      if (list[i] == '周二') {
        checks[1] = true
      }
      if (list[i] == '周三') {
        checks[2] = true
      }
      if (list[i] == '周四') {
        checks[3] = true
      }
      if (list[i] == '周五') {
        checks[4] = true
      }
      if (list[i] == '周六') {
        checks[5] = true
      }
      if (list[i] == '周日') {
        checks[6] = true
      }
    }
  }
  return checks
}

function clockRepeatStr(repeats){
  repeats.sort()
  var size = repeats.length
  if(size == 7){
    return "每天"
  } else if (repeats.contains('1') && repeats.contains('2') && repeats.contains('3') && repeats.contains('4') && repeats.contains('5')){
    var str = []
    str.push('工作日')
    for (var i = 0; i < repeats.length; i++) {
      if (repeats[i] == '6') {
        str.push('周六')
      }
      if (repeats[i] == '7') {
        str.push('周日')
      }     
    }
    return str.toString()
  } else if (repeats.contains('6') && repeats.contains('7')) {
    var str = []
    for (var i = 0; i < repeats.length; i++) {
        if (repeats[i] == '1') {
          str.push('周一')
        }
        if (repeats[i] == '2') {
          str.push('周二')
        }
        if (repeats[i] == '3') {
          str.push('周三')
        }
        if (repeats[i] == '4') {
          str.push('周四')
        }
        if (repeats[i] == '5') {
          str.push('周五')
        }
    }
    str.push('周末')
    return str.toString()  
  }

  var str = []
  for (var i=0; i<repeats.length; i++) {
    if (repeats[i] == '1') {
      str.push('周一')
    }
    if (repeats[i] == '2') {
      str.push('周二')
    }
    if (repeats[i] == '3') {
      str.push('周三')
    }
    if (repeats[i] == '4') {
      str.push('周四')
    }
    if (repeats[i] == '5') {
      str.push('周五')
    }
    if (repeats[i] == '6') {
      str.push('周六')
    }
    if (repeats[i] == '7') {
      str.push('周日')
    }
  }
  return str.toString()  
}

module.exports = {
  formatTime: formatTime,
  clockRepeatStr: clockRepeatStr,
  repeatCheckValue: repeatCheckValue
}
