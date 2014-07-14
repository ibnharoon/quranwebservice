quranApp.directive("imgSrc", function imgSrc() {
    return {
        restrict: 'A',
        scope: {
            imageUrl: '=imgUrl'
        },
        compile: function (element, attrs) {
            return function link($scope, $element) {
                console.log("imgURL: " + $scope.imageUrl);
                var ctx = $element.getContext('2d');
                var img = new Image();
                img.src = $scope.imageUrl;
                ctx.drawImage(img, 0, 0);
            };
        }
    };
});