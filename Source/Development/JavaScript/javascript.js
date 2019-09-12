console.time('t');

var content = document.querySelector('#content');
var contentScroll = document.querySelector('#content .content__scroll');
var contentItem = document.querySelectorAll('#content .content__item');

function marking() {
    var docWidth = content.clientWidth;

    var group = Math.round(docWidth / contentItem[0].clientWidth) * 2;
    for (var i = 0; i < contentItem.length; i++) contentItem[i].style.width = '';
    contentScroll.innerHTML = '';
    contentScroll.style.width = '';

    var itemArr = Array.prototype.slice.call(contentItem);
    for (var i = 0; i < itemArr.length; i+=group) {
        var groupN = itemArr.slice(i,i+group);
        var div = document.createElement('div');
        div.classList.add('content__block');

        for (var j = 0; j < groupN.length; j++) div.appendChild(groupN[j]);
        contentScroll.appendChild(div);
    }

    if (docWidth > 768) {
        var contentBlock = document.querySelectorAll('#content .content__block');
        var CBLength = contentBlock.length;

        contentScroll.style.width = 100 * CBLength + '%';
        for (var i = 0; i < CBLength; i++) contentBlock[i].style.width = 100 / CBLength + '%';

        if (CBLength > 1) {
            var lastBlock = contentBlock[CBLength - 1];
            var lastBlockLength = lastBlock.childElementCount || lastBlock.childNodes.length;
            var lastBlockChild = lastBlock.children || lastBlock.childNodes;
            var contentItemWidth = contentItem[0].clientWidth;

            var last = lastBlockLength === 1 || lastBlockLength === 3 || lastBlockLength%2 === 0;
            if (last) lastBlock.style.width = Math.round(lastBlockLength/2) * contentItemWidth + 'px';

            for (var i = 0; i < lastBlockLength; i++) lastBlockChild[i].style.width = contentItemWidth + 'px';
            var scrollWidth = 0;
            for (var i = 0; i < CBLength; i++) {
              contentBlock[i].style.width = contentBlock[i].clientWidth + 'px';
              scrollWidth += contentBlock[i].clientWidth;}
            contentScroll.style.width = scrollWidth + 'px';
        }
    }
    var conItem = document.querySelectorAll('#content .content__item');
    for (var i = 0; i < conItem.length; i++) conItem[i].style.height = conItem[0].clientWidth / 1.8 + 'px';
}// end marking


function eve(e) {
    var _this = this;
    var scrollDistance = 40;
    var key = e.key;
    var Y = e.deltaY;
    var rightOrLeft = null;
    var thisScroll = _this.scrollLeft;
    if (Y > 0 || key === 'ArrowRight') rightOrLeft = 1;
    if (Y < 0 || key === 'ArrowLeft') rightOrLeft = -1;
    if (thisScroll >= _this.scrollWidth - _this.clientWidth && Y > 0 || thisScroll <= 0 && Y < 0) return;
    e.preventDefault();
    var finalScroll = rightOrLeft*scrollDistance;
    _this.scrollLeft += finalScroll;
}

marking();
window.addEventListener('resize', marking);
// window.onresize = size__scroll();

content.addEventListener('wheel', eve);
content.addEventListener('keydown', eve);

console.timeEnd('t');
