quranApp.directive("pageContent", function pageContent() {
    return {
        transclude: 'element',
        scope: {
            pdimension: '=dimension'
        },
        compile: function (element, attrs, transcludeFn) {
            return function ($scope, $element, $attr) {
                $element.style.width = pdimension.width;
                $element.style.height = pdimension.height;
                console.log("width: " + pdimension.width + ", height: " + pdimension.height);
            }
        }
    };
});