chrome.runtime.onMessage.addListener(
  function(request, _, sendRespose) {
    var a = ['192.168.33.10', '192.168.0.201'];
    var id = a.indexOf(request.matchPatten);

    changeBackground(id);
  }
);

function changeBackground(id){
  var development = chrome.extension.getURL("img/development.png");
  var classified  = chrome.extension.getURL("img/classified.png");
  var hoge = [
    {
      'body' : {
        'background-image': 'url(' + development + ') !important',
        'background-repeat': 'repeat !important'
      }
    },
    {
      'body' : {
        'background-image': 'url(' + classified + ') !important',
        'background-repeat': 'repeat !important'
      }
    },
    {
      'body' : {
        'background-color': '#eee !important'
      }
    }
  ];
  addStylesheetRule(hoge[id]);
}

// references to: https://developer.mozilla.org/ja/docs/Web/API/CSSStyleSheet.insertRule
function addStylesheetRule (rules){
  var d = document;
  var styleEl = d.createElement('style');
  d.head.appendChild(styleEl);

  var s = styleEl.sheet;
  for (var selector in rules) {
    var props = rules[selector];
    var propStr = '';
    for (var propName in props) {
      var propVal = props[propName];
      var propImportant = '';
      if (propVal[1] === true) {
        // propVal is an array of value/important, rather than a string.
        propVal = propVal[0];
        propImportant = ' !important';
      }
      propStr += propName + ':' + propVal + propImportant + ';\n';
    }
    s.insertRule(selector + '{' + propStr + '}', s.cssRules.length);
  }
}

