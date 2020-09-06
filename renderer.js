// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function get(id) {
    return document.getElementById(id);
}

function value(id) {
    return get(id).value
}

function float(id) {
    return parseFloat(value(id))
}

function int(id) {
    return parseInt(value(id))
}

function set(id, val) {
    get(id).innerHTML = val
}


function clear(id) {
    get(id).innerHTML = ""
}

// 低碳钢
const model_lower = [-0.02193015, -3.02567926, 94.8538625]
// 高碳钢
const model_upper = [-0.01640584, -2.02567626, 70.21324572]

function cal_speed(material, width, thickness) {
    if (material == 1) {
        params = model_lower
    } else {
        params = model_upper
    }
    // alert(params)
    return params[0] * width + params[1] * thickness + params[2]
}

function fmt_float(val, fixed) {
    return parseFloat(val).toFixed(fixed)
}

get('submit').onclick = function (ev) {
    clear('speed-out')
    clear('speed-coef-out')
    try {
        var material = int('material-param')
        var width = int('width-param')
        if (width > 2100) {
            alert('宽度不能大于2100')
            return false
        }
        var thickness = float('thickness-param')
        if (thickness < 0.8) {
            alert('厚度不能小于0.8')
            return false
        }
        var coef = float('coef-param')
        if (coef < 1.0 || coef > 1.6) {
            alert("破鳞系数必须在1.0到1.6之间")
            return false
        }
        if (isNaN(thickness) || isNaN(width) || thickness < 0.1 || width < 0.1) {
            alert("输入宽度或者厚度参数异常")
            return false
        }
    } catch (err) {
        alert("输出参数异常")
        return false
    }

    var speed = cal_speed(material, width, thickness)
    const speed_unit = ' 米/分'
    set('speed-out', fmt_float(speed, 2) + speed_unit)
    set('speed-coef-out', fmt_float(speed * coef, 2) + speed_unit)
}