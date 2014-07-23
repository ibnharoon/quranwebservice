var minPage = 1;
var maxPage = 604;
var minSurah = 1;
var maxSurah = 114;
var slidingWindowSize = 6;
var activeWindowOffset = 2;
var imagePerPage = 1;

quranApp.controller("pageController", function pageController($scope, surahData, pageData) {
    // image dimension 138240 x 223632;
    $scope.currentPage = 1;
    $scope.juzNumber = 1;
    $scope.currentSurah = 1;
    $scope.activeWindow = activeWindowOffset;
    $scope.pages = [];
    $scope.surahs = surahData;
    $scope.currentSurahNumber = $scope.surahs[$scope.currentSurah - 1];
    $scope.pageRange = pageData;
    $scope.currentPageNumber = $scope.pageRange[$scope.currentPage - 1];
    $scope.endOfPageReached = $scope.currentPage === maxPage;
    $scope.beginOfPageReached = $scope.currentPage === minPage;

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
            $scope.beginOfPageReached = ($scope.currentPage == minPage);
            if ( $scope.currentPage < (slidingWindowSize - activeWindowOffset) || ($scope.currentPage > (maxPage - activeWindowOffset - 1)) ) {
                noRefresh = true;
            }
            $scope.currentPageNumber = $scope.pageRange[$scope.currentPage - 1];
            updateCurrentSurah();
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
            $scope.endOfPageReached = ($scope.currentPage == maxPage);
            if ( $scope.currentPage > (maxPage - activeWindowOffset) || $scope.currentPage < (slidingWindowSize - activeWindowOffset + 1)) {
                noRefresh = true;
            }
            $scope.currentPageNumber = $scope.pageRange[$scope.currentPage - 1];
            updateCurrentSurah();
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

    $scope.updatePage = function(newPageNumber) {
        var oldPageNumber = $scope.currentPageNumber;
        console.log("updating page new page: " + newPageNumber.pageNumber +
            ", old page: " + oldPageNumber.pageNumber);
        if (newPageNumber.pageNumber < minPage || newPageNumber.pageNumber > maxPage) {
            console.log("ignoring pages not in range");
            $scope.currentPageNumber = $scope.pageRange[oldPageNumber.pageNumber - 1];
            return;
        }

        if (newPageNumber.pageNumber != oldPageNumber.pageNumber) {
            $scope.currentPageNumber = $scope.pageRange[newPageNumber.pageNumber - 1];
            $scope.currentPage = $scope.currentPageNumber.pageNumber;
            $scope.endOfPageReached = $scope.currentPage === maxPage;
            $scope.beginOfPageReached = $scope.currentPage === minPage;
            updateCurrentSurah();
            updatePages();
        }
    };

    $scope.updateSurah = function(newSurah) {
        var oldSurah = $scope.currentSurahNumber;
        console.log("new surah: " + newSurah.surahNumber + ", old surah: " + oldSurah.surahNumber);
        if (newSurah.surahNumber < minSurah || newSurah.surahNumber > maxSurah ) {
            console.log("ignoring surah not in range");
            return;
        }

        if ( newSurah.surahNumber != oldSurah.surahNumber ) {
            $scope.currentSurahNumber = $scope.surahs[newSurah.surahNumber - 1];
            $scope.currentSurah = $scope.currentSurahNumber.surahNumber;
            $scope.currentPageNumber = $scope.pageRange[$scope.currentSurahNumber.startPage - 1];
            $scope.currentPage = $scope.currentSurahNumber.startPage;
            $scope.endOfPageReached = $scope.currentPage === maxPage;
            $scope.beginOfPageReached = $scope.currentPage === minPage;
            updatePages();
        }
    };

    function updateCurrentSurah() {
        console.log("current surah before update surah: " + $scope.currentSurahNumber.surahNumber +
            ", start page: " + $scope.currentSurahNumber.startPage + ", arabic: " + $scope.currentSurahNumber.arabic);
        for ( var surahIdx = $scope.surahs.length - 1; surahIdx >= 0; surahIdx-- ) {
            if ( $scope.currentPage >= $scope.surahs[surahIdx].startPage ) {
                $scope.currentSurahNumber = $scope.surahs[surahIdx];
                console.log("surah page found: " + $scope.currentSurahNumber.startPage + ", index: " + surahIdx);
                break;
            }
        }

        console.log("current surah after update surah: " + $scope.currentSurahNumber.surahNumber +
            ", start page: " + $scope.currentSurahNumber.startPage + ", arabic: " + $scope.currentSurahNumber.arabic);
    }

    function updatePages() {
        $scope.beginOfPageReached = ($scope.currentPage == minPage);
        $scope.endOfPageReached = ($scope.currentPage == maxPage);

        // add pages from right to left
        if ($scope.currentPage > (slidingWindowSize - activeWindowOffset) && $scope.currentPage < (maxPage - activeWindowOffset)) {
            startPage = $scope.currentPage - activeWindowOffset - 1;
            $scope.activeWindow = 2;
        } else if ($scope.currentPage <= (slidingWindowSize + activeWindowOffset)) {
            startPage = 1;
            $scope.activeWindow = slidingWindowSize - $scope.currentPage;
        } else if ($scope.currentPage >= (maxPage - activeWindowOffset)) {
            startPage = maxPage - slidingWindowSize + 1;
            $scope.activeWindow = maxPage - $scope.currentPage;
        }

        endPage = startPage + slidingWindowSize - 1;
        console.log("current page: " + $scope.currentPage + ", active window: " + $scope.activeWindow + ", start page: " + startPage + ", endpage: " + endPage);

        $scope.pages = [];
        for (var i = startPage; i <= endPage; i++) {
            for (var j = 0; j < imagePerPage; j++) {
                console.log("adding page: " + (i + j));
                $scope.pages.unshift({
                    pageNumber: (i + j),
                    image: "images/page" + ("000" + (i + j)).substr(-3, 3) + ".svg"
                });
            }
        }
    }

    updatePages();
});
