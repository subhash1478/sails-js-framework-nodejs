var output = require('./logging');
var utils = require('./utils');
var util = require('util');
var $ = utils.getLocaleString;

function getHumanReadableFromCamelCase (inName) {
  if (!inName) {
    return inName;
  }

  var varName = inName;
  var outName = '';

  var i = 0;
  while (i < varName.length) {
    if (i === 0 || varName[i] === varName[i].toUpperCase()) {
      if (i > 0) {
        outName += ' ';
      }

      var abbrWords =['VM', 'IP', 'RM', 'OS', 'NAT', 'IDs', 'DNS', 'VNet', 'ASN', 'SubNet', 'TLSv1_0', 'TLSv1_1', 'TLSv1_2'];
      var matched = false;
      var matchedAbbr = '';
      abbrWords.every(function (item) {
        if (varName.substring(i).lastIndexOf(item, 0) === 0) {
          matched = true;
          matchedAbbr = item;
          return false;
        }
        return true;
      });

      if (matched) {
        outName += matchedAbbr;
        i = i + matchedAbbr.length;
      } else {
        var j = i + 1;
        while ((j < varName.length) && varName[j] === varName[j].toLowerCase()) {
          j++;
        }
        outName += varName.substring(i, j);
        i = j;
      }
    } else {
      i++;
    }
  }

  return outName;
}

function showKeyValue (key, value, indent) {
  output.nameValue(utils.capitalizeFirstLetter(getHumanReadableFromCamelCase(key)), value, indent);
}

function traverseObject (obj, indent) {
  if (!indent) {
    indent = 0;
  }

  if (typeof obj !== 'string') {
    for (var i in obj) {
      var item = obj[i];
      if (typeof item !== 'object') {
        if ((i !== 'id' && i !== 'resourceId') || Object.keys(obj).length === 1) {
          showKeyValue.apply(null, [i, item, indent]);
        }
      } else if (Object.prototype.toString.call(item) === '[object Date]') {
        showKeyValue.apply(null, [i, item, indent]);
      } else {
        if (item !== null) {
          if (i === 'tags') {
            showKeyValue.apply(null, [i, JSON.stringify(item), indent]);
            continue;
          }
          var header = utils.capitalizeFirstLetter(getHumanReadableFromCamelCase(i));
          if (!(item instanceof Array)) {
            output.header(header, indent);
            traverseObject(item, indent + 2);
          } else if (item.length === 0) {
            showKeyValue.apply(null, [i, '[]', indent]);
          } else {
            output.header(header, indent);
            for (var j in item) {
              traverseObject(item[j], indent + 2);
              if (typeof item[j] === 'object') {
                output.data('');
              }
            }
          }
        }
      }
    }
  } else {
    output.list([utils.capitalizeFirstLetter(getHumanReadableFromCamelCase(obj))], indent, false);
  }
}

exports.traverse = traverseObject;

var internalFields = ['id','resourceId', 'resourceGuid', 'etag', 'type'];

exports.showTableRow = function (row, obj) {
  var maxFields = 12;

  if (obj.id) {
    var groupMatch = obj.id.match(/subscriptions\/[a-z0-9\-]+\/resourceGroups\/([^\/]+)\/.*/i);
    if (groupMatch && groupMatch[1]) {
      row.cell($('Resource group'), groupMatch[1]);
    }
  }

  var fieldsCount = Object.keys(obj).length;
  for (var i in obj) {
    var item = obj[i];
    if (typeof item !== 'object') {
      if (internalFields.indexOf(i) === -1) {
        row.cell($(utils.capitalizeFirstLetter(getHumanReadableFromCamelCase(i))), item);
      }
    } else {
      if (item !== null) {
        if (i === 'tags') {
          row.cell($('Tags'), JSON.stringify(item));
        } else if (i === 'name' && item.localizedValue) {
          row.cell($('Name'), item.localizedValue);
        } else if (item instanceof Array && fieldsCount < maxFields) {
          row.cell($(utils.capitalizeFirstLetter(getHumanReadableFromCamelCase(i + ' #'))), item.length);
        }
      }
    }
  }
};

exports.removeEmptyObjects = function (test) {
  var self = this;
  for (var i in test) {
    var obj = test[i];
    if (obj instanceof Object) {
      if (Object.getOwnPropertyNames(obj).length === 0) {
        delete test[i];
      } else {
        self.removeEmptyObjects(obj);
      }
    }
  }
};

exports.removeEmptyArrays = function(test) {
  var self = this;
  for (var i in test) {
    if (test[i] instanceof Array) {
      // Perform clean up after removeEmptyObjects call
      for(var j = 0; j < test[i].length; j++) {
        if(typeof(test[i][j]) === 'undefined') {
          test[i].splice(j, 1);
        }
      }
      if(test[i].length === 0) {
        delete test[i];
      }
    } else if (typeof test[i] === 'object') {
      self.removeEmptyArrays(test[i]);
    }
  }
};

exports.generateResourceId = function(subscriptionId, resourceGroup, appGatewayName, resourceType, resourceName) {
  var id = '';
  id += '/subscriptions/';
  id += encodeURIComponent(subscriptionId);
  id += '/resourceGroups/';
  id += encodeURIComponent(resourceGroup);
  id += '/providers/';
  id += 'Microsoft.Network';
  id += '/applicationGateways/';
  id += encodeURIComponent(appGatewayName);
  id += util.format($('/%s'), resourceType);
  id += util.format($('/%s'), resourceName);
  return id;
};

exports.findIndexByKeyValue = function(inputArray, key, value) {
  for (var i = 0; i < inputArray.length; i++) {
    if (inputArray[i][key] === value) {
      return i;
    }
  }
  return -1;
};

exports.generateResourceIdCommon = function(subscriptionId, resourceGroup, itemType, name, component) {
    var id = '';
    id += '/subscriptions/';
    id += encodeURIComponent(subscriptionId);
    id += '/resourceGroups/';
    id += encodeURIComponent(resourceGroup);
    id += '/providers/';
    if(!component) {
      id += 'Microsoft.Network/';
    } else {
      id += 'Microsoft.' + component + '/';
    }
    id += itemType + '/';
    id += encodeURIComponent(name);
    return id;
};

/* 
  Split string by a character ignoring similar characters in quotation marks
  Example: '"123,321",345' would be split into ['123,321', '345']
*/
exports.splitStringByCharacter = function (str, char, quotationMarks, trimResult) {
  if (!char) char = ' ';
  if (!quotationMarks) quotationMarks = '\"\'';
  if (trimResult === undefined) trimResult = true;

  // /(?:[^\" ]+|[\"][^\"]*[\"])/g
  var regex = new RegExp(
    '(?:[^' + quotationMarks + char + ']+' +
    '|' +
    '[' + quotationMarks + '][^' + quotationMarks + ']*[' + quotationMarks + '])', 'g');
  var result = str.match(regex) || [];

  if (trimResult) {
    // /^[\"]([^\"]*)[\"]$/
    regex = new RegExp('^[' + quotationMarks + ']([^' + quotationMarks + ']*)[' + quotationMarks + ']$');
    result = result.map(function (value) {
      var match = value.match(regex);
      if (match && match.length) {
        return match[1];
      } else {
        return value;
      }
    });
  }

  return result;
};

exports.getISODate = function (dayOffest) {
  var date = new Date();
  if (dayOffest && dayOffest > 0) {
    date.setDate(date.getDate() + dayOffest);
  }
  return date.toISOString();
};

var testUtils;
exports.executeCommand = function (suite, retry, cmd, callback) {
  if (!testUtils) {
    testUtils = require('../../test/util/util');
  }
  if (typeof cmd === 'string') {
    cmd = exports.splitStringByCharacter(cmd, ' ', '\'');
  }
  testUtils.executeCommand(suite, retry, cmd, callback);
};
