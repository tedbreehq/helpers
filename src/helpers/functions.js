export const objectMerge = (obj, src) => {
    Object.keys(src).forEach(function (key) { obj[key] = src[key]; });
    return obj;
}

export const convertToUnit = (str, unit = 'px') => {
    if (str == null || str === '') {
        return undefined
    } else if (isNaN(+str)) {
        return String(str)
    } else {
        return `${Number(str)}${unit}`
    }
}

export const arrayDiff = (a, b) => {
    const diff = [];
    for (let i = 0; i < b.length; i++) {
        if (a.indexOf(b[i]) < 0) diff.push(b[i])
    }
    return diff
}

export const formatParams = (queryName, value) => {
    queryName = queryName.replace(/=/g, '');
    let result = [];

    switch (value.constructor) {
        case String:
        case Number:
        case Boolean:
            result.push(encodeURIComponent(queryName) + '=' + encodeURIComponent(value));
            break;

        case Array:
            value.forEach(function (item) {
                result = result.concat(formatParams(queryName + '[]=', item))
            });
            break;

        case Object:
            Object.keys(value).forEach(function (key) {
                let item = value[key];
                result = result.concat(formatParams(queryName + '[' + key + ']', item))
            });
            break
    }

    return result
}

export const flatten = (array) => {
    let queries = [];

    array.forEach(function (item) {
        if (typeof item === 'string') {
            queries.push(item)
        } else {
            queries = queries.concat(flatten(item))
        }
    });

    return queries
}


/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
export const debounce => (func, wait, immediate) => {
    var timeout, args, context, timestamp, result;
    if (null == wait) wait = 100;
  
    function later() {
      var last = Date.now() - timestamp;
  
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };
  
    var debounced = function(){
      context = this;
      args = arguments;
      timestamp = Date.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
  
      return result;
    };
  
    debounced.clear = function() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
    
    debounced.flush = function() {
      if (timeout) {
        result = func.apply(context, args);
        context = args = null;
        
        clearTimeout(timeout);
        timeout = null;
      }
    };
  
    return debounced;
  };

