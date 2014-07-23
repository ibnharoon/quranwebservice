
quranApp.factory('pageData', function() {
    var pageNumbers =  [];
    var arNum = ['۰', '۱', '۲', '۳', '٤', '۵', '٦', '۷', '۸', '۹'];
    for (var pN = minPage; pN <= maxPage; pN++) {
        var arPN = pN.toString().replace(/[0-9]/g, function(w){
            return arNum[+w]
        });
        pageNumbers.push({ 'pageNumber': pN, 'arPageNumber' : arPN } );
    }
    return pageNumbers;
});

