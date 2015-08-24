# ng-grid : An Angular DataGrid 

Extended to support change  row style callback
This is used for test only.

Add Show search bar at the top of grid.
set options.showSearchBar = true


Add Show search bar at the top of grid.
set options.autoRowHeight = true
    User must overwrite .col0 ... .colN that you used in your grid.
    <style>
        .col0 {
            height: auto !important;
        }
        .col1 {
            height: auto !important;
        }
        .
        .
        .
        .
        .colN {
            height: auto !important;
        }
        .ngCellText {
            white-space: normal !important;
            height: auto !important;
        }
    </style>