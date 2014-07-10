var minPage = 1;
var maxPage = 604;
var currentPage = 305;
var beginPage = (currentPage > 4) ? currentPage - 4 : 1;
var endPage = (currentPage <= maxPage) ? currentPage : currentPage + 2;
var cacheSize = 6;
var activePage = 2;

var pages = [];

// add pages from right to left
for (var i = currentPage - 3; i <= currentPage + 2; i++) {
    pages.unshift({
        image: "images/pages_320/page" + ("000" + i).substr(-3, 3) + ".png"
    });
}

getGlyphs(currentPage);

function getGlyphs(page) {
    $.getJSON('http://quranwebservice.appspot.com/rest/Glyph?feq_page_number=' + page)
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

angular.module('quranApp').controller("pageController", function pageController($scope) {
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
});
