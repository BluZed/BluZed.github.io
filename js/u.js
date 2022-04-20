const settingsBtn = document.getElementById('settingsBtn')
let default_settings = {}
const user_has_mouse = () => {
    return !!('onmousemove' in window) // Atleast works for some browsers..
}
const customCursor = (color,heldcolor) => {
    // Credit - https://codepen.io/ntenebruso/pen/QWLzVjY
    var cursor = document.querySelector('.cursor');var cursorinner = document.querySelector('.cursor2');var a = document.querySelectorAll('a');document.addEventListener('mousemove', function(e){var x = e.clientX;var y = e.clientY;cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;});document.addEventListener('mousemove', function(e){var x = e.clientX;var y = e.clientY;cursorinner.style.left = x + 'px';cursorinner.style.top = y + 'px';});document.addEventListener('mousedown', function(){cursor.classList.add('click');cursorinner.classList.add('cursorinnerhover');});document.addEventListener('mouseup', function(){cursor.classList.remove('click');cursorinner.classList.remove('cursorinnerhover');});a.forEach(item => {item.addEventListener('mouseover', () => {cursor.classList.add('hover');});item.addEventListener('mouseleave', () => {cursor.classList.remove('hover');});})
    const cursorStyle = `
    * {
        cursor: none!important;
    }
    .cursor {
        background-color: ${color};
    }
    .cursor2 {
        background-color: ${heldcolor}!important;
    }
    `
    let a_cs = document.createElement('style')
    a_cs.innerHTML = cursorStyle
    document.head.appendChild(a_cs)
}
settingsBtn.onclick = () => {
    let el = document.getElementById('settings')
    let elstyl = window.getComputedStyle(el)
    if(elstyl.display === "none"){
        el.style.display = "block"
        settingsBtn.innerHTML = settingsBtn.innerHTML.replace('settings','close')
    } else {
        el.style.display = "none"
        settingsBtn.innerHTML = settingsBtn.innerHTML.replace('close','settings')
        if(window.settings_need_reload){
            console.log('==== Need Reload For Updating Settings ====')
            window.location.reload()
        }
    }
}
const settings_check = () => {
    let Settings = window.localStorage.getItem('web_settings_json')
    if(Settings === null){
        window.localStorage.setItem('web_settings_json', JSON.stringify(default_settings))
        setTimeout(settings_check(), 10); 
    } else {
        let settings = JSON.parse(Settings)
        if(settings.backgroundAnim === true){
            VANTA.FOG({
                el: "body",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                highlightColor: 0x380cca,
                midtoneColor: 0xff0000,
                lowlightColor: 0xffff,
                baseColor: 0x0,
                blurFactor: 0.24,
                speed: 1.20,
                zoom: 0.40
            })
            document.getElementById('anim_bg_toggle').setAttribute('checked','')
        }
        if(settings.custom_cursor === true){
            customCursor(settings.custom_cursor_color,settings.custom_cursor_heldcolor)
            document.getElementById('custom_cursor_toggle').setAttribute('checked','')
        } else {
            const cursorStyle = `
            .cursor {
                display:none!important;
            }
            .cursor2 {
                display:none!important;
            }`
            let a_cs = document.createElement('style')
            a_cs.innerHTML = cursorStyle
            document.head.appendChild(a_cs)
        }
    }
}
window.addEventListener('resize', ()=>{
    let canvas = document.querySelector('.vanta-canvas')
    canvas.width  = window.innerWidth/2
    canvas.height = window.innerHeight/2
})
if(user_has_mouse()){
    default_settings = {
        backgroundAnim: true, 
        custom_cursor: true, 
        custom_cursor_color: '#ffffff', 
        custom_cursor_heldcolor: '#f7f7ff'
    }
    settings_check()
} else {
    default_settings = {
        backgroundAnim: true, 
        custom_cursor: false, 
        custom_cursor_color: '#ffffff', 
        custom_cursor_heldcolor: '#f7f7ff'
    }
    settings_check()
}
const set_setting = (el,val) => {
    let settings_val = JSON.parse(window.localStorage.getItem('web_settings_json'))
    if(settings_val[el] != undefined){
        settings_val[el] = val
    }
    let new_settings_val = JSON.stringify(settings_val)
    window.localStorage.setItem('web_settings_json', new_settings_val)
    console.log("==== " + el + " -> " + val + " ====")
    window.settings_need_reload = true
}
window.addEventListener('DOMContentLoaded', () => {
    window.settings_need_reload = false
    document.getElementById('anim_bg_toggle').onclick = () => {
        value = document.getElementById('anim_bg_toggle').checked
        set_setting('backgroundAnim', value)
    }
    document.getElementById('custom_cursor_toggle').onclick = () => {
        value = document.getElementById('custom_cursor_toggle').checked
        set_setting('custom_cursor', value)
    }
    document.getElementById('cursor_color').onchange = () => {
        value = document.getElementById('cursor_color').value
        set_setting('custom_cursor_color', value)
    }
    document.getElementById('hoverd_cursor_color').onchange = () => {
        value = document.getElementById('hoverd_cursor_color').value
        set_setting('custom_cursor_heldcolor', value)
    }
})