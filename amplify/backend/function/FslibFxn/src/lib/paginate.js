"use strict";

var _fsLibrary = require("./fsLibrary");

_fsLibrary.FsLibrary.paginate = function (pages, page) {
  var str = "<ul>";
  var active;
  var pageCutLow = page - 1;
  var pageCutHigh = page + 1; // Show the Previous button only if you are on a page other than the first

  if (page > 1) {
    str += '<li class="fs-pagination-page fs-pagination-prev fs-pagination-inactive"><a onclick="FsLibrary.paginate(' + pages + "," + (page - 1) + ')">Previous</a></li>';
  } // Show all the pagination elements if there are less than 6 pages total


  if (pages < 6) {
    for (var p = 1; p <= pages; p++) {
      active = page == p ? "fs-pagination-active" : "fs-pagination-inactive";
      str += '<li class="' + active + '"><a onclick="FsLibrary.paginate(' + pages + ", " + p + ')">' + p + "</a></li>";
    }
  } // Use "..." to collapse pages outside of a certain range
  else {
      // Show the very first page followed by a "..." at the beginning of the
      // pagination section (after the Previous button)
      if (page > 2) {
        str += "<li class=\"fs-pagination-inactive fs-pagination-page\"><a onclick=\"FsLibrary.paginate(".concat(pages, ", 1)\">1</a></li>");

        if (page > 3) {
          str += "<li class=\"fs-pagination-dots\"><a onclick=\"FsLibrary.paginate(".concat(pages, ",") + (page - 2) + ')">...</a></li>';
        }
      } // Determine how many pages to show after the current page index


      if (page === 1) {
        pageCutHigh += 2;
      } else if (page === 2) {
        pageCutHigh += 1;
      } // Determine how many pages to show before the current page index


      if (page === pages) {
        pageCutLow -= 2;
      } else if (page === pages - 1) {
        pageCutLow -= 1;
      } // Output the indexes for pages that fall inside the range of pageCutLow
      // and pageCutHigh


      for (var _p = pageCutLow; _p <= pageCutHigh; _p++) {
        if (_p === 0) {
          _p += 1;
        }

        if (_p > pages) {
          continue;
        }

        active = page == _p ? "fs-pagination-active" : "fs-pagination-inactive";
        str += '<li class="fs-pagination-page ' + active + '"><a onclick="FsLibrary.paginate(' + pages + ", " + _p + ')">' + _p + "</a></li>";
      } // Show the very last page preceded by a "..." at the end of the pagination
      // section (before the Next button)


      if (page < pages - 1) {
        if (page < pages - 2) {
          str += '<li class="fs-pagination-dots"><a onclick="FsLibrary.paginate(' + pages + "," + (page + 2) + ')">...</a></li>';
        }

        str += "<li class=\"fs-pagination-page fs-pagination-inactive\"><a onclick=\"FsLibrary.paginate(".concat(pages, ", ").concat(pages, ")\">") + pages + "</a></li>";
      }
    } // Show the Next button only if you are on a page other than the last


  if (page < pages) {
    str += "<li class=\"fs-pagination-page fs-pagination-next fs-pagination-inactive\"><a onclick=\"FsLibrary.paginate(".concat(pages, ", ") + (page + 1) + ')">Next</a></li>';
  }

  str += "</ul>";
  setStr(str);
  return str;
};

function setStr(str) {
  var fs_page = document.querySelector(".fs-pagination");

  if (fs_page) {
    fs_page.innerHTML = str;
    return;
  }

  setTimeout(function () {
    setStr(str);
  }, 500);
}
//# sourceMappingURL=paginate.js.map
