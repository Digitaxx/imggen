let ctx = document.querySelector('.holst').getContext('2d');
let path = '/resources'
$('#gen-button').on('click', () => {
    generateRandom().then((data) => {
        drawMan(data.files);
        $('.seed-number').text(data.seed)
    })
})
$('#seed-button').on('click', () => {
    if(!$('#seed').val()){
        window.alert('Empty Seed')
    } else {
        generateBySeed($('#seed').val()).then((data) => {
            drawMan(data.files);
            $('.seed-number').text(data.seed);
        })
    }
})

function drawImg(picture) {
    return new Promise((res) => {
        let img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
            res();
        }
        img.src = path+picture;
    })
}

function generateRandom(key = 'D8') {
    return new Promise((res) => {
        $.ajax({
            url: `/api/generate?key=${key}`, success: function (data) {
               res(data);
            }, dataType: "json"
        });
    });
}
function generateBySeed(seed, key = 'D8') {
    return new Promise((res) => {
        $.ajax({
            url: `/api/generate?seed=${seed}&key=${key}`, success: function (data) {
                res(data);
            }, dataType: "json"
        });
    });
}

async function drawMan(files) {
    ctx.fillRect(0, 0, 300, 300)
    for (const file of files){
        await drawImg(file);
    }
}

