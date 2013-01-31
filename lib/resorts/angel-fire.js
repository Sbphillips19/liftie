var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:angel-fire');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#main h4').filter(function (node) {
    return node.children && node.children[0].data === 'Lift Status';
  }).forEach(function (node) {
    node.next.children.filter(function (node) {
      return node.type === 'text';
    }).forEach(function (node) {
      var nameAndStatus = node.data,
        m = nameAndStatus.match(/(\b.*)\s+is\s+(.*)\s*$/);
        if (m) {
          liftStatus[m[1]] = coerce(m[2]);
        }
    });
  });

  debug('Angel Fire Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Angel Fire',
  url: {
    host: 'http://www.angelfireresort.com',
    pathname: '/winter/mountain/snow-report'
  },
  tags: ['New Mexico'],
  parse: parse
};