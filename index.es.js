function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator$1(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var passiveSupported = false;

try {
  var options = {
    get passive() {
      // This function will be called when the browser
      //   attempts to access the passive property.
      passiveSupported = true;
      return false;
    }

  };
  window.addEventListener("test", null, options);
  window.removeEventListener("test", null, options);
} catch (err) {
  passiveSupported = false;
}
/*
 * @category: static function
 * @description: Create element from string
 * @name: createElement
 * @param: {string} innerHtml - The dom string
 * @returns: {Element} - The web element
 * @example:
 * const element = createElement(<div/>);
 */

var createElement = innerHtml => {
  var template = document.createElement('div');
  template.innerHTML = innerHtml;
  return template.firstChild;
};

var params = {
  cancelTimeout: 1000
};
var setCancelTimeout = timeout => {
  params.cancelTimeout = timeout;
};
var openFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator$1(function* (exts) {
    var ext = (exts || []).join(',');
    return new Promise((resolve, reject) => {
      var isLocked = false;
      var a = createElement("<input type=\"file\" accept=\"".concat(ext, "\"/>"));
      a.addEventListener('change', e => {
        isLocked = true;
        var files = e.target.files;
        var file = files[0];
        file ? resolve(file) : reject(new Error('No such file'));
      });
      window.addEventListener('focus', () => {
        setTimeout(() => {
          if (!isLocked) {
            reject(new Error('Cancel open the file'));
          }
        }, params.cancelTimeout);
      }, {
        once: true
      });
      a.click();
    });
  });

  return function openFile(_x) {
    return _ref.apply(this, arguments);
  };
}();
var openFiles = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator$1(function* (exts, isWebkitDirectory) {
    var ext = (exts || []).join(',');
    return new Promise((resolve, reject) => {
      var isLocked = false;
      var a = createElement("<input type=\"file\" accept=\"".concat(ext, "\" multiple/>"));

      if (isWebkitDirectory) {
        a.setAttribute('webkitdirectory', '');
      } else {
        window.addEventListener('focus', () => {
          setTimeout(() => {
            if (!isLocked) {
              reject(new Error('Cancel open the file'));
            }
          }, params.cancelTimeout);
        }, {
          once: true
        });
      }

      a.addEventListener('change', e => {
        isLocked = true;
        var files = e.target.files;
        resolve(files);
      });
      a.click();
    });
  });

  return function openFiles(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var saveFile = (name, blob) => {
  var a = document.createElement('a');
  a.style.display = 'none';
  var url = URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};
var fileAsText = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator$1(function* (file) {
    return new Promise(resolve => {
      var fr = new FileReader();

      fr.onload = () => {
        resolve(fr.result);
      };

      fr.readAsText(file);
    });
  });

  return function fileAsText(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var prettifyFileSize = function prettifyFileSize(size) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var sizeArr = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  var n = size;
  var index = 0;

  while (n > 1024) {
    n /= 1024;
    index++;
  }

  return n.toFixed(digits) + ' ' + sizeArr[index];
};

function str2ab(str) {
  return new TextEncoder().encode(str);
}

var textToFile = (text, fileName, mimeType) => {
  var arrayBuffer = str2ab(text);
  var file = new File([arrayBuffer], fileName, {
    type: mimeType
  });
  return file;
};

var FileUtils$ = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setCancelTimeout: setCancelTimeout,
  openFile: openFile,
  openFiles: openFiles,
  saveFile: saveFile,
  fileAsText: fileAsText,
  prettifyFileSize: prettifyFileSize,
  textToFile: textToFile
});

var FileUtils = FileUtils$;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/*
 * @category: static function
 * @name: NOOP
 * @description: Empty function
 * @returns: No return value
 */
var NOOP = () => {};
/*
 * @category: static function
 * @description: Create objects types from string array
 * @name: createObjectTypes
 * @param: {Array} objectNames - The keys of object
 * @returns: {Object} - The Objects types
 * @example:
 * const ObjectTypes = createObjectTypes([
 *   'Circle',
 *   'Triangle',
 * ]);
 */

var createObjectTypes = objectNames => {
  return objectNames.reduce((m, i, j) => {
    m[i] = 't' + j.toString(16);
    return m;
  }, {});
};
/*
 * @category: static function
 * @description: Object to array
 * @name: toArray
 * @param: {Object} mapObject - The object
 * @returns: {Array} - The values of object
 * @example:
 * const arr = toArray({
 *   a: '22',
 *   b: '33'
 * });
 * // arr is ['22', '33']
 */

var toArray = mapObject => {
  var array = [];

  for (var i in mapObject) {
    array.push(mapObject[i]);
  }

  return array;
};

var _doForEachObjects = function _doForEachObjects(objects, callback) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var endIndex = arguments.length > 3 ? arguments[3] : undefined;

  if (callback) {
    var length = objects.length;
    endIndex = endIndex || length;

    if (length) {
      for (var i = fromIndex; i < endIndex; i++) {
        callback(objects[i], i);
      }
    } else {
      var index = 0;

      for (var _i in objects) {
        if (index >= fromIndex && index < endIndex) {
          callback(objects[_i], _i);
        }

        index++;
      }
    }
  }
};
/*
 * @category: static function
 * @description: For each by range
 * @name: forEachRange
 * @param: {Object} objects - The object
 * @param: {Function} callback - The iteration function
 * @returns: {Object} - The iteration instance
 * @example:
 * forEachRange({
 *   a: '22',
 *   b: '33'
 * })
 * .from(0)
 * .to(0)
 * .do(() => {});
 */


var forEachRange = (objects, callback) => {
  objects = objects || [];

  _doForEachObjects(objects, callback);

  var startIndex = 0;
  var endIndex = Object.keys(objects).length;
  var instance = {
    from: index => {
      startIndex = index;
      return instance;
    },
    to: index => {
      endIndex = index;
      return instance;
    },
    do: callback => {
      _doForEachObjects(objects, callback, startIndex, endIndex);
    }
  };
  return instance;
};
/*
 * @category: static function
 * @description: The for-each function for Array/Object instance
 * @name: forEach
 * @param: {Object} objects - The object
 * @param: {Function} callback - The iteration function
 * @returns: No return value
 * @example:
 * forEach({
 *   a: '22',
 *   b: '33'
 * }, (value, key, index) => {
 *   // return true to interrupt the for-loop. 
 * });
 */

var forEach = (objects, callback) => {
  if (objects === null || typeof objects === 'undefined') return;

  if (Array.isArray(objects) || objects instanceof NodeList) {
    var length = objects.length;

    if (length) {
      for (var i = 0; i < length; i++) {
        if (callback(objects[i], i, i)) {
          break;
        }
      }
    }
  } else {
    var index = 0;

    for (var _i2 in objects) {
      if (callback(objects[_i2], _i2, index)) {
        break;
      }

      index++;
    }
  }
};
/*
 * @category: static function
 * @description: The for-each async function for Array/Object instance
 * @name: forEachAsync
 * @param: {Object} objects - The object
 * @param: {Function} callback - The iteration function
 * @returns: No return value
 * @example:
 * forEachAsync({
 *   a: '22',
 *   b: '33'
 * }, async (value, key, index) => {
 *   // return true to interrupt the for-loop.
 * });
 */

var forEachAsync = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (objects, callback) {
    if (objects === null || typeof objects === 'undefined') return;

    if (Array.isArray(objects) || objects instanceof NodeList) {
      var length = objects.length;

      if (length) {
        for (var i = 0; i < length; i++) {
          if (yield callback(objects[i], i, i)) {
            break;
          }
        }
      }
    } else {
      var index = 0;

      for (var _i3 in objects) {
        if (yield callback(objects[_i3], _i3, index)) {
          break;
        }

        index++;
      }
    }
  });

  return function forEachAsync(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/*
 * @category: static function
 * @description: Find object by function
 * @name: findObjectBy
 * @param: {Object} objects - The object
 * @param: {Function} byFn - The function used to find matched object
 * @returns: {Any} - Matched object
 * @example:
 * findObjectBy({
 *   name: 'foo'
 * },{
 *   name: 'bar'
 * }, (object) => { return object.name === 'bar' });
 */

var findObjectBy = (objects, byFn) => {
  for (var key in objects) {
    var object = objects[key];

    if (byFn(object)) {
      return object;
    }
  }
};
/*
 * @category: static function
 * @description: Find objects by function
 * @name: findObjectsBy
 * @param: {Object} objects - The object
 * @param: {Function} byFn - The function used to find matched objects
 * @returns: {Array\<Any\>} - Matched objects
 * @example:
 * findObjectsBy({
 *   name: 'foo'
 * },{
 *   name: 'bar'
 * }, (object) => { return !!object; });
 */

var findObjectsBy = (objects, byFn) => {
  var matchedObjects = [];

  for (var key in objects) {
    var object = objects[key];

    if (byFn(object)) {
      matchedObjects.push(object);
    }
  }

  return matchedObjects;
};
/*
 * @category: static function
 * @description: Find object by function in reversed order
 * @name: findObjectReversedBy
 * @param: {Object} objects - The object
 * @param: {Function} byFn - The function used to find matched object
 * @returns: {Any} - Matched object
 * @example:
 * findObjectReversedBy({
 *   name: 'foo'
 * },{
 *   name: 'bar'
 * }, (object) => { return object.name === 'bar' });
 */

var findObjectReversedBy = (objects, byFn) => {
  var keys = Object.keys(objects);

  for (var i = keys.length - 1; i >= 0; i--) {
    var key = keys[i];
    var object = objects[key];

    if (byFn(object)) {
      return object;
    }
  }
};
/*
 * @category: static function
 * @description: Find objects by function in reversed order
 * @name: findObjectsReversedBy
 * @param: {Object} objects - The object
 * @param: {Function} byFn - The function used to find matched objects
 * @returns: {Array\<Any\>} - Matched objects
 * @example:
 * findObjectsReversedBy({
 *   name: 'foo'
 * },{
 *   name: 'bar'
 * }, (object) => { return !!object; });
 */

var findObjectsReversedBy = (objects, byFn) => {
  var matchedObjects = [];
  var keys = Object.keys(objects);

  for (var i = keys.length - 1; i >= 0; i--) {
    var key = keys[i];
    var object = objects[key];

    if (byFn(object)) {
      matchedObjects.push(object);
    }
  }

  return matchedObjects;
};
/*
 * @category: static function
 * @description: Clear all of the keys for object
 * @name: clearKeys
 * @param: {object} object - The object
 * @returns: No return value
 * @example:
 * clearKeys({
 *   name: 'foo'
 * });
 */

var clearKeys = object => {
  forEach(object, (_value, key) => {
    delete object[key];
  });
};
/*
 * @category: static function
 * @description: The map function for Array/Object instance
 * @name: map
 * @param: {Object} objects - The object
 * @param: {Function} callback - The iteration function
 * @returns: {Array\<Any\>} - The object
 * @example:
 * map({
 *   a: '22',
 *   b: '33'
 * }, (value, key, index) => {
 *   return {
 *     name: key,
 *     data: value
 * };
 * });
 */

var map = (objects, callback) => {
  var result = [];
  forEach(objects, (value, key, index) => {
    result.push(callback(value, key, index));
  });
  return result;
};
/*
 * @category: static function
 * @description: The map function for Array/Object instance
 * @name: mapAsync
 * @param: {Object} objects - The object
 * @param: {Function} callback - The iteration function
 * @returns: {Array\<Any\>} - The object
 * @example:
 * mapAsync({
 *   a: '22',
 *   b: '33'
 * }, async (value, key, index) => {
 *   return {
 *     name: key,
 *     data: value
 * };
 * });
 */

var mapAsync = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (objects, callback) {
    var result = [];
    yield forEachAsync(objects, /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(function* (value, key, index) {
        var newValue = yield callback(value, key, index);
        result.push(newValue);
      });

      return function (_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      };
    }());
    return result;
  });

  return function mapAsync(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/*
 * @category: static function
 * @description: The map function for Array/Object instance
 * @name: mapToObject
 * @param: {Object} objects - The object
 * @param: {Function} callback - The iteration function
 * @returns: {Object} - The object
 * @example:
 * mapToObject({
 *   a: '22',
 *   b: '33'
 * }, (value, key, index) => {
 *   return {
 *     key,
 *     value
 * };
 * });
 */

var mapToObject = (objects, callback) => {
  var result = {};
  forEach(objects, (value, key, index) => {
    var newValue = callback(value, key, index);
    result[newValue.key] = newValue.value;
  });
  return result;
};
/*
 * @category: static function
 * @description: Count objects by function
 * @name: countIf
 * @param: {Object} objects - The object
 * @param: {Function} byFn - The function used to find matched object
 * @returns: {Number} - Count of matched object
 * @example:
 * countIf({
 *   name: 'foo'
 * },{
 *   name: 'bar'
 * }, (object) => { return object.name === 'bar' });
 */

var countIf = (objects, byFn) => {
  var count = 0;
  forEach(objects, object => {
    if (byFn(object)) {
      count++;
    }
  });
  return count;
};
/*
 * @category: static function
 * @description: Filter objects by function
 * @name: filter
 * @param: {Object} objects - The object
 * @param: {Function} filterFn - The function used to find matched object
 * @returns: {Array\<Any\>} - The filtered array
 * @example:
 * filter({
 *   name: 'foo'
 * },{
 *   name: 'bar'
 * }, (object) => { return object.name === 'bar' });
 */

var filter = (objects, filterFn) => {
  var result = [];
  forEach(objects, object => {
    if (filterFn(object)) {
      result.push(object);
    }
  });
  return result;
};
/*
 * @category: static function
 * @description: Clone the data by JSON
 * @name: cloneData
 * @param: {Object} data - The object
 * @returns: {Object} - The cloned data
 * @example:
 * const cloned = cloneData({
 *   name: 'foo'
 * },{
 *   name: 'bar'
 * });
 */

var cloneData = data => {
  return JSON.parse(JSON.stringify(data));
};
/*
 * @category: static function
 * @description: Invoke the method by target, with function name, arguments
 * @name: delegate
 * @param: {Object} data - The object
 * @returns: {Any} - The return value of target[fnName]
 * @example:
 * const result = delegate(target, 'getNameById', [id]);
 */

var delegate = (target, fnName, args) => {
  if (target) {
    try {
      var splittedFns = fnName.split('.');
      var caller = target;

      for (var i = 0; i < splittedFns.length - 1; i++) {
        var _fn = splittedFns[i];
        caller = caller[_fn];
      }

      var fn = splittedFns[splittedFns.length - 1];
      return caller[fn].apply(caller, args);
    } catch (err) {}
  }
};
/*
 * @category: static function
 * @description: Alias the functions for object
 * @name: alias
 * @param: {Object} model - The target object
 * @param: {Object} fnAlias - The alias key-value object
 * @returns: No return value
 * @example:
 * alias(target, {
 *   addObject: 'add'
 * });
 * // Now you can use target.add rather than target.addObject
 */

var alias = (model, fnAlias) => {
  forEach(fnAlias, (value, key) => {
    model[value] = function () {
      return delegate(model, key, arguments);
    };
  });
};
/*
 * @category: static function
 * @description: Export the methods from source object to target object
 * @name: exportMethods
 * @param: {Object} target - The target object
 * @param: {Object} source - The source object
 * @param: {Array\<string\>} fnNames - The target object
 * @returns: {Object} - The instance for exportedMethod
 * @example:
 * // source.getObject();
 * exportMethods(target, source, [
 *   'addObject',
 * ]);
 * // Now you can use target.getObject() rather than source.getObject();
 */

var exportMethods = (target, source, fnNames) => {
  forEach(fnNames, fnName => {
    target[fnName] = function () {
      return delegate(source, fnName, arguments);
    };
  });
  return {
    setSource: srcObject => {
      source = srcObject;
    }
  };
};
/*
 * @category: static function
 * @description: Export the methods by function
 * @name: exportMethodsBy
 * @param: {Object} target - The target object
 * @param: {Array\<string\>} fnNames - The function names to export
 * @param: {Function} fn - The export method
 * @returns: {Object} - target
 * @example:
 * exportMethodsBy(target, fnNames, (fnName, args) => {
 *   // TODO delegate the method
 * });
 */

var exportMethodsBy = (target, fnNames, fn) => {
  forEach(fnNames, fnName => {
    target[fnName] = function () {
      return fn(fnName, arguments);
    };
  });
  return target;
};
/*
 * @category: static function
 * @description: Export all of the methods by source object
 * @name: exportAllMethodsBy
 * @param: {Object} target - The target object
 * @param: {Object} source - The source object
 * @param: {Function} byFn - The export method
 * @returns: {Object} - target
 * @example:
 * exportAllMethodsBy(target, fnNames, (fnName, args) => {
 *   // TODO delegate the method
 * });
 */

var exportAllMethodsBy = (target, source, byFn) => {
  forEach(source, (_, fnName) => {
    target[fnName] = function () {
      return byFn(fnName, arguments);
    };
  });
  return target;
};
/*
 * @category: static function
 * @description: Clone the object deeply
 * @name: cloneDeep
 * @param: {Object} object - The object used to clone
 * @returns: {Object} - The cloned object
 * @example:
 * cloneDeep({});
 */

var cloneDeep = object => {
  var cloneValue = value => {
    var typeOfVal = typeof value;

    switch (typeOfVal) {
      case 'undefined':
        // do nothing
        break;

      case 'string':
      case 'number':
      case 'boolean':
        return value;

      case 'object':
        if (value === null || value === undefined) ; else if (Array.isArray(value)) {
          var newValue = [];
          forEach(value, v => {
            newValue.push(cloneValue(v));
          });
          return newValue;
        } else {
          var cloned = {};
          forEach(value, (v, k) => {
            var newVal = cloneValue(v);

            if (typeof newVal !== 'undefined') {
              cloned[k] = newVal;
            }
          });
          return cloned;
        }

        break;
    }
  };

  return cloneValue(object);
};
/*
 * @category: static function
 * @description: Compare two objects deeply
 * @name: deepEqual
 * @param: {Object} object1 - The object used to compare
 * @param: {Object} object2 - The object used to compare
 * @returns: {bool} - Is equaled or not
 * @example:
 * deepEqual({foo: 'bar'}, {bar: 'foo'});
 */

var deepEqual = (object1, object2) => {
  if (object1 === object2) {
    return true;
  } else {
    if (object1.constructor.name === object2.constructor.name && object1.constructor.name === 'Object') {
      return JSON.stringify(object1) === JSON.stringify(object2);
    } else {
      try {
        return JSON.stringify(object1) === JSON.stringify(object2);
      } catch (err) {
        return false;
      }
    }
  }
};
/*
 * @category: static function
 * @description: Diff two objects and return diff data
 * @name: diffTwoObjects
 * @param: {Object} objectsMap1 - The object1 used to diff
 * @param: {Object} objectsMap2 - The object2 used to diff
 * @param: {Function} getObjectId - [optional] The function used to get object id
 * @returns: {Object} - { add, {}, update: {}, remove: {} }
 * @example:
 * diffTwoObjects({}, {});
 */

var diffTwoObjects = (objectsMap1, objectsMap2, getObjectId) => {
  var itemsAdded = {};
  var itemsUpdated = {};
  var itemsRemoved = {};

  getObjectId = getObjectId || (obj => obj.id);

  forEach(objectsMap1, object => {
    var objId = getObjectId(object);

    if (objId in objectsMap2) {
      itemsUpdated[objId] = {
        origin: object
      };
    } else {
      itemsRemoved[objId] = object;
    }
  });
  forEach(objectsMap2, object => {
    var objId = getObjectId(object);

    if (objId in objectsMap1) {
      var updatedContext = itemsUpdated[objId];

      if (updatedContext) {
        if (deepEqual(updatedContext.origin, object)) {
          delete itemsUpdated[objId];
        } else {
          updatedContext.new = object;
        }
      }
    } else {
      itemsAdded[objId] = object;
    }
  });
  return {
    add: itemsAdded,
    update: itemsUpdated,
    remove: itemsRemoved
  };
};
/*
 * @category: static function
 * @description: Create the handler by map
 * @name: createKeyActionHandler
 * @param: {Object} keyHandlerMap - key-function object used to handle the action
 * @returns: {Object} - { handle, apply }
 * @example:
 * const actionHandler = createKeyActionHandler({
 *   foo: (arg1, arg2) => {}
 * });
 * actionHandler
 * .handle('foo')
 * .apply('argument1', 'argument2');
 */

var createKeyActionHandler = keyHandlerMap => {
  var fn;
  var actionHandler = {
    handle: function handle(action) {
      fn = keyHandlerMap[action] || (() => {});

      return actionHandler;
    },
    apply: function apply() {
      var args = arguments;
      fn.apply(args[0], args);
    }
  };
  return actionHandler;
};
/*
 * @category: static function
 * @description: format
 * @name: format
 * @param: {string} text - The string template
 * @returns: {string} - The formatted string
 * @example:
 * const str = format('{0}: {1}', 'id', '123-222');
 */

function format(text) {
  var args = Array.from(arguments).slice(1);
  return text.replace(/{(\d+)}/g, (_matched, indexStr) => {
    var index = parseInt(indexStr, 10);
    return args[index];
  });
}
/*
 * @category: static function
 * @description: formatData
 * @name: formatData
 * @param: {string} text - The string template
 * @param: {Object} data - The text data
 * @returns: {string} - The formatted string
 * @example:
 * const str = format('ObjectID: ${id}, Name: ${name}', {id: '123-222', name: 'Example'})
 */

function formatData(text, data) {
  return text.replace(/\${(.*?)}/g, (_, key) => {
    return data[key] || '';
  });
}
/*
 * @category: static function
 * @description: Convert text to upper camel case
 * @name: toUpperCamel
 * @param: {string} text - The text
 * @returns: {string} - The formatted string
 * @example:
 * const str = toUpperCamel('name');
 */

function toUpperCamel(text) {
  return text[0].toUpperCase() + text.substring(1);
}
/*
 * @category: static function
 * @description: Calculate the length of character
 * @name: getCharacterLength
 * @param: {string} ch - The character
 * @returns: {Number} - The length of character
 * @example:
 * const lenOfN = getCharacterLength('n');
 * const lenOfSymbol = getCharacterLength('>');
 */

var getCharacterLength = ch => {
  var chCode = ch.charCodeAt();

  if (chCode >= 0 && chCode <= 128) {
    return 1;
  } else {
    return 2;
  }
};
/*
 * @category: static function
 * @description: Replace text with '...' if too long
 * @name: getShortText
 * @param: {string} text - The original text
 * @param: {string} maxLength - The max length of text
 * @returns: {string} - The shortened text
 * @example:
 * const text = getShortText('n');
 */

var getShortText = (text, maxLength) => {
  var currentLength = 0;
  var endIndex = 0;

  for (var i in text) {
    var ch = text[i];
    var chLength = getCharacterLength(ch);

    if (currentLength + chLength <= maxLength) {
      currentLength += chLength;
      endIndex++;
    } else {
      endIndex--;
      break;
    }
  }

  if (endIndex === text.length) {
    return text;
  } else {
    return text.substring(0, endIndex) + '...';
  }
};
/*
 * @category: static function
 * @description: Generate uuid
 * @name: uuid
 * @returns: {string} - The uuid
 * @example:
 * const id = uuid();
 */

var uuid = () => {
  var d = Date.now();

  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
  });
};

function _genCode() {
  var d = Math.round(Math.random() * 9999999) % 10;

  if (d <= 4) {
    // 0 - 9
    var code = 48 + Math.round(Math.random() * 9999999) % 10;
    return String.fromCharCode(code);
  } else {
    // 0 - 25
    var _code = 65 + Math.round(Math.random() * 9999999) % 26;

    return String.fromCharCode(_code);
  }
}

var genCode = len => {
  var code = '';

  for (var i = 0; i < len; i++) {
    code += _genCode();
  }

  return code;
};

var ObjectUtils$ = /*#__PURE__*/Object.freeze({
  __proto__: null,
  NOOP: NOOP,
  createObjectTypes: createObjectTypes,
  toArray: toArray,
  forEachRange: forEachRange,
  forEach: forEach,
  forEachAsync: forEachAsync,
  findObjectBy: findObjectBy,
  findObjectsBy: findObjectsBy,
  findObjectReversedBy: findObjectReversedBy,
  findObjectsReversedBy: findObjectsReversedBy,
  clearKeys: clearKeys,
  map: map,
  mapAsync: mapAsync,
  mapToObject: mapToObject,
  countIf: countIf,
  filter: filter,
  cloneData: cloneData,
  delegate: delegate,
  alias: alias,
  exportMethods: exportMethods,
  exportMethodsBy: exportMethodsBy,
  exportAllMethodsBy: exportAllMethodsBy,
  cloneDeep: cloneDeep,
  deepEqual: deepEqual,
  diffTwoObjects: diffTwoObjects,
  createKeyActionHandler: createKeyActionHandler,
  format: format,
  formatData: formatData,
  toUpperCamel: toUpperCamel,
  getCharacterLength: getCharacterLength,
  getShortText: getShortText,
  uuid: uuid,
  genCode: genCode
});

var ObjectUtils = ObjectUtils$;

function fileTypesToExts(fileTypes) {
  const exts = [];
  ObjectUtils.forEach(fileTypes, fileType => {
    ObjectUtils.forEach(fileType.accept, entry => {
      if (Array.isArray(entry)) {
        exts.push.apply(exts, entry);
      } else if (typeof entry === 'string') {
        exts.push.apply(exts, [entry]);
      }
    });
  });
  return exts;
}

class LegacyFileSystemAPI {
  _createReadAPI(file) {
    return {
      getInfo: () => {
        return {
          kind: 'file',
          name: file.name
        };
      },
      getFile: async () => {
        return file;
      }
    };
  }

  _createWriteAPI(file) {
    return {
      write: async content => {
        if (content instanceof Blob) {
          await FileUtils.saveFile(file.name, content);
        } else if (typeof content === 'string') {
          let blob = await FileUtils.textToFile(content, file.name);
          await FileUtils.saveFile(file.name, blob);
        }
      },
      ...this._createReadAPI(file)
    };
  }

  async newFile(fileTypes, content) {
    console.warn('Unsupported API: newFile');
  }

  async openDirectory() {
    console.warn('Unsupported API: openDirectory');
  }

  async openFile(fileTypes) {
    const exts = fileTypesToExts(fileTypes);
    const file = await FileUtils.openFile(exts);
    return await this._createWriteAPI(file);
  }

  async openFiles() {
    console.warn('Unsupported API: openFiles');
  }

  async _saveFile(name, content) {}

  async saveFile(_fileTypes, name, content) {
    const fileAPI = this._createWriteAPI({
      name: name
    });

    await fileAPI.write(content);
    return fileAPI;
  }

}

async function verifyPermission(fileHandle, mode) {
  const options = {
    mode: mode
  }; // Check if permission was already granted. If so, return true.

  if ((await fileHandle.queryPermission(options)) === 'granted') {
    return true;
  } // Request permission. If the user grants permission, return true.


  if ((await fileHandle.requestPermission(options)) === 'granted') {
    return true;
  } // The user didn't grant permission, so return false.


  return false;
}

async function verifyReadPermission(fileHandle) {
  return await verifyPermission(fileHandle, 'read');
}

async function verifyReadWritePermission(fileHandle) {
  return await verifyPermission(fileHandle, 'readwrite');
} // FileType: {
// 	description: 'Json File',
// 	accept: {
// 		'application/json: '.json,
// 	},
// }


class FileSystemAPI {
  _createReadAPI(fileHandle) {
    return {
      getInfo: () => {
        return {
          kind: fileHandle.kind,
          name: fileHandle.name
        };
      },
      getFile: async () => {
        return await fileHandle.getFile();
      }
    };
  }

  _createWriteAPI(fileHandle) {
    return {
      write: async content => {
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
      },
      ...this._createReadAPI(fileHandle)
    };
  }

  async newFile(fileTypes, content) {
    const options = {
      excludeAcceptAllOption: true,
      types: fileTypes
    };
    const fileHandle = await window.showSaveFilePicker(options);
    const isGranted = await verifyReadWritePermission(fileHandle);

    if (isGranted) {
      const fileAPI = this._createWriteAPI(fileHandle);

      if (content) {
        await fileAPI.write(content);
      }

      return fileAPI;
    } else {
      const isReadGranted = await verifyReadPermission(fileHandle);

      if (isReadGranted) {
        return this._createReadAPI(fileHandle);
      } else {
        return {};
      }
    }
  }

  async openDirectory(fileName) {
    try {
      const dirHandle = await window.showDirectoryPicker();

      if (dirHandle && fileName) {
        const fileHandle = await dirHandle.getFileHandle(fileName, {
          create: true
        });

        const fileAPI = this._createWriteAPI(fileHandle);

        return fileAPI;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async openFile(fileTypes) {
    const fileHandles = await window.showOpenFilePicker({
      multiple: false,
      excludeAcceptAllOption: true,
      types: fileTypes
    });
    const fileHandle = fileHandles[0];

    if (fileHandle) {
      const isGranted = await verifyReadWritePermission(fileHandle);

      if (isGranted) {
        const fileAPI = this._createWriteAPI(fileHandle);

        return fileAPI;
      } else {
        const isReadGranted = await verifyReadPermission(fileHandle);

        if (isReadGranted) {
          return this._createReadAPI(fileHandle);
        } else {
          return {};
        }
      }
    }
  }

  async openFiles(fileTypes) {
    const fileHandles = await window.showOpenFilePicker({
      multiple: true,
      excludeAcceptAllOption: true,
      types: fileTypes
    });
    return fileHandles;
  }

  async saveFile(fileTypes, _name, content) {
    const fileHandle = await window.showSaveFilePicker({
      excludeAcceptAllOption: true,
      types: fileTypes
    });
    const isGranted = await verifyReadWritePermission(fileHandle);

    if (isGranted) {
      const fileAPI = this._createWriteAPI(fileHandle);

      if (content) {
        await fileAPI.write(content);
      }

      return fileAPI;
    } else {
      const isReadGranted = await verifyReadPermission(fileHandle);

      if (isReadGranted) {
        return this._createReadAPI(fileHandle);
      } else {
        return {};
      }
    }
  }

}

const isSupportFileSystemAPI = () => {
  return !!window.showOpenFilePicker && !!window.showSaveFilePicker && !!window.showDirectoryPicker;
};

var index = {
  version: "0.0.1",
  isSupportFileSystemAPI: isSupportFileSystemAPI,
  createAPI: () => {
    if (isSupportFileSystemAPI()) {
      return new FileSystemAPI();
    } else {
      return new LegacyFileSystemAPI();
    }
  }
};

export { index as FileSystem };
