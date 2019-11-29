'use strict';
if (!document.body.classList.contains('vkcb')) {
    document.body.classList.add('vkcb');
}

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

chrome.runtime.sendMessage({ method: 'getLocalStorage' }, function (res) {
    if (!res.globalStatus) {
        changeButtons();
        var observer = new MutationObserver(function () {
            changeButtons();
        });
        observer.observe(document.getElementById('content'), {
            childList: true,
            subtree: true
        });
        return;
    }
    document.body.classList.add('-global-off');
});
