var minPage = 1;
var maxPage = 604;
var currentPage = 305;
var beginPage = (currentPage > 4) ? currentPage - 4 : 1;
var endPage = (currentPage <= maxPage) ? currentPage : currentPage + 2;
var cacheSize = 6;
var activePage = 2;

/**
 * Image preloader
 */
/*
 function preloader() {
 if (document.images) {
 var img1 = new Image();
 var img2 = new Image();
 var img3 = new Image();

 img1.src = "http://domain.tld/path/to/image-001.gif";
 img2.src = "http://domain.tld/path/to/image-002.gif";
 img3.src = "http://domain.tld/path/to/image-003.gif";
 }
 }

 function addLoadEvent(func) {
 var oldonload = window.onload;
 if (typeof window.onload != 'function') {
 window.onload = func;
 } else {
 window.onload = function() {
 if (oldonload) {
 oldonload();
 }
 func();
 }
 }
 }
 */

var pages = [];

// add pages from right to left
for (var i = currentPage - 3; i <= currentPage + 2; i++) {
    pages.unshift({
        image: "images/pages_320/page" + ("000" + i).substr(-3, 3) + ".png"
    });
}

getGlyphs(currentPage);

function getGlyphs(page) {
    $.getJSON('http://quranwebservice.elasticbeanstalk.com/glyphs/320/findGlyphByPage/' + page)
        .done(function(json) {
            $.each(json, function(idx, val) {
                $each(val, function(k, v) {
                    console.log( "'" + k + "'='" + v + "'" );
                });
            });
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}

function refreshImageCache(thisPage, direction, rpages) {
    var oldBeginPage = beginPage;
    var oldEndPage = endPage;
    beginPage = (thisPage > 4) ? thisPage - 3 : 1;
    endPage = (thisPage <= maxPage) ? thisPage : thisPage + 2;
    if ( direction === "left" ) {
        console.log("shifting left add to end page: " + endPage);
        if ( beginPage != oldBeginPage ) {
            pages.unshift({
                image: "images/pages_320/page" + ("000" + endPage).substr(-3, 3) + ".png"
            });

            pages.pop();
            rpages = pages;
        }
    } else if ( direction === "right" ) {
        console.log("shifting right add to begin page: " + beginPage);
        if (endPage != oldEndPage) {
            pages.shift();

            pages.push({
                image: "images/pages_320/page" + ("000" + beginPage).substr(-3, 3) + ".png"
            });
            rpages = pages;
        }
    }
}

var pageController = function ($scope) {
    if ( $scope.pages == null ) {
        $scope.pages = pages;
    }

    $scope.prevPage = function () {
        $scope.direction = 'right';
        if ( currentPage > minPage ) {
            currentPage = currentPage - 1;
        } else {
            currentPage = minPage;
            if ( activePage > 0 ) {
                activePage = activePage - 1;
            } else {
                activePage = 0;
            }
        }
        console.log("Right button pressed, going to previous page: " + currentPage);
        refreshImageCache(currentPage, $scope.direction, $scope.pages);
    };

    $scope.nextPage = function () {
        $scope.direction = 'left';
        if ( currentPage < maxPage ) {
            currentPage = currentPage + 1;
        } else {
            currentPage = maxPage;
            if ( activePage < cacheSize ) {
                activePage = activePage + 1;
            } else {
                activePage = cacheSize - 1;
            }
        }
        console.log("Left button pressed, going to next page: " + currentPage);
        refreshImageCache(currentPage, $scope.direction, $scope.pages);
    };

    $scope.isCurrentPage = function (index) {
        return activePage === index;
    };
};
