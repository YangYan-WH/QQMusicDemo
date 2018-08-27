(function () {
    
    let slider = new Slider({
        el: document.querySelector('#slider'),
        slides:[
            {link:'#1',image:'../images/slide1.jpg'},
            {link:'#2',image:'../images/slide2.jpg'},
            {link:'#3',image:'../images/slide3.jpg'},
            {link:'#4',image:'../images/slide4.jpg'},
            {link:'#5',image:'../images/slide5.jpg'}
        ]
    })
    
    window.slider = slider

})()