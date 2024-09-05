(function(global2, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("vue"), require("element-plus")) : typeof define === "function" && define.amd ? define(["vue", "element-plus"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2["ztxn-lib"] = factory(global2.Vue, global2.ElementPlus));
})(this, function(vue, elementPlus) {
  "use strict";
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var Symbol$1 = root.Symbol;
  var objectProto$d = Object.prototype;
  var hasOwnProperty$a = objectProto$d.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$d.toString;
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty$a.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var objectProto$c = Object.prototype;
  var nativeObjectToString = objectProto$c.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isArray = Array.isArray;
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  function identity(value) {
    return value;
  }
  var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
  }
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var funcProto$2 = Function.prototype;
  var funcToString$2 = funcProto$2.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto$1 = Function.prototype, objectProto$b = Object.prototype;
  var funcToString$1 = funcProto$1.toString;
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var WeakMap = getNative(root, "WeakMap");
  var objectCreate = Object.create;
  var baseCreate = /* @__PURE__ */ function() {
    function object() {
    }
    return function(proto) {
      if (!isObject(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  }();
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  var HOT_COUNT = 800, HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  function constant(value) {
    return function() {
      return value;
    };
  }
  var defineProperty = function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  }();
  var baseSetToString = !defineProperty ? identity : function(func, string) {
    return defineProperty(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string),
      "writable": true
    });
  };
  var setToString = shortOut(baseSetToString);
  function arrayEach(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty) {
      defineProperty(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var objectProto$a = Object.prototype;
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$8.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }
  var nativeMax = Math.max;
  function overRest(func, start, transform) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }
  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + "");
  }
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
      return eq(object[index], value);
    }
    return false;
  }
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? void 0 : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }
  var objectProto$9 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$9;
    return value === proto;
  }
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var argsTag$2 = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$2;
  }
  var objectProto$8 = Object.prototype;
  var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
  var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;
  var isArguments = baseIsArguments(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$7.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
  };
  function stubFalse() {
    return false;
  }
  var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
  var Buffer$1 = moduleExports$2 ? root.Buffer : void 0;
  var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse;
  var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$3 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]";
  var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
  var freeProcess = moduleExports$1 && freeGlobal.process;
  var nodeUtil = function() {
    try {
      var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  var objectProto$7 = Object.prototype;
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var nativeKeys = overArg(Object.keys, Object);
  var objectProto$6 = Object.prototype;
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$5.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  var objectProto$5 = Object.prototype;
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty$4.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }
  var nativeCreate = getNative(Object, "create");
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
  var objectProto$4 = Object.prototype;
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED$1 ? void 0 : result;
    }
    return hasOwnProperty$3.call(data, key) ? data[key] : void 0;
  }
  var objectProto$3 = Object.prototype;
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty$2.call(data, key);
  }
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  var Map = getNative(root, "Map");
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map || ListCache)(),
      "string": new Hash()
    };
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  var objectTag$2 = "[object Object]";
  var funcProto = Function.prototype, objectProto$2 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag$2) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$1.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object);
  }
  function baseAssignIn(object, source) {
    return object && copyObject(source, keysIn(source), object);
  }
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  function stubArray() {
    return [];
  }
  var objectProto$1 = Object.prototype;
  var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object);
  }
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
    var result = [];
    while (object) {
      arrayPush(result, getSymbols(object));
      object = getPrototype(object);
    }
    return result;
  };
  function copySymbolsIn(source, object) {
    return copyObject(source, getSymbolsIn(source), object);
  }
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  function getAllKeysIn(object) {
    return baseGetAllKeys(object, keysIn, getSymbolsIn);
  }
  var DataView = getNative(root, "DataView");
  var Promise$1 = getNative(root, "Promise");
  var Set = getNative(root, "Set");
  var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
  var dataViewTag$2 = "[object DataView]";
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map && getTag(new Map()) != mapTag$3 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set && getTag(new Set()) != setTag$3 || WeakMap && getTag(new WeakMap()) != weakMapTag$1) {
    getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag$2;
          case mapCtorString:
            return mapTag$3;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag$3;
          case weakMapCtorString:
            return weakMapTag$1;
        }
      }
      return result;
    };
  }
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function initCloneArray(array) {
    var length = array.length, result = new array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  var Uint8Array = root.Uint8Array;
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
  var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$1:
        return cloneArrayBuffer(object);
      case boolTag$1:
      case dateTag$1:
        return new Ctor(+object);
      case dataViewTag$1:
        return cloneDataView(object, isDeep);
      case float32Tag$1:
      case float64Tag$1:
      case int8Tag$1:
      case int16Tag$1:
      case int32Tag$1:
      case uint8Tag$1:
      case uint8ClampedTag$1:
      case uint16Tag$1:
      case uint32Tag$1:
        return cloneTypedArray(object, isDeep);
      case mapTag$2:
        return new Ctor();
      case numberTag$1:
      case stringTag$1:
        return new Ctor(object);
      case regexpTag$1:
        return cloneRegExp(object);
      case setTag$2:
        return new Ctor();
      case symbolTag$1:
        return cloneSymbol(object);
    }
  }
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
  }
  var mapTag$1 = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike(value) && getTag(value) == mapTag$1;
  }
  var nodeIsMap = nodeUtil && nodeUtil.isMap;
  var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
  var setTag$1 = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike(value) && getTag(value) == setTag$1;
  }
  var nodeIsSet = nodeUtil && nodeUtil.isSet;
  var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
  var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
    if (result !== void 0) {
      return result;
    }
    if (!isObject(value)) {
      return value;
    }
    var isArr = isArray(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
      if (isBuffer(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag || tag == argsTag || isFunc && !object) {
        result = isFlat || isFunc ? {} : initCloneObject(value);
        if (!isDeep) {
          return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (isSet(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap(value)) {
      value.forEach(function(subValue, key2) {
        result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
    }
    var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
    var props = isArr ? void 0 : keysFunc(value);
    arrayEach(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
    return result;
  }
  var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
  function cloneDeep(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
  }
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
      while (length--) {
        var key = props[++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  var baseFor = createBaseFor();
  function assignMergeValue(object, key, value) {
    if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  function safeGet(object, key) {
    if (key === "constructor" && typeof object[key] === "function") {
      return;
    }
    if (key == "__proto__") {
      return;
    }
    return object[key];
  }
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
    var isCommon = newValue === void 0;
    if (isCommon) {
      var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        newValue = objValue;
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        } else if (!isObject(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      } else {
        isCommon = false;
      }
    }
    if (isCommon) {
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack["delete"](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor(source, function(srcValue, key) {
      stack || (stack = new Stack());
      if (isObject(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
        if (newValue === void 0) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }
  var merge = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "ColumnChild",
    props: {
      columns: {}
    },
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_ColumnChild = vue.resolveComponent("ColumnChild", true);
        const _component_el_table_column = vue.resolveComponent("el-table-column");
        return vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.columns, (column) => {
          return vue.openBlock(), vue.createBlock(_component_el_table_column, {
            key: column.dataIndex,
            prop: column.dataIndex,
            label: column.title,
            width: column.width,
            fixed: column.fixed,
            sortable: column.sortable,
            resizable: column.resizable,
            align: column.align,
            "class-name": column.className
          }, vue.createSlots({
            default: vue.withCtx(() => {
              var _a, _b;
              return [
                ((_a = column.children) == null ? void 0 : _a.length) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                  ((_b = column.children) == null ? void 0 : _b.length) ? (vue.openBlock(), vue.createBlock(_component_ColumnChild, {
                    key: 0,
                    columns: column.children
                  }, null, 8, ["columns"])) : vue.createCommentVNode("", true)
                ], 64)) : vue.createCommentVNode("", true)
              ];
            }),
            _: 2
          }, [
            column.scopedSlots ? {
              name: "default",
              fn: vue.withCtx((scope) => [
                vue.renderSlot(_ctx.$slots, column.scopedSlots, {
                  data: scope.row
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["prop", "label", "width", "fixed", "sortable", "resizable", "align", "class-name"]);
        }), 128);
      };
    }
  });
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "Index",
    props: {
      config: {},
      columns: {},
      tableData: {},
      functions: {}
    },
    setup(__props, { expose: __expose }) {
      let props = __props;
      let baseConfig = vue.ref({
        "row-key": "",
        pagination: false,
        index: false,
        selection: ""
      });
      let basePagination = vue.ref({
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        layout: "total, sizes, prev, pager, next, jumper",
        className: "y-pagination"
      });
      let selection = vue.ref(""), slotList = vue.ref([]), selectionValue = vue.ref();
      let methods2 = {
        indexFun(index) {
          let { pagination } = baseConfig.value;
          let { pageIndex, pageSize } = basePagination.value;
          return pagination ? (pageIndex - 1) * pageSize + index + 1 : index + 1;
        },
        setPagination(value) {
          let { pageIndex, pageSize, total, layout, className } = value;
          if (pageIndex) {
            basePagination.value.pageIndex = pageIndex;
          }
          if (pageSize) {
            basePagination.value.pageSize = pageSize;
          }
          if (total != void 0) {
            basePagination.value.total = total;
          }
          if (layout != void 0) {
            basePagination.value.layout = layout;
          }
          if (className != "") {
            basePagination.value.className = className;
          }
        },
        handleCurrentChange(val) {
          if (props.functions && props.functions.handleCurrentChange) {
            props.functions.handleCurrentChange(val);
          }
        },
        handleSizeChange(val) {
          if (props.functions && props.functions.handleSizeChange) {
            props.functions.handleSizeChange(val);
          }
        },
        onCurrentChange(val) {
          selectionValue.value = val;
          if (props.functions && props.functions.onCurrentChange) {
            props.functions.onCurrentChange(val);
          }
        },
        onSelectionChange(val) {
          selectionValue.value = val;
          if (props.functions && props.functions.onSelectionChange) {
            props.functions.onSelectionChange(val);
          }
        }
      };
      vue.watch(
        () => props.config,
        (value) => {
          baseConfig.value = merge(baseConfig.value, value);
          value.pagination && methods2.setPagination(value);
          selectionValue.value = null;
          selection.value = baseConfig.value.selection;
        },
        {
          immediate: true,
          deep: true
        }
      );
      vue.watch(
        () => props.columns,
        (value) => {
          slotList.value = value.filter((item) => item.scopedSlots).map((item) => item.scopedSlots);
        },
        {
          immediate: true,
          deep: true
        }
      );
      __expose({
        getSelection: () => selectionValue.value
      });
      return (_ctx, _cache) => {
        const _component_el_table_column = vue.resolveComponent("el-table-column");
        const _component_el_radio = vue.resolveComponent("el-radio");
        const _component_el_table = vue.resolveComponent("el-table");
        const _component_el_pagination = vue.resolveComponent("el-pagination");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createVNode(_component_el_table, vue.mergeProps({
            ref: "tableRef",
            data: _ctx.tableData,
            "show-overflow-tooltip": "",
            "highlight-current-row": vue.unref(selection) == "radio" ? true : false,
            onSelectionChange: vue.unref(methods2).onSelectionChange,
            onCurrentChange: vue.unref(methods2).onCurrentChange
          }, _ctx.$attrs), {
            default: vue.withCtx(() => [
              vue.unref(baseConfig).index ? (vue.openBlock(), vue.createBlock(_component_el_table_column, {
                key: 0,
                type: "index",
                index: vue.unref(methods2).indexFun,
                width: "50",
                align: "center"
              }, null, 8, ["index"])) : vue.createCommentVNode("", true),
              vue.unref(selection) != "" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                vue.unref(selection) == "checkbox" ? (vue.openBlock(), vue.createBlock(_component_el_table_column, {
                  key: 0,
                  type: "selection",
                  width: "50",
                  align: "center"
                })) : vue.createCommentVNode("", true),
                vue.unref(selection) == "radio" ? (vue.openBlock(), vue.createBlock(_component_el_table_column, {
                  key: 1,
                  width: "50",
                  align: "center"
                }, {
                  default: vue.withCtx((scope) => [
                    vue.createVNode(_component_el_radio, {
                      value: scope.row[vue.unref(baseConfig)["row-key"]],
                      modelValue: vue.unref(selectionValue),
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(selectionValue) ? selectionValue.value = $event : selectionValue = $event)
                    }, null, 8, ["value", "modelValue"])
                  ]),
                  _: 1
                })) : vue.createCommentVNode("", true)
              ], 64)) : vue.createCommentVNode("", true),
              vue.createVNode(_sfc_main$9, { columns: _ctx.columns }, vue.createSlots({ _: 2 }, [
                vue.renderList(vue.unref(slotList), (item) => {
                  return {
                    name: item,
                    fn: vue.withCtx((scope) => [
                      vue.renderSlot(_ctx.$slots, item, {
                        data: scope.data
                      })
                    ])
                  };
                })
              ]), 1032, ["columns"]),
              vue.renderSlot(_ctx.$slots, "columns")
            ]),
            _: 3
          }, 16, ["data", "highlight-current-row", "onSelectionChange", "onCurrentChange"]),
          vue.unref(baseConfig).pagination ? (vue.openBlock(), vue.createBlock(_component_el_pagination, {
            key: 0,
            style: { marginTop: "16px" },
            class: vue.normalizeClass(vue.unref(basePagination).className),
            total: vue.unref(basePagination).total,
            "current-page": vue.unref(basePagination).pageIndex,
            "page-size": vue.unref(basePagination).pageSize,
            layout: vue.unref(basePagination).layout,
            onCurrentChange: vue.unref(methods2).handleCurrentChange,
            onSizeChange: vue.unref(methods2).handleSizeChange
          }, null, 8, ["class", "total", "current-page", "page-size", "layout", "onCurrentChange", "onSizeChange"])) : vue.createCommentVNode("", true)
        ], 64);
      };
    }
  });
  const TablePlugin = {
    install(app) {
      app.component("yh-table", _sfc_main$8);
    }
  };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "Index",
    props: {
      config: {
        type: Object,
        default: () => {
          return {};
        }
      },
      functions: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    setup(__props) {
      let props = __props;
      let baseConfig = vue.ref({
        visible: false,
        title: "",
        width: 440,
        loading: false,
        footer: false,
        isSave: true,
        saveText: "确定",
        cancelText: "取消",
        customClass: ""
      });
      let visible = vue.ref(false);
      vue.watch(
        () => props.config,
        (value) => {
          baseConfig.value = merge(baseConfig.value, value);
          visible.value = baseConfig.value.visible;
        },
        {
          immediate: true,
          deep: true
        }
      );
      let onConfirm = () => {
        var _a;
        if ((_a = props.functions) == null ? void 0 : _a.handleSave) {
          props.functions.handleSave();
        }
      };
      let onCancel = () => {
        var _a;
        console.log("=>", props.functions);
        if ((_a = props.functions) == null ? void 0 : _a.handleCancel) {
          props.functions.handleCancel();
        }
      };
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_dialog = vue.resolveComponent("el-dialog");
        const _directive_loading = vue.resolveDirective("loading");
        return vue.openBlock(), vue.createBlock(_component_el_dialog, vue.mergeProps({
          ref: "dialogRef",
          modelValue: vue.unref(visible),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(visible) ? visible.value = $event : visible = $event),
          title: vue.unref(baseConfig).title,
          width: vue.unref(baseConfig).width,
          class: vue.unref(baseConfig).customClass,
          "destroy-on-close": "",
          "align-center": ""
        }, _ctx.$attrs, { onClose: vue.unref(onCancel) }), vue.createSlots({
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 2
        }, [
          vue.unref(baseConfig).footer ? {
            name: "footer",
            fn: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "btn"),
              vue.unref(baseConfig).isSave ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 0,
                type: "primary",
                onClick: vue.unref(onConfirm)
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(vue.unref(baseConfig).saveText || "确定"), 1)
                ]),
                _: 1
              }, 8, ["onClick"])), [
                [_directive_loading, vue.unref(baseConfig).loading]
              ]) : vue.createCommentVNode("", true),
              vue.createVNode(_component_el_button, {
                plain: "",
                onClick: vue.unref(onCancel)
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(vue.unref(baseConfig).cancelText || "取消"), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            key: "0"
          } : void 0
        ]), 1040, ["modelValue", "title", "width", "class", "onClose"]);
      };
    }
  });
  const DialogPlugin = {
    install(app) {
      app.component("yh-dialog", _sfc_main$7);
    }
  };
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "EForm",
    props: {
      item: {
        type: Object,
        default: () => {
        }
      },
      formState: {
        type: Object,
        default: () => {
        }
      },
      methods: {
        type: Object,
        default: () => {
        }
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_input_number = vue.resolveComponent("el-input-number");
        const _component_el_radio_button = vue.resolveComponent("el-radio-button");
        const _component_el_radio = vue.resolveComponent("el-radio");
        const _component_el_radio_group = vue.resolveComponent("el-radio-group");
        const _component_el_checkbox = vue.resolveComponent("el-checkbox");
        const _component_el_checkbox_group = vue.resolveComponent("el-checkbox-group");
        const _component_el_option = vue.resolveComponent("el-option");
        const _component_el_select = vue.resolveComponent("el-select");
        const _component_el_tree_select = vue.resolveComponent("el-tree-select");
        const _component_el_cascader = vue.resolveComponent("el-cascader");
        const _component_el_switch = vue.resolveComponent("el-switch");
        const _component_el_date_picker = vue.resolveComponent("el-date-picker");
        const _component_el_time_picker = vue.resolveComponent("el-time-picker");
        const _component_el_time_select = vue.resolveComponent("el-time-select");
        return __props.item.type === "input" || __props.item.type == "hidden" ? (vue.openBlock(), vue.createBlock(_component_el_input, vue.mergeProps({
          key: 0,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => __props.formState[__props.item.code] = $event),
          clearable: __props.item.hasOwnProperty("clearable") ? __props.item.clearable : true,
          placeholder: __props.item.placeholder || "请输入",
          disabled: __props.item.disabled
        }, __props.item.extra, {
          onChange: _cache[1] || (_cache[1] = (value) => __props.methods.change(value, __props.item)),
          onInput: _cache[2] || (_cache[2] = (value) => __props.methods.input(value, __props.item)),
          onBlur: _cache[3] || (_cache[3] = (value) => __props.methods.blur(value, __props.item)),
          onFocus: _cache[4] || (_cache[4] = (value) => __props.methods.focus(value, __props.item))
        }), vue.createSlots({ _: 2 }, [
          __props.item.extra && __props.item.extra.prefix ? {
            name: "prefix",
            fn: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(__props.item.extra.prefix), 1)
            ]),
            key: "0"
          } : void 0,
          __props.item.extra && __props.item.extra.suffix ? {
            name: "suffix",
            fn: vue.withCtx(() => [
              vue.createTextVNode(vue.toDisplayString(__props.item.extra.suffix), 1)
            ]),
            key: "1"
          } : void 0
        ]), 1040, ["modelValue", "clearable", "placeholder", "disabled"])) : __props.item.type === "number" || __props.item.type === "numberhidden" ? (vue.openBlock(), vue.createBlock(_component_el_input_number, vue.mergeProps({
          key: 1,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => __props.formState[__props.item.code] = $event),
          placeholder: __props.item.placeholder || "请输入",
          disabled: __props.item.disabled
        }, __props.item.extra, {
          onChange: _cache[6] || (_cache[6] = (value) => __props.methods.change(value, __props.item)),
          onBlur: _cache[7] || (_cache[7] = (value) => __props.methods.blur(value, __props.item)),
          onFocus: _cache[8] || (_cache[8] = (value) => __props.methods.focus(value, __props.item))
        }), null, 16, ["modelValue", "placeholder", "disabled"])) : __props.item.type == "textarea" ? (vue.openBlock(), vue.createBlock(_component_el_input, vue.mergeProps({
          key: 2,
          type: "textarea",
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => __props.formState[__props.item.code] = $event),
          placeholder: __props.item.placeholder || "请输入",
          disabled: __props.item.disabled
        }, __props.item.extra, {
          onChange: _cache[10] || (_cache[10] = (value) => __props.methods.change(value, __props.item)),
          onInput: _cache[11] || (_cache[11] = (value) => __props.methods.input(value, __props.item)),
          onBlur: _cache[12] || (_cache[12] = (value) => __props.methods.blur(value, __props.item)),
          onFocus: _cache[13] || (_cache[13] = (value) => __props.methods.focus(value, __props.item))
        }), null, 16, ["modelValue", "placeholder", "disabled"])) : __props.item.type == "password" ? (vue.openBlock(), vue.createBlock(_component_el_input, vue.mergeProps({
          key: 3,
          type: "password",
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => __props.formState[__props.item.code] = $event),
          placeholder: __props.item.placeholder || "请输入",
          disabled: __props.item.disabled
        }, __props.item.extra, {
          onChange: _cache[15] || (_cache[15] = (value) => __props.methods.change(value, __props.item)),
          onInput: _cache[16] || (_cache[16] = (value) => __props.methods.input(value, __props.item)),
          onBlur: _cache[17] || (_cache[17] = (value) => __props.methods.blur(value, __props.item)),
          onFocus: _cache[18] || (_cache[18] = (value) => __props.methods.focus(value, __props.item))
        }), null, 16, ["modelValue", "placeholder", "disabled"])) : __props.item.type == "radio" || __props.item.type == "radio-button" ? (vue.openBlock(), vue.createBlock(_component_el_radio_group, vue.mergeProps({
          key: 4,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => __props.formState[__props.item.code] = $event),
          disabled: __props.item.disabled
        }, __props.item.extra, {
          onChange: _cache[20] || (_cache[20] = (value) => __props.methods.change(value, __props.item))
        }), {
          default: vue.withCtx(() => [
            __props.item.type == "radio-button" ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(__props.item.options, (options) => {
              return vue.openBlock(), vue.createBlock(_component_el_radio_button, {
                disabled: options.disabled,
                label: options[__props.item.fieldName ? __props.item.fieldName.value || "value" : "value"]
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(options[__props.item.fieldName ? __props.item.fieldName.label || "label" : "label"]), 1)
                ]),
                _: 2
              }, 1032, ["disabled", "label"]);
            }), 256)) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(__props.item.options, (options) => {
              return vue.openBlock(), vue.createBlock(_component_el_radio, {
                disabled: options.disabled,
                label: options[__props.item.fieldName ? __props.item.fieldName.value || "value" : "value"]
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(options[__props.item.fieldName ? __props.item.fieldName.label || "label" : "label"]), 1)
                ]),
                _: 2
              }, 1032, ["disabled", "label"]);
            }), 256))
          ]),
          _: 1
        }, 16, ["modelValue", "disabled"])) : __props.item.type == "checkbox" ? (vue.openBlock(), vue.createBlock(_component_el_checkbox_group, vue.mergeProps({
          key: 5,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => __props.formState[__props.item.code] = $event),
          disabled: __props.item.disabled
        }, __props.item.extra, {
          onChange: _cache[22] || (_cache[22] = (value) => __props.methods.change(value, __props.item))
        }), {
          default: vue.withCtx(() => [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.item.options, (options) => {
              return vue.openBlock(), vue.createBlock(_component_el_checkbox, {
                disabled: options.disabled,
                label: options[__props.item.fieldName ? __props.item.fieldName.value || "value" : "value"]
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(options[__props.item.fieldName ? __props.item.fieldName.label || "label" : "label"]), 1)
                ]),
                _: 2
              }, 1032, ["disabled", "label"]);
            }), 256))
          ]),
          _: 1
        }, 16, ["modelValue", "disabled"])) : __props.item.type == "select" ? (vue.openBlock(), vue.createBlock(_component_el_select, vue.mergeProps({
          key: 6,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => __props.formState[__props.item.code] = $event),
          clearable: __props.item.hasOwnProperty("clearable") ? __props.item.clearable : true,
          placeholder: __props.item.placeholder || "请选择",
          disabled: __props.item.disabled
        }, __props.item.extra, {
          onChange: _cache[24] || (_cache[24] = (value) => __props.methods.change(value, __props.item))
        }), {
          default: vue.withCtx(() => [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.item.options, (options) => {
              return vue.openBlock(), vue.createBlock(_component_el_option, {
                key: options[__props.item.fieldName ? __props.item.fieldName.value || "value" : "value"],
                label: options[__props.item.fieldName ? __props.item.fieldName.label || "label" : "label"],
                value: options[__props.item.fieldName ? __props.item.fieldName.value || "value" : "value"],
                disabled: options.disabled
              }, null, 8, ["label", "value", "disabled"]);
            }), 128))
          ]),
          _: 1
        }, 16, ["modelValue", "clearable", "placeholder", "disabled"])) : __props.item.type == "treeSelect" ? (vue.openBlock(), vue.createBlock(_component_el_tree_select, vue.mergeProps({
          key: 7,
          data: __props.item.options,
          "render-after-expand": false
        }, __props.item.extra), null, 16, ["data"])) : __props.item.type == "cascader" ? (vue.openBlock(), vue.createBlock(_component_el_cascader, vue.mergeProps({
          key: 8,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => __props.formState[__props.item.code] = $event),
          options: __props.item.options
        }, __props.item.extra, {
          onChange: _cache[26] || (_cache[26] = (value) => __props.methods.change(value, __props.item))
        }), null, 16, ["modelValue", "options"])) : __props.item.type == "switch" ? (vue.openBlock(), vue.createBlock(_component_el_switch, vue.mergeProps({
          key: 9,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => __props.formState[__props.item.code] = $event)
        }, __props.item.extra, {
          onChange: _cache[28] || (_cache[28] = (value) => __props.methods.change(value, __props.item))
        }), null, 16, ["modelValue"])) : ["datetime", "date", "week", "month", "year", "dates"].includes(__props.item.type) ? (vue.openBlock(), vue.createBlock(_component_el_date_picker, vue.mergeProps({
          key: 10,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => __props.formState[__props.item.code] = $event),
          type: __props.item.type,
          placeholder: __props.item.placeholder || "请选择",
          disabled: __props.item.disabled,
          clearable: __props.item.hasOwnProperty("clearable") ? __props.item.clearable : true
        }, __props.item.extra, {
          onChange: _cache[30] || (_cache[30] = (value) => __props.methods.change(value, __props.item)),
          onBlur: _cache[31] || (_cache[31] = (value) => __props.methods.blur(value, __props.item)),
          onFocus: _cache[32] || (_cache[32] = (value) => __props.methods.focus(value, __props.item))
        }), null, 16, ["modelValue", "type", "placeholder", "disabled", "clearable"])) : ["daterange", "monthrange", "datetimerange"].includes(__props.item.type) ? (vue.openBlock(), vue.createBlock(_component_el_date_picker, vue.mergeProps({
          key: 11,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[33] || (_cache[33] = ($event) => __props.formState[__props.item.code] = $event),
          type: __props.item.type,
          "range-separator": __props.item.extra && __props.item.extra["range-separator"] || "至",
          "start-placeholder": __props.item.extra && __props.item.extra["start-placeholder"] || "开始时间",
          "end-placeholder": __props.item.extra && __props.item.extra["end-placeholder"] || "结束时间",
          disabled: __props.item.disabled,
          clearable: __props.item.hasOwnProperty("clearable") ? __props.item.clearable : true
        }, __props.item.extra, {
          onChange: _cache[34] || (_cache[34] = (value) => __props.methods.change(value, __props.item)),
          onBlur: _cache[35] || (_cache[35] = (value) => __props.methods.blur(value, __props.item)),
          onFocus: _cache[36] || (_cache[36] = (value) => __props.methods.focus(value, __props.item))
        }), null, 16, ["modelValue", "type", "range-separator", "start-placeholder", "end-placeholder", "disabled", "clearable"])) : __props.item.type == "time" ? (vue.openBlock(), vue.createBlock(_component_el_time_picker, vue.mergeProps({
          key: 12,
          placeholder: __props.item.placeholder || "请选择",
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[37] || (_cache[37] = ($event) => __props.formState[__props.item.code] = $event),
          disabled: __props.item.disabled,
          clearable: __props.item.hasOwnProperty("clearable") ? __props.item.clearable : true
        }, __props.item.extra, {
          onChange: _cache[38] || (_cache[38] = (value) => __props.methods.change(value, __props.item)),
          onBlur: _cache[39] || (_cache[39] = (value) => __props.methods.blur(value, __props.item)),
          onFocus: _cache[40] || (_cache[40] = (value) => __props.methods.focus(value, __props.item))
        }), null, 16, ["placeholder", "modelValue", "disabled", "clearable"])) : __props.item.type == "timeRange" ? (vue.openBlock(), vue.createBlock(_component_el_time_picker, vue.mergeProps({
          key: 13,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[41] || (_cache[41] = ($event) => __props.formState[__props.item.code] = $event),
          "is-range": "",
          "range-separator": __props.item.extra && __props.item.extra["range-separator"] || "至",
          "start-placeholder": __props.item.extra && __props.item.extra["start-placeholder"] || "开始时间",
          "end-placeholder": __props.item.extra && __props.item.extra["end-placeholder"] || "结束时间",
          disabled: __props.item.disabled,
          clearable: __props.item.hasOwnProperty("clearable") ? __props.item.clearable : true
        }, __props.item.extra, {
          onChange: _cache[42] || (_cache[42] = (value) => __props.methods.change(value, __props.item)),
          onBlur: _cache[43] || (_cache[43] = (value) => __props.methods.blur(value, __props.item)),
          onFocus: _cache[44] || (_cache[44] = (value) => __props.methods.focus(value, __props.item))
        }), null, 16, ["modelValue", "range-separator", "start-placeholder", "end-placeholder", "disabled", "clearable"])) : __props.item.type == "timeSelect" ? (vue.openBlock(), vue.createBlock(_component_el_time_select, vue.mergeProps({
          key: 14,
          modelValue: __props.formState[__props.item.code],
          "onUpdate:modelValue": _cache[45] || (_cache[45] = ($event) => __props.formState[__props.item.code] = $event),
          placeholder: __props.item.placeholder || "请选择",
          start: __props.item.extra && __props.item.extra.start || "00:00",
          step: __props.item.extra && __props.item.extra.step || "00:15",
          end: __props.item.extra && __props.item.extra.end || "23:59",
          disabled: __props.item.disabled,
          clearable: __props.item.hasOwnProperty("clearable") ? __props.item.clearable : true
        }, __props.item.extra, {
          onChange: _cache[46] || (_cache[46] = (value) => __props.methods.change(value, __props.item)),
          onBlur: _cache[47] || (_cache[47] = (value) => __props.methods.blur(value, __props.item)),
          onFocus: _cache[48] || (_cache[48] = (value) => __props.methods.focus(value, __props.item))
        }), null, 16, ["modelValue", "placeholder", "start", "step", "end", "disabled", "clearable"])) : vue.createCommentVNode("", true);
      };
    }
  });
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "Index",
    props: {
      formData: {
        type: Array,
        required: true,
        default: () => []
      },
      config: {
        type: Object,
        default: () => {
        }
      },
      functions: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    setup(__props, { expose: __expose }) {
      const props = __props;
      let base = vue.reactive({
        inline: false,
        "label-position": "right",
        "label-width": "100px",
        rowSpan: 24,
        justify: "start",
        gutter: [16, 16],
        "item-bottom": "16px"
      });
      let formState = vue.reactive({}), rulesRef = vue.reactive({}), configData = vue.ref();
      let modelRef = vue.ref();
      let methods2 = {
        checkFunction(value, callback, el) {
          if (props.functions[el.checkFunName]) {
            props.functions[el.checkFunName](value, callback, el);
          }
        },
        checkForm() {
          if (!modelRef.value) return;
          return new Promise((resolve) => {
            modelRef.value.validate((isValid) => {
              isValid && resolve(formState);
            });
          });
        },
        resetForm() {
          if (!modelRef.value) return;
          modelRef.value.resetFields();
        },
        setFieldsValue(value) {
          for (let key in value) {
            if (formState.hasOwnProperty(key)) {
              methods2.setFieldValue(key, value[key]);
            }
          }
        },
        setFieldValue(key, value) {
          if (formState.hasOwnProperty(key)) {
            formState[key] = value;
          }
        },
        getFieldsValue() {
          return cloneDeep(formState);
        },
        getFieldValue(key) {
          return formState[key];
        }
      };
      let methodFun = {
        trimFun(e, item) {
          if (["input", "textarea"].includes(item.type)) {
            let value = e.target ? e.target.value : e;
            value = value.trim();
            methods2.setFieldValue(item.code, value);
          }
        },
        change(value, item) {
          if (props.functions && props.functions[item.changeFunName]) {
            props.functions[item.changeFunName](value, item);
          }
        },
        input(value, item) {
          if (props.functions && props.functions[item.inputFunName]) {
            props.functions[item.inputFunName](value, item);
          }
        },
        blur(value, item) {
          methodFun.trimFun(value, item);
          if (props.functions && props.functions[item.blurFunName]) {
            props.functions[item.blurFunName](value, item);
          }
        },
        focus(value, item) {
          if (props.functions && props.functions[item.focusFunName]) {
            props.functions[item.focusFunName](value, item);
          }
        }
      };
      vue.watch(
        () => props.config,
        (value) => {
          if (value && Object.keys(value).length) {
            base = merge(base, value);
          }
        },
        {
          immediate: true,
          deep: true
        }
      );
      vue.watch(
        () => props.formData,
        (value) => {
          if (value == null ? void 0 : value.length) {
            configData.value = cloneDeep(value);
            value.map((el) => {
              if (!el.code) return;
              if (Object.keys(formState).length == 0) {
                formState[el.code] = el.defaultValue;
              }
              rulesRef[el.code] = [];
              if (el.required) {
                rulesRef[el.code].push({
                  required: true,
                  message: el.help ? el.help : (["input", "number", "password", "textarea"].includes(el.type) ? "请输入" : "请选择") + el.label,
                  trigger: el.trigger || "change"
                });
              }
              if (el.pattern) {
                rulesRef[el.code].push({
                  pattern: el.pattern || null,
                  message: el.help ? el.help : "格式错误"
                });
              }
              if (el.checkFunName) {
                rulesRef[el.code].push({
                  validator: (rule, value2, callback) => methods2.checkFunction(value2, callback, el)
                });
              }
              if (rulesRef[el.code].length == 0) {
                delete rulesRef[el.code];
              }
            });
          }
        },
        {
          immediate: true,
          deep: true
        }
      );
      __expose({
        checkForm: methods2.checkForm,
        resetForm: methods2.resetForm,
        setFieldsValue: methods2.setFieldsValue,
        setFieldValue: methods2.setFieldValue,
        getFieldsValue: methods2.getFieldsValue,
        getFieldValue: methods2.getFieldValue
      });
      return (_ctx, _cache) => {
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_col = vue.resolveComponent("el-col");
        const _component_el_row = vue.resolveComponent("el-row");
        const _component_el_form = vue.resolveComponent("el-form");
        return __props.formData.length ? (vue.openBlock(), vue.createBlock(_component_el_form, vue.mergeProps({
          key: 0,
          ref_key: "modelRef",
          ref: modelRef,
          onSubmit: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["prevent"])),
          model: vue.unref(formState),
          rules: vue.unref(rulesRef),
          inline: vue.unref(base).inline,
          "label-position": vue.unref(base)["label-position"],
          "label-width": vue.unref(base).inline ? "auto" : vue.unref(base)["label-width"],
          style: { "--itemBottom": vue.unref(base)["item-bottom"] }
        }, _ctx.$attrs), {
          default: vue.withCtx(() => [
            vue.unref(base).inline ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(vue.unref(configData), (item) => {
              return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                item.show ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                  key: 0,
                  class: vue.normalizeClass(item.formClassName),
                  prop: item.code,
                  "label-width": item["label-width"]
                }, {
                  label: vue.withCtx(() => [
                    vue.renderSlot(_ctx.$slots, "prefix", {}, void 0, true),
                    vue.createTextVNode(" " + vue.toDisplayString(item.label) + " ", 1),
                    vue.renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
                  ]),
                  default: vue.withCtx(() => [
                    item.slot ? vue.renderSlot(_ctx.$slots, item.slot, {
                      key: 0,
                      data: item
                    }, void 0, true) : (vue.openBlock(), vue.createBlock(_sfc_main$6, {
                      key: 1,
                      item,
                      formState: vue.unref(formState),
                      methods: vue.unref(methodFun),
                      class: vue.normalizeClass(["w_150", item.className])
                    }, null, 8, ["item", "formState", "methods", "class"]))
                  ]),
                  _: 2
                }, 1032, ["class", "prop", "label-width"])) : vue.createCommentVNode("", true)
              ], 64);
            }), 256)) : (vue.openBlock(), vue.createBlock(_component_el_row, {
              key: 1,
              justify: vue.unref(base).justify,
              gutter: vue.unref(base).gutter
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(configData), (item) => {
                  return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                    item.show ? (vue.openBlock(), vue.createBlock(_component_el_col, {
                      key: 0,
                      span: item.type && item.type.includes("hidden") ? 0 : item.rowSpan || vue.unref(base).rowSpan
                    }, {
                      default: vue.withCtx(() => [
                        vue.withDirectives(vue.createVNode(_component_el_form_item, {
                          class: vue.normalizeClass(item.formClassName),
                          prop: item.code,
                          "label-width": item["label-width"]
                        }, {
                          label: vue.withCtx(() => [
                            vue.renderSlot(_ctx.$slots, "prefix", {}, void 0, true),
                            vue.createTextVNode(" " + vue.toDisplayString(item.label) + " ", 1),
                            vue.renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
                          ]),
                          default: vue.withCtx(() => [
                            item.slot ? vue.renderSlot(_ctx.$slots, item.slot, {
                              key: 0,
                              data: item
                            }, void 0, true) : (vue.openBlock(), vue.createBlock(_sfc_main$6, {
                              key: 1,
                              item,
                              formState: vue.unref(formState),
                              methods: vue.unref(methodFun),
                              class: vue.normalizeClass(["w_150", item.className])
                            }, null, 8, ["item", "formState", "methods", "class"]))
                          ]),
                          _: 2
                        }, 1032, ["class", "prop", "label-width"]), [
                          [vue.vShow, !item.type.includes("hidden")]
                        ])
                      ]),
                      _: 2
                    }, 1032, ["span"])) : vue.createCommentVNode("", true)
                  ], 64);
                }), 256))
              ]),
              _: 3
            }, 8, ["justify", "gutter"]))
          ]),
          _: 3
        }, 16, ["model", "rules", "inline", "label-position", "label-width", "style"])) : vue.createCommentVNode("", true);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const Form = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-e2ab410e"]]);
  const FormPlugin = {
    install(app) {
      app.component("yh-form", Form);
    }
  };
  /*! Element Plus Icons Vue v2.3.1 */
  var minus_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Minus",
    __name: "minus",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64"
        })
      ]));
    }
  });
  var minus_default = minus_vue_vue_type_script_setup_true_lang_default;
  var plus_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "Plus",
    __name: "plus",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
        })
      ]));
    }
  });
  var plus_default = plus_vue_vue_type_script_setup_true_lang_default;
  const _hoisted_1$2 = { class: "dynamicForm" };
  const _hoisted_2 = {
    key: 0,
    class: "flex-center"
  };
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "Index",
    props: {
      border: {
        type: Object,
        default: () => {
          return {};
        }
      },
      btnType: {
        type: String,
        default: "bottom"
      },
      formData: {
        type: Array,
        required: true,
        default: () => []
      },
      config: {
        type: Object,
        default: () => {
        }
      },
      functions: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    setup(__props, { expose: __expose }) {
      let getUuid = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === "x" ? r : r & 3 | 8;
          return v.toString(16);
        });
      };
      let refMap = {};
      let setRefMap = (el, id) => {
        if (el) {
          refMap[`yh_${id}`] = el;
        }
      };
      let props = __props;
      let lists = vue.ref([]);
      let methods2 = {
        add(disabled = false) {
          let id = getUuid();
          let data = cloneDeep(props.formData);
          let base = cloneDeep(props.config);
          let fun = cloneDeep(props.functions);
          let ans = {
            id,
            data,
            base,
            fun,
            disabled
          };
          lists.value.push(ans);
        },
        del(id) {
          if (lists.value.length == 1) {
            elementPlus.ElMessage({
              message: "不能删除最后一条记录！",
              type: "warning"
            });
            return;
          }
          lists.value = lists.value.filter((el) => el.id !== id);
        },
        save() {
          let count = 0, ans = [];
          return new Promise((resolve, reject) => {
            lists.value.map((el) => {
              refMap[`yh_${el.id}`].checkForm().then((formState) => {
                count++;
                let data = cloneDeep(formState);
                ans.push({
                  ...data,
                  uuid: el.id
                });
                if (count == lists.value.length) {
                  resolve(ans);
                }
              });
            });
          });
        },
        setFieldsValue(data) {
          if (!((data == null ? void 0 : data.length) && Array.isArray(data))) {
            return;
          }
          methods2.resetFields();
          data.map((el) => methods2.add(el.disabled));
          setTimeout(() => {
            lists.value.map((el, index) => {
              refMap[`yh_${el.id}`].setFieldsValue(data[index]);
            });
          });
        },
        setFieldValue({ id, key, value }) {
          if (!id) {
            return;
          }
          refMap[`yh_${id}`].setFieldValue(key, value);
        },
        getFieldsValue() {
          let ans = [];
          lists.value.map((el) => {
            let formState = refMap[`yh_${el.id}`].getFieldsValue();
            ans.push({
              ...formState,
              uuid: el.id
            });
          });
          return ans;
        },
        getFieldValue({ id, key }) {
          if (!id) {
            return;
          }
          return key ? refMap[`yh_${id}`].getFieldValue(key) : refMap[`yh_${id}`].getFieldsValue();
        },
        resetFields() {
          lists.value = [];
        }
      };
      let slotList = vue.ref([]);
      vue.watch(
        () => props.formData,
        (value) => {
          if (value == null ? void 0 : value.length) {
            slotList.value = value.filter((el) => el.slot).map((el) => el.slot);
          }
        },
        {
          immediate: true,
          deep: true
        }
      );
      __expose({
        ...methods2
      });
      return (_ctx, _cache) => {
        const _component_yh_form = vue.resolveComponent("yh-form");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_space = vue.resolveComponent("el-space");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(lists), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: "my-flex",
              key: item.id
            }, [
              vue.createElementVNode("div", {
                class: "bordered",
                style: vue.normalizeStyle({ "--padding": __props.border.padding || "0 12px", "--color": __props.border.color || "transparent" })
              }, [
                vue.createVNode(_component_yh_form, {
                  formData: item.data,
                  config: item.base,
                  functions: item.fun,
                  ref_for: true,
                  ref: (el) => vue.unref(setRefMap)(el, item.id)
                }, vue.createSlots({ _: 2 }, [
                  vue.renderList(vue.unref(slotList), (slot) => {
                    return {
                      name: slot,
                      fn: vue.withCtx((scope) => [
                        vue.renderSlot(_ctx.$slots, slot, {
                          data: scope.data
                        }, void 0, true)
                      ])
                    };
                  })
                ]), 1032, ["formData", "config", "functions"])
              ], 4),
              vue.createElementVNode("div", {
                style: vue.normalizeStyle({ width: __props.btnType == "right" ? "90px" : "40px" })
              }, [
                vue.createVNode(_component_el_space, null, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_button, {
                      type: "danger",
                      disabled: item.disabled,
                      icon: vue.unref(minus_default),
                      onClick: ($event) => vue.unref(methods2).del(item.id)
                    }, null, 8, ["disabled", "icon", "onClick"]),
                    __props.btnType == "right" && index == vue.unref(lists).length - 1 ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                      key: 0,
                      type: "primary",
                      icon: vue.unref(plus_default),
                      onClick: _cache[0] || (_cache[0] = ($event) => vue.unref(methods2).add())
                    }, null, 8, ["icon"])) : vue.createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1024)
              ], 4)
            ]);
          }), 128)),
          vue.renderSlot(_ctx.$slots, "content", {}, void 0, true),
          __props.btnType == "bottom" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
            vue.createVNode(_component_el_button, {
              round: "",
              icon: vue.unref(plus_default),
              type: "primary",
              style: { width: "100%" },
              onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(methods2).add())
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("新增")
              ]),
              _: 1
            }, 8, ["icon"])
          ])) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const DynamicForm = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e09ef850"]]);
  const DynamicFormPlugin = {
    install(app) {
      app.component("yh-dynamic", DynamicForm);
    }
  };
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "Index",
    props: {
      config: {},
      functions: {}
    },
    setup(__props) {
      let props = __props;
      let baseConfig = vue.ref({
        visible: false,
        title: "",
        customClass: "",
        width: "30%"
      });
      let visible = vue.ref(false);
      vue.watch(
        () => props.config,
        (value) => {
          baseConfig.value = merge(baseConfig.value, value);
          visible.value = baseConfig.value.visible;
        },
        {
          immediate: true,
          deep: true
        }
      );
      let onCancel = () => {
        var _a;
        if ((_a = props.functions) == null ? void 0 : _a.handleCancel) {
          props.functions.handleCancel();
        }
      };
      return (_ctx, _cache) => {
        const _component_el_drawer = vue.resolveComponent("el-drawer");
        return vue.openBlock(), vue.createBlock(_component_el_drawer, vue.mergeProps({
          modelValue: vue.unref(visible),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(visible) ? visible.value = $event : visible = $event),
          title: vue.unref(baseConfig).title,
          class: vue.unref(baseConfig).customClass,
          size: vue.unref(baseConfig).width,
          "before-close": vue.unref(onCancel)
        }, _ctx.$attrs), {
          footer: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "footer")
          ]),
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["modelValue", "title", "class", "size", "before-close"]);
      };
    }
  });
  const DrawerPlugin = {
    install(app) {
      app.component("yh-drawer", _sfc_main$3);
    }
  };
  const _hoisted_1$1 = { class: "form-table" };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "Index",
    props: {
      config: {
        type: Object,
        default: () => {
          return {
            form: {},
            table: {},
            dialog: {},
            drawer: {}
          };
        }
      },
      functions: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    setup(__props) {
      let props = __props;
      let formSlot = vue.ref([]), tableSlot = vue.ref([]), tableBind = vue.ref({}), formBind = vue.ref({}), dialogBind = vue.ref({}), drawerBind = vue.ref({});
      let dialogFunctions = vue.reactive({}), drawerFunctions = vue.reactive({});
      vue.watch(
        () => props.config,
        (value) => {
          var _a, _b;
          let { form, table, dialog, drawer } = value;
          if (form) {
            if (form.config && Object.keys(form.config).length) {
              formBind.value = {};
              for (let key in form.config) {
                if (!["inline", "label-width", "rowSpan", "justify", "gutter", "item-bottom"].includes(key)) {
                  formBind.value[key] = form.config[key];
                }
              }
            }
            if ((_a = form.formData) == null ? void 0 : _a.length) {
              formSlot.value = form.formData.filter((el) => el.slot).map((el) => el.slot);
            }
          }
          if (table) {
            if (table.config && Object.keys(table.config).length) {
              tableBind.value = {};
              for (let key in table.config) {
                if (!["row-key", "selection", "pagination", "index", "pageIndex", "pageSize", "total", "layout", "className"].includes(key)) {
                  tableBind.value[key] = table.config[key];
                }
              }
            }
            if ((_b = table.columns) == null ? void 0 : _b.length) {
              tableSlot.value = table.columns.filter((el) => el.scopedSlots).map((el) => el.scopedSlots);
            }
          }
          if (dialog && Object.keys(dialog).length) {
            dialogBind.value = {};
            for (let key in dialog) {
              if (!["functions", "visible", "title", "width", "loading", "footer", "isSave", "saveText", "cancelText", "customClass"].includes(key)) {
                dialogBind.value[key] = dialog[key];
              }
            }
            if (dialog.functions && Object.keys(dialog.functions).length) {
              dialogFunctions = vue.reactive(props.functions);
              for (let key in dialog.functions) {
                if (typeof dialog.functions[key] === "function") {
                  dialogFunctions[key] = dialog.functions[key];
                } else if (typeof dialog.functions[key] === "string") {
                  dialogFunctions[key] = props.functions[dialog.functions[key]];
                }
              }
            }
          }
          if (drawer && Object.keys(drawer).length) {
            drawerBind.value = {};
            for (let key in drawer) {
              if (!["functions", "visible", "title", "customClass", "width"].includes(key)) {
                drawerBind.value[key] = drawer[key];
              }
            }
            if (drawer.functions && Object.keys(drawer.functions).length) {
              drawerFunctions = vue.reactive(props.functions);
              for (let key in drawer.functions) {
                if (typeof drawer.functions[key] === "function") {
                  drawerFunctions[key] = drawer.functions[key];
                } else if (typeof drawer.functions[key] === "string") {
                  drawerFunctions[key] = props.functions[drawer.functions[key]];
                }
              }
            }
          }
        },
        {
          deep: true,
          immediate: true
        }
      );
      return (_ctx, _cache) => {
        const _component_yh_form = vue.resolveComponent("yh-form");
        const _component_yh_table = vue.resolveComponent("yh-table");
        const _component_yh_dialog = vue.resolveComponent("yh-dialog");
        const _component_yh_drawer = vue.resolveComponent("yh-drawer");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
          __props.config.form && __props.config.form.formData && __props.config.form.formData.length ? (vue.openBlock(), vue.createBlock(_component_yh_form, vue.mergeProps({
            key: 0,
            formData: __props.config.form.formData,
            config: __props.config.form.config,
            functions: __props.functions
          }, vue.unref(formBind)), vue.createSlots({ _: 2 }, [
            vue.renderList(vue.unref(formSlot), (name) => {
              return {
                name,
                fn: vue.withCtx((scope) => [
                  vue.renderSlot(_ctx.$slots, name, {
                    data: scope.data
                  })
                ])
              };
            })
          ]), 1040, ["formData", "config", "functions"])) : vue.createCommentVNode("", true),
          vue.renderSlot(_ctx.$slots, "btn"),
          __props.config.table && __props.config.table.tableData && __props.config.table.tableData.length ? (vue.openBlock(), vue.createBlock(_component_yh_table, vue.mergeProps({
            key: 1,
            style: { "margin-top": "16px" },
            config: __props.config.table.config,
            tableData: __props.config.table.tableData,
            columns: __props.config.table.columns,
            functions: __props.functions
          }, vue.unref(tableBind)), vue.createSlots({ _: 2 }, [
            vue.renderList(vue.unref(tableSlot), (name) => {
              return {
                name,
                fn: vue.withCtx((scope) => [
                  vue.renderSlot(_ctx.$slots, name, {
                    data: scope.data
                  })
                ])
              };
            })
          ]), 1040, ["config", "tableData", "columns", "functions"])) : vue.createCommentVNode("", true),
          __props.config.dialog ? (vue.openBlock(), vue.createBlock(_component_yh_dialog, vue.mergeProps({
            key: 2,
            config: __props.config.dialog,
            functions: vue.unref(dialogFunctions)
          }, vue.unref(dialogBind)), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "dialog")
            ]),
            _: 3
          }, 16, ["config", "functions"])) : vue.createCommentVNode("", true),
          __props.config.drawer ? (vue.openBlock(), vue.createBlock(_component_yh_drawer, vue.mergeProps({
            key: 3,
            config: __props.config.drawer,
            functions: vue.unref(drawerFunctions)
          }, vue.unref(drawerBind)), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "drawer")
            ]),
            _: 3
          }, 16, ["config", "functions"])) : vue.createCommentVNode("", true)
        ]);
      };
    }
  });
  const FormTablePlugin = {
    install(app) {
      app.component("yh-form-table", _sfc_main$2);
    }
  };
  const _hoisted_1 = { class: "custom-tree-node" };
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "Index",
    props: {
      data: {}
    },
    setup(__props) {
      let treeRef = vue.ref();
      let props = __props;
      return (_ctx, _cache) => {
        const _component_el_space = vue.resolveComponent("el-space");
        const _component_el_tree = vue.resolveComponent("el-tree");
        return vue.openBlock(), vue.createBlock(_component_el_tree, vue.mergeProps({
          data: vue.unref(props).data,
          "highlight-current": ""
        }, _ctx.$attrs, {
          ref_key: "treeRef",
          ref: treeRef
        }), {
          default: vue.withCtx(({ node }) => [
            vue.createElementVNode("div", _hoisted_1, [
              vue.createElementVNode("span", null, vue.toDisplayString(node.label), 1),
              node.isCurrent ? (vue.openBlock(), vue.createBlock(_component_el_space, { key: 0 }, {
                default: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "nodeBtn", { data: node }, void 0, true)
                ]),
                _: 2
              }, 1024)) : vue.createCommentVNode("", true)
            ])
          ]),
          _: 3
        }, 16, ["data"]);
      };
    }
  });
  const Tree = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c6e0fe37"]]);
  const TreePlugin = {
    install(app) {
      app.component("yh-tree", Tree);
    }
  };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "Index",
    props: {
      gap: {
        type: String,
        default: "16px"
      },
      columns: {
        type: Number,
        default: 1
      },
      rows: {
        type: Number,
        default: 1
      }
    },
    setup(__props) {
      vue.useCssVars((_ctx) => ({
        "872e5ca6": __props.gap
      }));
      let props = __props;
      let methods2 = {
        setColumns() {
          let type = typeof props.columns;
          if (type == "number") {
            return props.columns == 1 ? "auto" : `repeat(${props.columns}, 1fr)`;
          } else if (type == "string") {
            return props.columns;
          } else {
            return "auto";
          }
        },
        setRows() {
          let type = typeof props.rows;
          if (type == "number") {
            return props.rows == 1 ? "auto" : `repeat(${props.rows}, 1fr)`;
          } else if (type == "string") {
            return props.rows;
          } else {
            return "auto";
          }
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: "yh-grid",
          style: vue.normalizeStyle({ "grid-template-columns": vue.unref(methods2).setColumns(), "grid-template-rows": vue.unref(methods2).setRows() })
        }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4);
      };
    }
  });
  const Grid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4e70538c"]]);
  const GridPlugin = {
    install(app) {
      app.component("yh-grid", Grid);
    }
  };
  let methods = {
    getUuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    },
    dateFormat(date, fmt = "YYYY-MM-DD hh:mm:ss") {
      if (!date) {
        date = /* @__PURE__ */ new Date();
      }
      if (typeof date == "string") {
        date = new Date(date);
      }
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(),
        // 年
        "M+": (date.getMonth() + 1).toString(),
        // 月
        "D+": date.getDate().toString(),
        // 日
        "h+": date.getHours().toString(),
        // 时
        "m+": date.getMinutes().toString(),
        // 分
        "s+": date.getSeconds().toString()
        // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
        }
      }
      return fmt;
    }
  };
  const YPlugin = {
    install(app) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      (_a = TablePlugin.install) == null ? void 0 : _a.call(TablePlugin, app);
      (_b = DialogPlugin.install) == null ? void 0 : _b.call(DialogPlugin, app);
      (_c = FormPlugin.install) == null ? void 0 : _c.call(FormPlugin, app);
      (_d = DynamicFormPlugin.install) == null ? void 0 : _d.call(DynamicFormPlugin, app);
      (_e = DrawerPlugin.install) == null ? void 0 : _e.call(DrawerPlugin, app);
      (_f = FormTablePlugin.install) == null ? void 0 : _f.call(FormTablePlugin, app);
      (_g = TreePlugin.install) == null ? void 0 : _g.call(TreePlugin, app);
      (_h = GridPlugin.install) == null ? void 0 : _h.call(GridPlugin, app);
      app.config.globalProperties.$utils = methods;
    }
  };
  return YPlugin;
});
