(function ($) {
    "use strict";
/*--
    Commons Variables
-----------------------------------*/
var $window = $(window);
var $body = $('body');

/*--
    Adomx Dropdown (Custom Dropdown)
-----------------------------------*/
if ($('.adomx-dropdown').length) {
    var $adomxDropdown = $('.adomx-dropdown'),
        $adomxDropdownMenu = $adomxDropdown.find('.adomx-dropdown-menu');

    $adomxDropdown.on('click', '.toggle', function(e){
        e.preventDefault();
        var $this = $(this);
        if(!$this.parent().hasClass('show')) {
            $adomxDropdown.removeClass('show');
            $adomxDropdownMenu.removeClass('show');
            $this.siblings('.adomx-dropdown-menu').addClass('show').parent().addClass('show');
        } else {
            $this.siblings('.adomx-dropdown-menu').removeClass('show').parent().removeClass('show');
        }
    });
    /*Close When Click Outside*/
    $body.on('click', function(e){
        var $target = e.target;
        if (!$($target).is('.adomx-dropdown') && !$($target).parents().is('.adomx-dropdown') && $adomxDropdown.hasClass('show')) {
            $adomxDropdown.removeClass('show');
            $adomxDropdownMenu.removeClass('show');
        }
    });
}

/*--
    Header Search Open/Close
-----------------------------------*/
var $headerSearchOpen = $('.header-search-open'),
    $headerSearchClose = $('.header-search-close'),
    $headerSearchForm = $('.header-search-form');
$headerSearchOpen.on('click', function(){
    $headerSearchForm.addClass('show');
});
$headerSearchClose.on('click', function(){
    $headerSearchForm.removeClass('show');
});

/*--
    Side Header
-----------------------------------*/
var $sideHeaderToggle = $('.side-header-toggle'),
    $sideHeaderClose = $('.side-header-close'),
    $sideHeader = $('.side-header');

/*Add/Remove Show/Hide Class On Depending on Viewport Width*/
function $sideHeaderClassToggle() {
    var $windowWidth = $window.width();
    if( $windowWidth >= 1200 ) {
        $sideHeader.removeClass('hide').addClass('show');
    } else {
        $sideHeader.removeClass('show').addClass('hide');
    }
}
$sideHeaderClassToggle();
/*Side Header Toggle*/
$sideHeaderToggle.on('click', function(){
    if($sideHeader.hasClass('show')){
        $sideHeader.removeClass('show').addClass('hide');
    } else {
        $sideHeader.removeClass('hide').addClass('show');
    }
});
/*Side Header Close (Visiable Only On Mobile)*/
$sideHeaderClose.on('click', function(){
    $sideHeader.removeClass('show').addClass('hide');
});
    
/*--
    Side Header Menu
-----------------------------------*/
var $sideHeaderNav = $('.side-header-menu'),
    $sideHeaderSubMenu = $sideHeaderNav.find('.side-header-sub-menu');

/*Add Toggle Button in Off Canvas Sub Menu*/
$sideHeaderSubMenu.siblings('a').append('<span class="menu-expand"><i class="zmdi zmdi-chevron-down"></i></span>');

/*Close Off Canvas Sub Menu*/
$sideHeaderSubMenu.slideUp();

/*Category Sub Menu Toggle*/
$sideHeaderNav.on('click', 'li a, li .menu-expand', function(e) {
    var $this = $(this);
    if ( $this.parent('li').hasClass('has-sub-menu') || ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
        e.preventDefault();
        if ($this.siblings('ul:visible').length){
            $this.parent('li').removeClass('active').children('ul').slideUp().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-up').addClass('zmdi-chevron-down');
            $this.parent('li').siblings('li').removeClass('active').find('ul:visible').slideUp().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-up').addClass('zmdi-chevron-down');
        } else {
            $this.parent('li').addClass('active').children('ul').slideDown().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-down').addClass('zmdi-chevron-up');
            $this.parent('li').siblings('li').removeClass('active').find('ul:visible').slideUp().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-up').addClass('zmdi-chevron-down');
        }
    }
});

// Adding active class to nav menu depending on page
var pageUrl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
$('.side-header-menu a').each(function() {
    if ($(this).attr("href") === pageUrl || $(this).attr("href") === '') {
        $(this).closest('li').addClass("active").parents('li').addClass('active').children('ul').slideDown().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-down').addClass('zmdi-chevron-up');
    }
    else if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        $('.side-header-menu a[href="index.html"]').closest('li').addClass("active").parents('li').addClass('active').children('ul').slideDown().siblings('a').find('.menu-expand i').removeClass('zmdi-chevron-down').addClass('zmdi-chevron-up');
    }
})

/*--
    Tooltip, Popover & Tippy Tooltip
-----------------------------------*/
/*Bootstrap Tooltip*/
$('[data-toggle="tooltip"]').tooltip();
/*Bootstrap Popover*/
$('[data-toggle="popover"]').popover();
/*Tippy Tooltip*/
tippy('.tippy, [data-tippy-content], [data-tooltip]', {
    flipOnUpdate: true,
    boundary: 'window',
});

/*-- 
    Selectable Table
-----------------------------------*/
function tableSelectable() {
    var $tableSelectable = $('.table-selectable');
    $tableSelectable.find('tbody .selected').find('input[type="checkbox"]').prop('checked', true);
    $tableSelectable.on('click', 'input[type="checkbox"]', function(){
        var $this = $(this);
        if( $this.parent().parent().is('th')) {
            if( !$this.is(':checked') ) {
                $this.closest('table').find('tbody').children('tr').removeClass('selected').find('input[type="checkbox"]').prop('checked', false);
            } else {
                $this.closest('table').find('tbody').children('tr').addClass('selected').find('input[type="checkbox"]').prop('checked', true);
            }
        } else {
            if( !$this.is(':checked') ) {
                $this.closest('tr').removeClass('selected');
            } else {
                $this.closest('tr').addClass('selected');
            }
            if( $this.closest('tbody').children('.selected').length < $this.closest('tbody').children('tr').length ) {
                $this.closest('table').find('thead').find('input[type="checkbox"]').prop('checked', false);
            } else if( $this.closest('tbody').children('.selected').length === $this.closest('tbody').children('tr').length ) {
                $this.closest('table').find('thead').find('input[type="checkbox"]').prop('checked', true);
            }
        }
    });
}
tableSelectable();
    
/*-- 
    To Do List
-----------------------------------*/
function todoList() {
    // Variable
    var $todoList = $('.todo-list'),
        $todoListAddNew = $('.todo-list-add-new');
    //Todo List Check
    $todoList.find('.done').find('input[type="checkbox"]').prop('checked', true);
    $todoList.on('click', 'input[type="checkbox"]', function(){
        var $this = $(this);
        if( !$this.is(':checked') ) {
            $this.closest('li').removeClass('done');
        } else {
            $this.closest('li').addClass('done');
        }
    });
    //Todo List Status Stared
    $todoList.on('click', '.status', function() {
        var $this = $(this);
        if( !$this.hasClass('stared') ) {
            $this.addClass('stared').find('i').removeClass('zmdi-star-outline').addClass('zmdi-star');
        } else {
            $this.removeClass('stared').find('i').removeClass('zmdi-star').addClass('zmdi-star-outline');
        }
    });
    //Todo List Remove
    $todoList.on('click', '.remove', function() {
      $(this).closest('li').remove();
    });
    //Todo List Add New Status Stared
    $todoListAddNew.on('click', '.status input', function() {
        var $this = $(this);
        if( $this.prop('checked') === true ) {
            $this.siblings('.icon').removeClass('zmdi-star-outline').addClass('zmdi-star');
        } else {
            $this.siblings('.icon').removeClass('zmdi-star').addClass('zmdi-star-outline');
        }
    });
    //Todo List Add New
    $todoListAddNew.on("click", '.submit', function(e) {
        e.preventDefault();
        var $content = $(this).siblings('input.content').val(),
            $date = $(this).closest('.todo-list-add-new').data('date') === false ? 'd-none' : 'd-block',
            $status = $(this).siblings('.status').find('input'),
            $stared = $status.prop('checked') === true ? 'stared' : '',
            $staredIcon = $status.prop('checked') === true ? 'zmdi-star' : 'zmdi-star-outline';
        if ($content) {
            $todoList.prepend('<li> <div class="list-action"> <button class="status '+$stared+'"><i class="zmdi '+$staredIcon+'"></i></button> <label class="adomx-checkbox"><input type="checkbox"> <i class="icon"></i></label> </div> <div class="list-content"><p>' + $content + '</p> <span class="time '+$date+'">'+moment(moment.utc().toDate()).format('h:mm a (YYYY-MM-DD)')+'</span> </div> <div class="list-action right"> <button class="remove"><i class="zmdi zmdi-delete"></i></button> </div></li>');
            $(this).siblings('input.content').val("");
            $status.prop('checked', false).siblings('.icon').removeClass('zmdi-star').addClass('zmdi-star-outline');
        }
    });
}
todoList();
    
/*--
    Chat Contact
-----------------------------------*/
var $chatContactOpen = $('.chat-contacts-open'),
    $chatContactClose = $('.chat-contacts-close'),
    $chatContacts = $('.chat-contacts');
$chatContactOpen.on('click', function(){
    $chatContacts.addClass('show');
});
$chatContactClose.on('click', function(){
    $chatContacts.removeClass('show');
});


// Common Resize function
function resize() {
    $sideHeaderClassToggle();
}
// Resize Window Resize
$window.on('resize', function(){
    resize();
});
    
    
function customizer() {
    var $cusHtml = '<div class="customizer-wrapper">';
    $cusHtml += '<a href="#" class="customizer-toggle"><i class="ti-settings"></i></a>';
    $cusHtml += '<div class="inner custom-scroll">';
    $cusHtml += '<div class="dark-rtl-setting">';
    $cusHtml += '<label class="adomx-switch primary toggle-dark"><input type="checkbox"> <i class="lever"></i> <span class="text">Dark Version</span></label>';
    $cusHtml += '<label class="adomx-switch primary toggle-rtl"><input type="checkbox" checked> <i class="lever"></i> <span class="text">RTL Version</span></label>';
    $cusHtml += '</div>';
    $cusHtml += '<ul class="nav mb-20">';
    $cusHtml += '<li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#sidebar-setting">Sidebar</a></li>';
    $cusHtml += '<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#header-setting">Header</a></li>';
    $cusHtml += '<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#primary-setting">Primary</a></li>';
    $cusHtml += '</ul>';
    $cusHtml += '<div class="tab-content">';
    $cusHtml += '<div class="tab-pane fade show active" id="sidebar-setting">';
    $cusHtml += '<h5 class="mb-20">Sidebar Skin Color</h5>';
    $cusHtml += '<button class="cus-radio light" data-target="side-header" data-color="light"><i class="icon"></i>light</button>';
    $cusHtml += '<button class="cus-radio dark active" data-target="side-header" data-color="dark"><i class="icon"></i>dark</button>';
    $cusHtml += '<button class="cus-radio primary" data-target="side-header" data-color="primary"><i class="icon"></i>primary</button>';
    $cusHtml += '<button class="cus-radio secondary" data-target="side-header" data-color="secondary"><i class="icon"></i>secondary</button>';
    $cusHtml += '<button class="cus-radio indigo" data-target="side-header" data-color="indigo"><i class="icon"></i>indigo</button>';
    $cusHtml += '<button class="cus-radio purple" data-target="side-header" data-color="purple"><i class="icon"></i>purple</button>';
    $cusHtml += '<button class="cus-radio pink" data-target="side-header" data-color="pink"><i class="icon"></i>pink</button>';
    $cusHtml += '<button class="cus-radio red" data-target="side-header" data-color="red"><i class="icon"></i>red</button>';
    $cusHtml += '<button class="cus-radio brown" data-target="side-header" data-color="brown"><i class="icon"></i>brown</button>';
    $cusHtml += '<button class="cus-radio orange" data-target="side-header" data-color="orange"><i class="icon"></i>orange</button>';
    $cusHtml += '<button class="cus-radio green" data-target="side-header" data-color="green"><i class="icon"></i>green</button>';
    $cusHtml += '</div>';
    $cusHtml += '<div class="tab-pane fade" id="header-setting">';
    $cusHtml += '<h5 class="mb-20">Header Skin Color</h5>';
    $cusHtml += '<button class="cus-radio light active" data-target="header-top" data-color="light"><i class="icon"></i>light</button>';
    $cusHtml += '<button class="cus-radio dark" data-target="header-top" data-color="dark"><i class="icon"></i>dark</button>';
    $cusHtml += '<button class="cus-radio primary" data-target="header-top" data-color="primary"><i class="icon"></i>primary</button>';
    $cusHtml += '<button class="cus-radio secondary" data-target="header-top" data-color="secondary"><i class="icon"></i>secondary</button>';
    $cusHtml += '<button class="cus-radio indigo" data-target="header-top" data-color="indigo"><i class="icon"></i>indigo</button>';
    $cusHtml += '<button class="cus-radio purple" data-target="header-top" data-color="purple"><i class="icon"></i>purple</button>';
    $cusHtml += '<button class="cus-radio pink" data-target="header-top" data-color="pink"><i class="icon"></i>pink</button>';
    $cusHtml += '<button class="cus-radio red" data-target="header-top" data-color="red"><i class="icon"></i>red</button>';
    $cusHtml += '<button class="cus-radio brown" data-target="header-top" data-color="brown"><i class="icon"></i>brown</button>';
    $cusHtml += '<button class="cus-radio orange" data-target="header-top" data-color="orange"><i class="icon"></i>orange</button>';
    $cusHtml += '<button class="cus-radio green" data-target="header-top" data-color="green"><i class="icon"></i>green</button>';
    $cusHtml += '</div>';
    $cusHtml += '<div class="tab-pane fade" id="primary-setting">';
    $cusHtml += '<h5 class="mb-20">Primary Color</h5>';
    $cusHtml += '<button class="cus-radio color primary active" data-color="primary"><i class="icon"></i>primary</button>';
    $cusHtml += '<button class="cus-radio color indigo" data-color="indigo"><i class="icon"></i>indigo</button>';
    $cusHtml += '<button class="cus-radio color purple" data-color="purple"><i class="icon"></i>purple</button>';
    $cusHtml += '<button class="cus-radio color pink" data-color="pink"><i class="icon"></i>pink</button>';
    $cusHtml += '<button class="cus-radio color red" data-color="red"><i class="icon"></i>red</button>';
    $cusHtml += '<button class="cus-radio color brown" data-color="brown"><i class="icon"></i>brown</button>';
    $cusHtml += '<button class="cus-radio color orange" data-color="orange"><i class="icon"></i>orange</button>';
    $cusHtml += '<button class="cus-radio color green" data-color="green"><i class="icon"></i>green</button>';
    $cusHtml += '</div>';
    $cusHtml += '</div>';
    $cusHtml += '</div>';
    $cusHtml += '</div>';
    
    $body.prepend($cusHtml)
    
    $window.on('load', function(){
        var customizerWrapper = $('.customizer-wrapper'),
            customizerToggle = $('.customizer-toggle'),
            toggleDARK = customizerWrapper.find('.toggle-dark'),
            toggleRTL = customizerWrapper.find('.toggle-rtl'),
            customRadioNotColor = $('.cus-radio:not(.color)'),
            customRadioColor = $('.cus-radio.color');

        customizerToggle.on('click', function(e){
            e.preventDefault();
            customizerWrapper.toggleClass('open');
        });
        
        /*Dark & RTL*/
        toggleDARK.on('click', function(){
            var $this = $(this);
            if($this.find('input[type="checkbox"]').prop('checked')) {
                $body.addClass('skin-dark');
                $body.removeClass (function (index, className) {
                    return (className.match (/\bheader-top-\S+/g) || []).join(' ');
                });
                $body.removeClass (function (index, className) {
                    return (className.match (/\bside-header-\S+/g) || []).join(' ');
                });
            } else if(!$this.find('input[type="checkbox"]').prop('checked')) {
                $body.removeClass('skin-dark');
            }
        });
        toggleRTL.on('click', function(){
            var $this = $(this);
            if($this.find('input[type="checkbox"]').prop('checked')) {
                $body.attr('dir', 'rtl');
            } else if(!$this.find('input[type="checkbox"]').prop('checked')) {
                $body.removeAttr('dir', 'rtl');
            }
        });
        
        /*Side Header & Top Header*/
        customRadioNotColor.on('click', function(e){
            e.preventDefault();
            var $this = $(this),
                $target = $this.data('target'),
                $color = $this.data('color');
            if( $target == 'side-header' ) {
                $body.removeClass (function (index, className) {
                    return (className.match (/\bside-header-\S+/g) || []).join(' ');
                });
            } else if( $target == 'header-top' ) {
                $body.removeClass (function (index, className) {
                    return (className.match (/\bheader-top-\S+/g) || []).join(' ');
                });
            }
            $this.closest('.tab-pane').find('.cus-radio').removeClass('active');
            $this.addClass('active');
            $body.addClass($target+'-'+$color);
        });
        /*Color*/
        customRadioColor.on('click', function(e){
            e.preventDefault();
            var $this = $(this),
                $color = $this.data('color');
            customRadioColor.removeClass('active');
            $this.addClass('active');
            $('#cus-style').attr('href', 'assets/css/style-'+$color+'.css');
        });
    });
    
}
customizer();

/*--
    Custom Scrollbar (Perfect Scrollbar)
-----------------------------------*/ 
$('.custom-scroll').each( function() {
    var ps = new PerfectScrollbar($(this)[0]);
});
    
})(jQuery);

