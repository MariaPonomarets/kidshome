$(function () {
  //navigation
  $('#navbarCollapse').click(showMenu);
  $('#navbarCollapseHide').click(hideMenu);


  function showMenu() {
    $('.menu').css('display', 'block');
    $('#navbarCollapseHide').removeClass('hide-elem');
    $('#navbarCollapse').addClass('hide-elem');
  };

  function hideMenu() {
    $('.menu').css('display', 'none');
    $('#navbarCollapseHide').addClass('hide-elem');
    $('#navbarCollapse').removeClass('hide-elem');
  }
  //carousel
  $("#myCarousel").carousel({ interval: 7000 });

  //gellary click
  $('.card-product').click(function () {
    $('.modal-body').find('img').attr('src', $(this).find('img').attr('src'));
    $('.modal-body').find('p').html($(this).find('p').html());
    $('.modal-body').find('.product-description').html($(this).find('.product-description').html());
    $("#modalProduct").modal();
  });

  $('.slider').click(function (e) {
    $('.modal-body').find('img').attr('src', $(this).find('img').attr('src'));
    $('.modal-body').find('#priceProduct').html($(this).find('.price').html());
    $('.modal-body').find('.product-description').html($(this).find('.description').html());
    $("#modalProduct").modal();
  });

  //show -hide ready obj line
  var flagGellary = false;
  $('#showLine').click(
    function () {
      var arrLine = document.querySelectorAll('.line-ready-obj');
      for (var i = 0; i < arrLine.length; i++) {
        if (arrLine[i].classList.contains('hide-elem')) {
          arrLine[i].classList.remove('hide-elem');
          if (i == (arrLine.length - 1)) {
            $('#showLine .glyphicon').removeClass('glyphicon-menu-down');
            $('#showLine .glyphicon').addClass('glyphicon-menu-up');
            $('#value').text('СКРЫТЬ ГАЛЕРЕЮ');
            flagGellary = true;
          }
          break;
        }
        else {
          if (flagGellary) {
            for (var i = 0; i < arrLine.length; i++) {
              arrLine[i].classList.add('hide-elem');
              //   arrLine[i].addClass('hide-elem');
            }
            $('#showLine .glyphicon').removeClass('glyphicon-menu-up');
            $('#showLine .glyphicon').addClass('glyphicon-menu-down');
            $('#value').text('ПОКАЗАТЬ БОЛЬШЕ');
          }
        }
      }
    });
  //show-modal
  $('.img-box img').click(function () {
    console.log($(this).attr('src'))
    $('#modalReadyObj').find('img').attr('src', $(this).attr('src'));
    $('#modalReadyObj').modal();

  });

  //color house
  $('.shape').click(function () {
    var arr = document.querySelectorAll('.shape');
    var n = arr.length;
    var curEl = $(this);
    var objClassUrl = {
      blue: 'img/3.png',
      brown: 'img/2.png',
      white: 'img/1.png',
      red: 'img/5.png',
      pink: 'img/4.png'
    }
    for (var i in objClassUrl) {
      if (curEl.hasClass(i)) {
        $('#main-img-color').attr('src', objClassUrl[i]);
        for (var k = 0; k < n; k++) {
          if (arr[k].parentNode.classList.contains('active')) {
            arr[k].parentNode.classList.remove('active')
          }
        }
        $(this).parent().addClass('active');
      }
    }
  });
  var messageValid = {
    text: 'Укажите свое имя',
    email: 'Укажите свой e-mail',
    message: 'Напишите нам сообщение',
    emailUncorrect: 'Проверьте свой e-mail',
    allField: 'Заполните все поля верно'
  }
  var data = {
    name: '',
    email: '',
    mes: ''
  }
  //function validetion
  $('#name').blur(function () {
    if ($(this).val() == '') {
      $(this).addClass('invalid');
      $('.error-box').removeClass('hide-elem');
      $('.error-box').html(messageValid.text);
    }
    else {
      if ($(this).hasClass('invalid')) {
        $(this).removeClass('invalid');
        $('.error-box').addClass('hide-elem');
      }
      data.name = $(this).val();
s    }
  });

  $('#message').blur(function () {
    if ($(this).val() == '') {
      $(this).addClass('invalid');
      $('.error-box').removeClass('hide-elem');
      $('.error-box').html(messageValid.message);
    }
    else {
      if ($(this).hasClass('invalid')) {
        $(this).removeClass('invalid');
        $('.error-box').addClass('hide-elem');
      }
      data.mes = $(this).val();
    }
  });

  $('#email').blur(function () {
    var e = document.getElementById('email').value;
    var pat = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    var t = pat.test(e);
    if (e == '') {
      $(this).addClass('invalid');
      $('.error-box').removeClass('hide-elem');
      $('.error-box').html(messageValid.email);
    }
    else {
      if (!pat.test(e)) {
        $(this).addClass('invalid');
        $('.error-box').removeClass('hide-elem');
        $('.error-box').html(messageValid.emailUncorrect);
      }
      else {
        $(this).removeClass('invalid');
        $('.error-box').addClass('hide-elem');
        data.email = $(this).val();
      }
    }
  });

  $('#submit').click(function () {
    if (data.name != '' && data.email != '' && data.mes !== '') {
      console.log("data send");
      data.name = '';
      data.email = '';
      data.mes = '';
      $('#name').val('');
      $('#email').val('');
      $('#message').val('');
    }
    else {
      $('.error-box').removeClass('hide-elem');
      $('.error-box').html(messageValid.allField);
    }
  });

  //product carousel
  var ln = $('.content-box-product').innerWidth();
  var n = document.querySelectorAll('.content-box-product').length;
  var lengthAllEl = ln * n + 40 * n;
  var scroll = lengthAllEl / n;
  var leftMargin = 0;
  var rigthMargin = 0;

  $('.glyphicon-triangle-left').click(function () {
    if (innerWidth > 670) {
      scrollLeft(2);
    }
    else {
      if (innerWidth < 500) {
        scrollLeft(4);
      }
      if (innerWidth < 670) {
        scrollLeft(3);
      }
    }
    function scrollLeft(n) {
      if (leftMargin > n * (-scroll)) {
        leftMargin += -scroll;
        var tmp = leftMargin + 'px';
        $(".slider").animate({
          marginLeft: tmp
        }, 500);
      }
    }
  });
  $('.glyphicon-triangle-right').click(function () {
    if (leftMargin < 0) {
      leftMargin = leftMargin + scroll;
      var tmp = leftMargin + 'px';
      $(".slider").animate({
        marginLeft: tmp
      }, 500);
    }
  });


  setInterval(function () {
    var widthSliderBox = $('#slide2').innerWidth();
    ln = (widthSliderBox - 120) / 3;
    tmp = ln + 'px';
    var arrContentBox = $('.content-box-product');
    changeWidth(arrContentBox, tmp)
    n = document.querySelectorAll('.content-box-product').length;
    lengthAllEl = ln * n + 40 * n;
    scroll = lengthAllEl / n;
    if (innerWidth < 670) {
      ln = (widthSliderBox - 80) / 2;
      tmp = ln + 'px';
      changeWidth(arrContentBox, tmp)
      scroll = ln + 40;

    }
    if (innerWidth < 500) {
      ln = widthSliderBox - 40;
      tmp = ln + 'px';
      changeWidth(arrContentBox, tmp)
      scroll = ln + 40;

    }

  }, 100);

  function changeWidth(arr, tmp) {
    for (var i = 0; i < arr.length; i++) {
      arr.css('width', tmp);
    }
  }
});



window.onresize = function () {
  var width = document.documentElement.clientWidth;
  // console.log(width);
  if (width > 768) {
    $('.menu').css('display', 'flex');
  }
  else {
    $('.menu').css('display', 'none');
    $('#navbarCollapse').removeClass('hide-elem');
  }
};