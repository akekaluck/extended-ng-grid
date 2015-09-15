//var ngStyleProvider = function($scope, grid) {
//    $scope.headerCellStyle = function(col) {
//        return { "height": col.headerRowHeight + "px" };
//    };
//    $scope.rowStyle = function (row) {
//        var ret = { "top": row.offsetTop + "px", "height": $scope.rowHeight + "px" };
//        if (row.isAggRow) {
//            ret.left = row.offsetLeft;
//        } else {
//            //TODO: check condition
//            if(this.$parent.options !== undefined) {
//                if (this.$parent.options.highlightFn !== undefined) {
//                    this.$parent.options.highlightFn(row, ret);
//                }
//            }
//        }
//        return ret;
//    };
//    $scope.canvasStyle = function() {
//        return { "height": grid.maxCanvasHt + "px" };
//    };
//    $scope.headerScrollerStyle = function() {
//        return { "height": grid.config.headerRowHeight + "px" };
//    };
//    $scope.topPanelStyle = function() {
//        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.topPanelHeight() + "px" };
//    };
//    $scope.headerStyle = function() {
//        return { "width": grid.rootDim.outerWidth + "px", "height": grid.config.headerRowHeight + "px" };
//    };
//    $scope.groupPanelStyle = function () {
//        return { "width": grid.rootDim.outerWidth + "px", "height": "32px" };
//    };
//    $scope.viewportStyle = function() {
//        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.viewportDimHeight() + "px" };
//    };
//    $scope.footerStyle = function() {
//        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.footerRowHeight + "px" };
//    };
//};
var autoRowHeight = function(row){
    //
    var maxCellHeigh = 0;
//    var cells = row.elm.find('.ngCell [ng-cell-text]');

    var cells = row.elm.find('.ngCell');
    for(var i = 0; i< cells.length; i++) {
        var cellHeight = 0;
        if($(cells[i]).find('[ng-cell-text]').length > 0){
            //Normal cell
            cellHeight = $($(cells[i]).find('[ng-cell-text]')[0]).outerHeight();
        } else {
            //cell use cellTemplate
//            cellHeight = $(cells[i]).outerHeight();
            var cellTemplateHeight = $(cells[i]).find('div[ng-cell]');
            cellHeight = $(cellTemplateHeight).outerHeight();
        }
        if (maxCellHeigh < cellHeight) {
            maxCellHeigh = cellHeight;
        }
    }

//    console.log('row[' + row.rowIndex+ '] = '+ maxCellHeigh);
    return maxCellHeigh + 20;

//        rowHeight = 0;
//        var cols = row.elm.context.children.length;
//        var getRowContentHeight = function (row) {
//            var height = 0;
//            angular.element.swap(row, { height: 0, overflow: "scroll" }, function () {
//                height = row.scrollHeight;
//            });
//            return height;
//        };
//        for (var r = 0; r < cols; r++) {
//            var newRowContentHeight = getRowContentHeight(row.elm.context.children[r]);
//            if (rowHeight < newRowContentHeight){
//                rowHeight = newRowContentHeight;
//                console.log(rowHeight);
//                console.log(newRowContentHeight);
//            }
//        }
//
//        rowHeight = newRowContentHeight;


//        if (grid.rowCache[row.rowIndex + 1] != null) {
//            grid.rowCache[row.rowIndex + 1].clone.offsetTop = row.offsetTop + rowHeight;
//        }
//        if (grid.rowCache[row.rowIndex - 1] != null) {
//            row.offsetTop = grid.rowCache[row.rowIndex - 1].clone.elm.outerHeight() + grid.rowCache[row.rowIndex - 1].clone.offsetTop;
//            grid.rowCache[row.rowIndex - 1].clone.offsetTop = row.offsetTop;
//        }

};
var ngStyleProvider = function($scope, grid) {
    $scope.headerCellStyle = function(col) {
        return { "height": col.headerRowHeight + "px" };
    };
    $scope.rowStyle = function (row) {
        var rowHeight = $scope.rowHeight;
        if(grid.config.autoRowHeight) {
          rowHeight = autoRowHeight(row, grid, rowHeight);
          if($scope.rowHeight > rowHeight){
              rowHeight = $scope.rowHeight;
          }
          
          if (grid.filteredRows[row.rowIndex + 1] != null) {
              if (grid.filteredRows[row.rowIndex + 1].clone !== undefined) {
                  grid.filteredRows[row.rowIndex + 1].clone.offsetTop = row.offsetTop + rowHeight;
              }
          }
        }

//        else
//        {
//            grid.$viewport[0].style.height = row.offsetTop + rowHeight + 20 + "px";
//        }

        var ret = { "top": row.offsetTop + "px", "height": rowHeight + "px" };
        if (row.isAggRow) {
            ret.left = row.offsetLeft;
        } else {
            //TODO: check condition
            if(this.$parent.options !== undefined) {
                if (this.$parent.options.highlightFn !== undefined) {
                    this.$parent.options.highlightFn(row, ret);
                }
            }
        }
//        console.log(ret.height);
        return ret;
    };
    $scope.canvasStyle = function() {
        return { "height": grid.maxCanvasHt + "px" };
//        return { "height": "" };
    };
    $scope.headerScrollerStyle = function() {
        return { "height": grid.config.headerRowHeight + "px" };
    };
    $scope.topPanelStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.topPanelHeight() + "px" };
    };
    $scope.headerStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": grid.config.headerRowHeight + "px" };
    };
    $scope.groupPanelStyle = function () {
        return { "width": grid.rootDim.outerWidth + "px", "height": "32px" };
    };
    $scope.viewportStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.viewportDimHeight() + "px" };
    };
    $scope.footerStyle = function() {
        return { "width": grid.rootDim.outerWidth + "px", "height": $scope.footerRowHeight + "px" };
    };
};
