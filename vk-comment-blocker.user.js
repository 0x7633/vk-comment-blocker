// ==UserScript==
// @name         VK Comment Blocker
// @namespace    vk-comment-blocker
// @version      0.1
// @description  Hides comments in VK in the news feed and on user pages.
// @author       0x7633
// @homepage     https://github.com/0x7633/vk-comment-blocker
// @supportURL   https://github.com/0x7633/vk-comment-blocker/issues
// @match        *://vk.com/*
// @match        *://*vk.com/*
// @grant    GM_addStyle
// ==/UserScript==

GM_addStyle ( `
.wall_module .replies_wrap {
  display: none !important;
  visibility: hidden !important;
}

.wall_module .post_replies_header {
  display: none !important;
  visibility: hidden !important;
}

.vkcb .vkcb-btn {
  float: inherit;
  margin-right: inherit;
}

.wall_module .post_replies_header.show-block {
  display: block !important;
  visibility: visible !important;
}

.wall_module .replies_wrap.vkcb-show {
  display: block !important;
  visibility: visible !important;
}
` );

(function() {
    'use strict';

    function changeButtons() {
        var postRepliesEls = document.querySelectorAll('div.post_info');
        [].forEach.call(postRepliesEls, function (node) {
            if (!node.querySelector('.vkcb-btn')) {
                var repliesWrap = "this.closest('.post_info').querySelector('.replies_wrap').classList.toggle('vkcb-show'); ";
                var repliesHeader = "this.closest('.post_info').querySelector('.post_replies_header').classList.toggle('show-block'); ";
                if (node.querySelector('.like_btn.comment') && node.querySelector('.post_replies_header')) {
                    node.querySelector('.like_btn.comment').classList.add('vkcb-btn');
                    node.querySelector('.like_btn.comment').setAttribute('onclick', repliesWrap + repliesHeader + "return false;");
                }
                else if (node.querySelector('.like_btn.comment') && !node.querySelector('.post_replies_header')) {
                    node.querySelector('.like_btn.comment').classList.add('vkcb-btn');
                    node.querySelector('.like_btn.comment').setAttribute('onclick', repliesWrap + "return false;");
                }
            }
        });
    }

    changeButtons()
    var observer = new MutationObserver(function () {
        changeButtons()
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
})();
