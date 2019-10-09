let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({ transform: 'translateX(-400px)' })
bindEvents()

$(next).on('click', function () {
    gotoslide(current + 1)   //下一张就是当前位置加1
})
$(previous).on('click', function () {
    gotoslide(current - 1)   //上一张就是当前位置减1
})

let timer=setInterval(function () { //自动轮播过程
    gotoslide(current + 1)
}, 2000)

$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
}).on('mouseleave',function(){
    timer=setInterval(function () { //自动轮播过程
        gotoslide(current + 1)
    }, 2000)
})


function bindEvents() {
    $('#buttonWrapper').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)   //获取对应点击的按钮
        let index = $button.index()     //点击的按钮是第几个按钮
        gotoslide(index)
    })
}

//重要一步，去下一步的动作过程
function gotoslide(index) {
    if (index > $buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }

    if (current === $buttons.length - 1 && index === 0) {
        //说明是从最后一张到第一张
        $slides.css({ transform: `translateX(${-($buttons.length + 1) * 400}px)` })
            //注意这里因为插入了数字用得是上顿号，不是分号，其他地方也一样
            .one('transitionend', function () {
                $slides.hide()
                    .offset()
                $slides.css({ transform: `translateX(-400px)` })
                    .show()
            })
    } else if (current === 0 && index === $buttons.length - 1) {
        //说明是从第一张到最后一张
        $slides.css({ transform: `translateX(0px)` })
            .one('transitionend', function () {
                $slides.hide()
                    .offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` })
                    .show()
            })
    } else {
        $slides.css({ transform: `translateX(${-(index + 1) * 400}px)` })
    }
    current = index
}

function makeFakeSlides() {
    let $firstcopy = $images.eq(0).clone(true)
    let $lastcopy = $images.eq($images.length - 1).clone(true)
    $slides.append($firstcopy)  //在slides容器中将第一张放在最后位置
    $slides.prepend($lastcopy)  //在slides容器中将最后一张放在第一个位置
}
