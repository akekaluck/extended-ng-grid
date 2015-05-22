ngGridDirectives.directive('ngGridSearchBar', ['$compile', '$templateCache', function ($compile, $templateCache) {
    var ngGridSearchBar = {
        scope: false,
        compile: function () {
            return {
                pre: function ($scope, iElement) {
                    if (iElement.children().length === 0) {
                        iElement.append($compile($templateCache.get($scope.gridId + 'searchBarTemplate.html'))($scope));
                    }
                }
            };
        }
    };
    return ngGridSearchBar;
}]);