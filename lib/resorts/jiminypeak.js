var select = require('cheerio-soupselect').select;
var coerce = require('../tools/coerce');
var debug = require('debug')('liftie:resort:jiminypeak');

function parse(dom) {
  var liftStatus = {};

  select(dom, '#main-no-side h3').forEach(function(node) {
    if ('LIFTS' !== node.children[0].data) {
      return;
    }

    select(node.next, 'tr').forEach(function(node, index) {
      if (index === 0) {
        return;
      }
      var name = node.children[0].children[0].data,
        status = node.children[1].children[0].data;
      liftStatus[name] = coerce(status);
    });
  });

  debug('Jiminy Peak Lift Status:', liftStatus);
  return liftStatus;
}

module.exports = {
  name: 'Jiminy Peak',
  url: {
    host: 'http://www.jiminypeak.com',
    pathname: '/snow-report'
  },
  tags: ['Massachusetts', 'New England'],
  parse: parse
};