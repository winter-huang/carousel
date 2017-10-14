/**
 * Created by hyd on 2017/8/5.
 */
/**
 * 封装了一个获取元素当前样式的函数
 * @param element
 * @param attr
 * @returns {*}
 */
function getStyle(element,attr) {
    if(window.getComputedStyle){
        return window.getComputedStyle(element,null)[attr];
    }else {
        return element.currentStyle[attr];
    }
}
/**
 * 封装了一个缓慢动画的函数
 * @param element
 * @param target
 */
function animatev1(element,target) {
    clearInterval(element.timer);
    element.timer=setInterval(function () {
        var currentLeft = element.offsetLeft;
        var step=(target-currentLeft)/10;
        step=target>=currentLeft?Math.ceil(step):Math.floor(step);
        currentLeft+=step;
        element.style.left=currentLeft+'px';
        if(target==currentLeft){
            clearInterval(element.timer);
        }
    },20)
}
/**
 * 封装了一个可以自定义修改offset属性的函数
 * @param element
 * @param target
 * @param attr 'with' 'left' 'top' 'height'
 */
function animatev2(element,target,attr) {
    clearInterval(element.timer);
    element.timer=setInterval(function () {
        var current = parseInt(getStyle(element,attr));
        var step = (target-current)/10;
        step = target>=current?Math.ceil(step):Math.floor(step);
        current+=step;
        element.style[attr]=current+'px';
        if(target==current){
            clearInterval(element.timer);
        }
    },20)
}

// function animatev2(element,target,attr) {
//     clearInterval(element.timer);
//     element.timer=setInterval(function () {
//         var current= parseInt(getStyle(element,attr));
//         var step = (target-current)/10;
//         step = target>=current?Math.ceil(step):Math.floor(step);
//         current+=step;
//         element.style[attr]=current+'px';
//         if(target==current){
//             clearInterval(element.timer);
//         }
//     },20)
// }

function animatev3(element,obj) {
    clearInterval(element.timer);
    element.timer=setInterval(function () {
        for(var attr in obj){
            var target = obj[attr];
            var current=parseInt(getStyle(element,attr));
            var step=(target-current)/10;
            step=target>=current?Math.ceil(step):Math.floor(step);
            current+=step;
            element.style[attr]=current+'px';
            if(current==target){
                clearInterval(element.timer);''
            }
        }
    },20)
}
/**
 * 对animatev4 进行优化去除bug，可以同时修改多个属性
 * @param element
 * @param obj
 */
function animatev4(element,obj) {
    clearInterval(element.timer);
    element.timer=setInterval(function () {
        var flag=true;
        for(var attr in obj){
            var target = obj[attr];
            var current = parseInt(getStyle(element,attr));
            var step = (target-current)/10;
            step=target>=current?Math.ceil(step):Math.floor(step);
            current+=step;
            element.style[attr]=current+'px';
            if(current!=target){
                flag=false;
            }
        }
        if(flag){
            clearInterval(element.timer);
        }
    },20)
}

function animatev6(element,obj,callback) {
    clearInterval(element.timer);
    element.timer=setInterval(function () {
        var flag=true;
        for(var attr in obj){
            var target=obj[attr];
            if(attr=='opacity'){
                var current=parseFloat(getStyle(element,attr));
                target=Math.floor(target*100);
                current=Math.floor(current*100);
                var step=(target-current)/10;
                step=target>current?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style.opacity=current/100;
            }
            else if(attr=='zIndex'){
                var current=target;
                element.style.zIndex=target;
            }
            else{
                var current=parseInt(getStyle(element,attr));
                var step=(target-current)/10;
                step=target>current?Math.ceil(step):Math.floor(step);
                current+=step;
                element.style[attr]=current+'px';
            }
            if(current!=target){
                flag=false;
            }
        }
        if(flag){
            clearInterval(element.timer);
            callback && callback();//短路运算，&&找假，||找真
        }
    },20)
}













