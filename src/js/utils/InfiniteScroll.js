// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var DOM = require('../utils/DOM');

var SCROLL_MORE_DELAY = 500; // when the user scrolls
var SCROLL_MORE_INITIAL_DELAY = 50; // when we start out at the bottom already

function _evaluate(scrollState) {
  if (scrollState.scrollParent) {
    // are we at the bottom?
    var bottom;
    if (scrollState.scrollParent === document) {
      bottom = window.innerHeight;
    } else {
      bottom = scrollState.scrollParent.getBoundingClientRect().bottom;
    }
    var indicatorRect = scrollState.indicatorElement.getBoundingClientRect();
    // Only if bottom isn't zero. This can happen when content hasn't arrived yet.
    if (bottom && indicatorRect.bottom <= bottom) {
      scrollState.onEnd();
    }
  }
}

function _onScroll(scrollState) {
  // delay a bit to ride out quick users
  clearTimeout(scrollState.scrollTimer);
  scrollState.scrollTimer = setTimeout(function () {
    _evaluate(scrollState);
  }, SCROLL_MORE_DELAY);
}

function _onResize(scrollState) {
  clearTimeout(scrollState.scrollTimer);
  scrollState.scrollTimer = setTimeout(function () {
    _evaluate(scrollState);
  }, SCROLL_MORE_DELAY);
}

var InfiniteScroll = {

  startListeningForScroll: function (indicatorElement, onEnd) {
    var scrollState = {
      onEnd: onEnd,
      indicatorElement: indicatorElement,
      scrollParent: DOM.findScrollParents(indicatorElement)[0]
    };
    scrollState.scrollParent.addEventListener("scroll", _onScroll.bind(null, scrollState));
    window.addEventListener("resize", _onResize.bind(null, scrollState));
    // check in case we're already at the bottom and the indicator is visible
    if (scrollState.scrollParent === document) {
      var rect = indicatorElement.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        scrollState.scrollTimer = setTimeout(onEnd, SCROLL_MORE_INITIAL_DELAY);
      }
    }
    return scrollState;
  },

  stopListeningForScroll: function (scrollState) {
    if (scrollState.scrollParent) {
      clearTimeout(scrollState.scrollTimer);
      scrollState.scrollParent.removeEventListener("scroll", _onScroll);
      window.removeEventListener("resize", _onResize);
      scrollState.scrollParent = null;
    }
  }
};

module.exports = InfiniteScroll;
