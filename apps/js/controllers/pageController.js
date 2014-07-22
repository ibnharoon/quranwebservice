var minPage = 1;
var maxPage = 604;
var slidingWindowSize = 6;
var activeWindowOffset = 2;
var imagePerPage = 1;

quranApp.controller("pageController", function pageController($scope, surahData) {
    // image dimension 138240 x 223632;
    $scope.currentPage = 1;
    $scope.surahName = 'al-fatihah';
    $scope.juzNumber = 1;
    $scope.activeWindow = activeWindowOffset;
    $scope.pages = [];
    $scope.surahs = surahData;
    $scope.currentSurah = {'surahNumber' : 1, 'arabic' : 'الفاتحة'};
    $scope.$watch('currentPage', function(newValue, oldValue) {
        console.log("old value: " + oldValue + ", new value: " + newValue);
        if ( oldValue != newValue ) {
            $scope.updatePages();
        }
    });
    $scope.pageRange = [];
    for (var pN = minPage; pN <= maxPage; pN++) {
        $scope.pageRange.push({ 'pageNumber': pN, 'pageIndex' : pN } );
    }
    console.log("number of pages: " + $scope.pageRange.length);

    function refreshImageCache() {
        console.log("this page: " + $scope.currentPage);
        beginPage = $scope.currentPage - ((slidingWindowSize - activeWindowOffset - 1) * imagePerPage);
        endPage = $scope.currentPage + (activeWindowOffset * imagePerPage);
        for ( var k = 0; k < slidingWindowSize; k++ ) {
            console.log("before paging " + $scope.direction + ": " + $scope.pages[k].pageNumber);
        }
        if ( $scope.direction === "left" ) {
            console.log("shifting left add to end page: " + endPage);
            $scope.pages.unshift({
                pageNumber: endPage,
                image: "images/page" + ("000" + endPage).substr(-3, 3) + ".svg"
            });

            $scope.pages.pop();
        } else if ( $scope.direction === "right" ) {
            console.log("shifting right add to begin page: " + beginPage);
            $scope.pages.shift();

            $scope.pages.push({
                pageNumber: beginPage,
                image: "images/page" + ("000" + beginPage).substr(-3, 3) + ".svg"
            });
        }
        for ( var k = 0; k < slidingWindowSize; k++ ) {
            console.log("after paging " + $scope.direction + ": " + $scope.pages[k].pageNumber);
        }
    }

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

    $scope.prevPage = function () {
        $scope.direction = 'right';
        console.log("current page: " + $scope.currentPage + ", active window: " + $scope.activeWindow);
        var noRefresh = false;
        if ( $scope.currentPage > 1 ) {
            $scope.currentPage = $scope.currentPage - imagePerPage;
            if ( $scope.currentPage < (slidingWindowSize - activeWindowOffset) || ($scope.currentPage > (maxPage - activeWindowOffset - 1)) ) {
                noRefresh = true;
            }
        } else {
            return;
        }

        if ( noRefresh ) {
            console.log("before update active window: " + $scope.activeWindow);
            if ( $scope.activeWindow < (slidingWindowSize - 1) ) {
                $scope.activeWindow = $scope.activeWindow + imagePerPage;
            }
            console.log("after update active window: " + $scope.activeWindow);
        } else {
            console.log("Right button pressed, going to previous new current page: " + $scope.currentPage + ", activeWindow: " + $scope.activeWindow);
            refreshImageCache();
        }
    };

    $scope.nextPage = function () {
        $scope.direction = 'left';
        var noRefresh = false;
        console.log("current page: " + $scope.currentPage + ", active window: " + $scope.activeWindow);
        if ( $scope.currentPage < maxPage ) {
            $scope.currentPage = $scope.currentPage + imagePerPage;

            if ( $scope.currentPage > (maxPage - activeWindowOffset) || $scope.currentPage < (slidingWindowSize - activeWindowOffset + 1)) {
                noRefresh = true;
            }
        } else {
            return;
        }

        if ( noRefresh ) {
            console.log("before update active window: " + $scope.activeWindow);
            if ($scope.activeWindow > 0 ) {
                $scope.activeWindow = $scope.activeWindow - imagePerPage;
            } else {
                $scope.activeWindow = 0;
            }
            console.log("after update active window: " + $scope.activeWindow);
        } else {
            console.log("Left button pressed, going to next new current page: " + $scope.currentPage + ", activeWindow: " + $scope.activeWindow);
            refreshImageCache();
        }
    };

    $scope.isCurrentPage = function (index) {
        return $scope.activeWindow === index;
    };

    $scope.updatePages = function() {
        console.log("updating pages");
        // add pages from right to left
        if ($scope.currentPage > (slidingWindowSize - activeWindowOffset) && $scope.currentPage < (maxPage - activeWindowOffset)) {
            startPage = $scope.currentPage - activeWindowOffset - 1;
        } else if ($scope.currentPage <= (slidingWindowSize + activeWindowOffset)) {
            startPage = 1;
            $scope.activeWindow = slidingWindowSize - $scope.currentPage;
        } else if ($scope.currentPage >= (maxPage - activeWindowOffset)) {
            startPage = maxPage - slidingWindowSize + 1;
            $scope.activeWindow = maxPage - $scope.currentPage;
        }
        endPage = startPage + slidingWindowSize - 1;
        console.log("current page: " + $scope.currentPage + ", active window: " + $scope.activeWindow + ", start page: " + startPage + ", endpage: " + endPage);

        for (var i = startPage; i <= endPage; i++) {
            for (var j = 0; j < imagePerPage; j++) {
                console.log("adding page: " + (i + j));
                $scope.pages.unshift({
                    pageNumber: (i + j),
                    image: "images/page" + ("000" + (i + j)).substr(-3, 3) + ".svg"
                });
            }
        }
    };

    $scope.updatePages();
});
