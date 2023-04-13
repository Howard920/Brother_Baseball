

var s = skrollr.init();

$(window).scroll(function (e) {
    // console.log(e);

    let scrollMove = scrollY;
    if(scrollMove > 100){
        $('nav.navbar').addClass('navbar-dark');
        $('nav.navbar').addClass('bg-dark');
        $('.team_des').addClass('addbg');
    }else{
        $('nav.navbar').removeClass('navbar-dark');
        $('nav.navbar').removeClass('bg-dark');
        $('.team_des').removeClass('addbg');
    }
})


// mouseenter 進入點會選到 img，所以必須回到上一層的dom
$('.fanscard').mouseenter(function (e) {
    // 最接近this's div
    $(this.closest('div')).addClass('addzindex');
    // console.log(this.closest('div'));
})

$('.fanscard').mouseleave(function () {
    $(this.closest('div')).removeClass('addzindex');
})


let cards_info = [{
    lel:'猛象會 Black-card',
    bonus: `①會員卡1張。<br>②猛象會員:象紋保冰桶乙個。<br>③100元例行賽主場門票折價序號10組，100元商品折價券6張。`,
    bg_color: `#222`,
    color: '#ccc'
    // 080404
},{
    lel:'親子象 Yellow-card',
    bonus: `①會員卡1張。<br>②海綿寶寶聯名行李箱。<br>③100元例行賽主場門票折價序號10組，100元商品折價券6張。`,
    bg_color: '#f2d365',
    color: '#212529'
    // F6C714
},{
    lel:'艾樂粉 Pink-card',
    bonus: `①會員卡1張。<br>②萌象毯護妳組合(摺疊桌、毯子)。<br>③100元例行賽主場門票折價序號10組，100元商品折價券6張。`,
    bg_color: '#fcd4dc',
    color: '#212529'
    // F2B7C3
},];


TeamsData = [{
    team: '',
    t_png:'./Teams/e.png',
    game:'',
    win: 3,
    lose: 5,
    safe: 0,
    percent:''
},{
    team: '',
    t_png:'./Teams/monkey.png',
    game:'',
    win: 4,
    lose: 1,
    safe: 1,
    percent:''
},{
    team: '',
    t_png:'./Teams/lion.png',
    game:'',
    win: 4,
    lose: 2,
    safe: 0,
    percent:''
},{
    team: '',
    t_png:'./Teams/dragon.png',
    game:'',
    win: 3,
    lose: 5,
    safe: 0,
    percent:''
},{
    team: '',
    t_png:'./Teams/f.png',
    game:'',
    win: 3,
    lose: 4,
    safe: 1,
    percent:''
}]




function removeCardInfo() {
    $('.card_info').css('display','none');
}


$('.fanscard').hover(function (e) {
    // 會員等級
    let card_name = this.closest('div').getAttribute('data-name');

    // 會員福利（black-0, yellow-1, pink-3）
    let card_num = this.closest('div').getAttribute('data-num');

    $('.card_info h3.card_lel').text(card_name);
    cards_info.forEach(function (item, index) {
        // console.log(item);
        if(index == card_num){
            $('.card_info').css('background', item.bg_color);
            $('.card_info p.bonus').html(item.bonus).css('color',item.color);
            $('.card_info .card_lel').css('color',item.color)
        }
    })

})

$('.fanscard').mouseenter(function (e) {
    $('.card_info').css('opacity','1');
}).mouseleave(function (e) {
    $('.card_info').css('opacity','0');
})



// 計算公式為：
// 勝率 = 勝場 ÷ （勝場 + 敗場）
TeamsData.forEach(function (item,index,arr) {

    // 完賽數
    item.game = item.win + item.lose + item.safe
    // console.log(item.game);

    let team_png = item.t_png.split('/')[2];
    let team_name = team_png.split('.png')[0];
    item.team = team_name;

    // 計算勝率
    item.percent = (item.win / (item.win + item.lose)).toFixed(3)
    // console.log(item.team, item.game, item.percent);
})



// $('.my-class').each(function(index, element) {
//     // 對每個元素進行處理
//     var $element = $(element);
//     var attributeValue = $element.attr('my-attribute');
//     console.log(attributeValue);
//   });


// 計算勝率由大至小排列
function arrWinPercent() {
    for (let i = 0; i < TeamsData.length; i++) {
        // const item = TeamsData[i];
        for (let j = i+1; j < TeamsData.length; j++) {
            const element = TeamsData[j];
            if(TeamsData[i].percent < TeamsData[j].percent){
                // [TeamsData[i].percent, TeamsData[j].percent] = [TeamsData[j].percent, TeamsData[i].percent];
            }

        }
        // console.log(TeamsData[i].percent);
    }
}
// arrWinPercent();


$('td.percent').each(function (index,item) {
    let $item = $(item);
    // console.log(index,item);
    // console.log(item.getAttribute('data-num'));

    if(index+1 == item.getAttribute('data-num')){
        item.attributeValue = TeamsData[index].percent;
        // console.log(item.attributeValue);
        // console.log($('td.percent[index]'));
        // $('td.percent').text(TeamsData[index].percent)

        $item.text(item.attributeValue)
        // console.log($item.text());
    }
})



const arr = [1,13,99,37,135];
// console.log(arr);
// [arr[0], arr[3]] = [arr[3] , arr[0]];
// console.log(arr);

let count = 0;
for (let i = 0; i < arr.length; i++) {
    for (let j = i+1; j < arr.length; j++) {
        if (arr[i] < arr[j]) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            count += 1;
        }
    }
}
// console.log(arr);




function renderState() {
    let str = '';
    TeamsData.forEach(function (item,index) {
        str += `
        <tr data-row='${index+1}'>
            <td class="teams">
                <img src="${item.t_png}" alt="">
            </td>
            <td class="win">${item.win}</td>
            <td class="lose">${item.lose}</td>
            <td class="safe">${item.safe}</td>
            <td class="percent" data-num="${index+1}">${item.percent}</td>
        </tr>
        `;
        console.log(str);
    })
    $('tbody').html(str);
}

renderState();


// for (let i = 0; i < TeamsData.length; i++) {
//     // const item = TeamsData[i];
//     for (let j = i+1; j < TeamsData.length; j++) {
//         const element = TeamsData[j];
//         if(TeamsData[i].percent < TeamsData[j].percent){
//             [TeamsData[i].percent, TeamsData[j].percent] = [TeamsData[j].percent, TeamsData[i].percent];
//         }

//     }
//     // console.log(TeamsData[i].percent);
// }


const table = document.querySelector('table');
const rows = Array.from(table.querySelectorAll('tr')).slice(1);

rows.sort((row1, row2) => {
  const percent1 = parseFloat(row1.querySelector('.percent').textContent);
  const percent2 = parseFloat(row2.querySelector('.percent').textContent);
  return percent2 - percent1;
});

rows.forEach((row, index) => {
  row.dataset.row = index + 1;
  table.appendChild(row);
});


// Jquery
// $(document).ready(function() {
//     var rows = $('table').find('tr:gt(0)').toArray();
//     rows.sort(function(a, b) {
//       var keyA = parseFloat($(a).find('.percent').text());
//       var keyB = parseFloat($(b).find('.percent').text());
//       return keyB - keyA;
//     });
//     $.each(rows, function(index, row) {
//       $('table').children('tbody').append(row);
//     });
//   });
