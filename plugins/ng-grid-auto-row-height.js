/**
 * Created by U0145690 on 8/18/2015.
 */
function ngGridAutoRowHeightPlugin () {
    var self = this;
    self.grid = null;
    self.scope = null;

    self.init = function (scope, grid, services) {
        self.domUtilityService = services.DomUtilityService;
        self.grid = grid;
        self.scope = scope;

        var recalcHeightForData = function () { setTimeout(innerRecalcForData, 1); };
        var innerRecalcForData = function () {
            var gridId = self.grid.gridId,
                rowHeight = self.grid.config.rowHeight;

            $('.' + gridId + ' .ngRow [ng-cell-text]').each(function (index, cellText) {
                //+10 for default top and bottom padding of .ngCellText class
                rowHeight = Math.max(rowHeight, $(cellText).outerHeight() + 10);
            });

            if (self.grid.config.rowHeight < rowHeight) {

                self.grid.config.rowHeight = rowHeight;

                //update grid's scope.rowHeight as vertical bars height depends on it
                if (scope.$$phase == '$apply' || scope.$$phase == '$digest') {
                    self.grid.$root.scope().rowHeight = rowHeight;
                } else {
                    scope.$apply(function(){
                        self.grid.$root.scope().rowHeight = rowHeight;
                    });
                }
                self.domUtilityService.RebuildGrid(self.scope, self.grid);
            }
        };

        self.scope.catHashKeys = function () {
            var hash = '',
                idx;
            for (idx in self.scope.renderedRows) {
                hash += self.scope.renderedRows[idx].$$hashKey;
            }
            return hash;
        };

        self.scope.$watch('catHashKeys()', innerRecalcForData);
        self.scope.$watch(self.grid.config.data, recalcHeightForData);
    };
};