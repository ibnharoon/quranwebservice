var minPage = 1;
var maxPage = 604;
var currentPage = 1;
var slidingWindowSize = 6;
var activeWindowOffset = 2;
var activeWindow = 2;
var pages = [];
var imagePerPage = 1;

// add pages from right to left
if ( currentPage > (slidingWindowSize - activeWindowOffset) && currentPage < (maxPage - activeWindowOffset) ) {
    startPage = currentPage - activeWindowOffset - 1;
} else if ( currentPage <= (slidingWindowSize + activeWindowOffset) ) {
    startPage = 1;
    activeWindow = slidingWindowSize - currentPage;
} else if ( currentPage >= (maxPage - activeWindowOffset) ) {
    startPage = maxPage - slidingWindowSize + 1;
    activeWindow = maxPage - currentPage;
}
endPage = startPage + slidingWindowSize - 1;
console.log("current page: " + currentPage + ", active window: " + activeWindow + ", start page: " + startPage + ", endpage: " + endPage);

for (var i = startPage; i <= endPage; i++) {
    for (var j = 0; j < imagePerPage; j++) {
        console.log("adding page: " + (i+j));
        pages.unshift({
            pageNumber: (i + j),
            image: "images/page" + ("000" + (i + j)).substr(-3, 3) + ".svg"
        });
    }
}

function refreshImageCache(thisPage, direction, rpages) {
    console.log("this page: " + thisPage);
    beginPage = thisPage - ((slidingWindowSize - activeWindowOffset - 1) * imagePerPage);
    endPage = thisPage + (activeWindowOffset * imagePerPage);
    for ( var k = 0; k < slidingWindowSize; k++ ) {
        console.log("before paging " + direction + ": " + pages[k].pageNumber);
    }
    if ( direction === "left" ) {
        console.log("shifting left add to end page: " + endPage);
        pages.unshift({
            pageNumber: endPage,
            image: "images/page" + ("000" + endPage).substr(-3, 3) + ".svg"
        });

        pages.pop();
        rpages = pages;
    } else if ( direction === "right" ) {
        console.log("shifting right add to begin page: " + beginPage);
        pages.shift();

        pages.push({
            pageNumber: beginPage,
            image: "images/page" + ("000" + beginPage).substr(-3, 3) + ".svg"
        });
        rpages = pages;
    }
    for ( var k = 0; k < slidingWindowSize; k++ ) {
        console.log("after paging " + direction + ": " + pages[k].pageNumber);
    }
}

quranApp.controller("pageController", function pageController($scope) {
    //$scope.imageDimension = 138240 * 223632;
    $scope.dimension = {
        "width": 320,
        "height": 518,
        "lnavwidth" : 40,
        "rnavwidth" : 40,
        "topoutline" : 40,
        "bottomoutline" : 40
    };

    if ( $(window).height() > (518 + 80) ) {
        $scope.scalefactor = ($(window).height() - 80)/518;
        $scope.dimension['height'] = $(window).height() - 80;
        $scope.dimension['width'] = 320 * $scope.scalefactor;
    }
    console.log("width: " + $scope.dimension['width'] + ", height: " + $scope.dimension['height']);

    if ( $scope.pages == null ) {
        $scope.pages = pages;
    }

    $scope.prevPage = function () {
        $scope.direction = 'right';
        console.log("current page: " + currentPage + ", active window: " + activeWindow);
        var noRefresh = false;
        if ( currentPage > 1 ) {
            currentPage = currentPage - imagePerPage;
            if ( currentPage < (slidingWindowSize - activeWindowOffset) || (currentPage > (maxPage - activeWindowOffset - 1)) ) {
                noRefresh = true;
            }
        } else {
            return;
        }

        if ( noRefresh ) {
            console.log("before update active window: " + activeWindow);
            if ( activeWindow < (slidingWindowSize - 1) ) {
                activeWindow = activeWindow + imagePerPage;
            }
            console.log("after update active window: " + activeWindow);
        } else {
            console.log("Right button pressed, going to previous new current page: " + currentPage + ", activeWindow: " + activeWindow);
            refreshImageCache(currentPage, $scope.direction, $scope.pages);
        }
    };

    $scope.nextPage = function () {
        $scope.direction = 'left';
        var noRefresh = false;
        console.log("current page: " + currentPage + ", active window: " + activeWindow);
        if ( currentPage < maxPage ) {
            currentPage = currentPage + imagePerPage;

            if ( currentPage > (maxPage - activeWindowOffset) || currentPage < (slidingWindowSize - activeWindowOffset + 1)) {
                noRefresh = true;
            }
        } else {
            return;
        }

        if ( noRefresh ) {
            console.log("before update active window: " + activeWindow);
            if (activeWindow > 0 ) {
                activeWindow = activeWindow - imagePerPage;
            } else {
                activeWindow = 0;
            }
            console.log("after update active window: " + activeWindow);
        } else {
            console.log("Left button pressed, going to next new current page: " + currentPage + ", activeWindow: " + activeWindow);
            refreshImageCache(currentPage, $scope.direction, $scope.pages);
        }
    };

    $scope.isCurrentPage = function (index) {
        return activeWindow === index;
    };
});
