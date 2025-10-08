/* LICENSES */
var __webpack_modules__={"./src/MiddlewareManager.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiddlewareManager)
/* harmony export */ });
class MiddlewareManager {\r
    constructor(middlewares) {\r
        this.middlewareMap = new Map();\r
        if (middlewares)\r
            this.middlewareMap = new Map(middlewares.entries);\r
    }\r
    add(middleware) {\r
        const index = this.middlewareMap.size;\r
        this.middlewareMap.set(index, middleware);\r
        return index;\r
    }\r
    remove(index) {\r
        return this.middlewareMap.delete(index);\r
    }\r
    get entries() {\r
        return this.middlewareMap.entries();\r
    }\r
    get size() {\r
        return this.middlewareMap.size;\r
    }\r
    [Symbol.iterator]() {\r
        let index = -1;\r
        let data = Array.from(this.middlewareMap.values()).filter(Boolean);\r
        return {\r
            next: () => ({ value: data[++index], done: !(index in data) })\r
        };\r
    }\r
}\r


//# sourceURL=webpack://gofetch-client/./src/MiddlewareManager.ts?`)},"./src/RetryController.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RetryController": () => (/* binding */ RetryController),
/* harmony export */   "RetryEvent": () => (/* binding */ RetryEvent),
/* harmony export */   "RetrySignal": () => (/* binding */ RetrySignal)
/* harmony export */ });
class RetrySignal extends EventTarget {\r
    constructor() {\r
        super();\r
        this._retries = 0;\r
        this.addEventListener('retry', (e) => {\r
            this._retries = e.retries;\r
            if (this.onretry)\r
                this.onretry(e);\r
        });\r
    }\r
    get retries() {\r
        return this._retries;\r
    }\r
}\r
class RetryEvent extends Event {\r
    constructor(retries) {\r
        super('retry', {\r
            bubbles: false,\r
            cancelable: false,\r
            composed: false\r
        });\r
        this.retries = retries;\r
    }\r
}\r
class RetryController {\r
    constructor() {\r
        this.signal = new RetrySignal();\r
    }\r
    retry() {\r
        const event = new RetryEvent(this.signal.retries + 1);\r
        this.signal.dispatchEvent(event);\r
    }\r
}\r


//# sourceURL=webpack://gofetch-client/./src/RetryController.ts?`)},"./src/common/types.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
\r


//# sourceURL=webpack://gofetch-client/./src/common/types.ts?`)},"./src/common/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CAMEL_CASE_RE": () => (/* binding */ CAMEL_CASE_RE),
/* harmony export */   "GofetchError": () => (/* binding */ GofetchError),
/* harmony export */   "camelToSnakeCase": () => (/* binding */ camelToSnakeCase),
/* harmony export */   "createJSONIndexProxy": () => (/* binding */ createJSONIndexProxy),
/* harmony export */   "deepMerge": () => (/* binding */ deepMerge),
/* harmony export */   "isAbsoluteURL": () => (/* binding */ isAbsoluteURL),
/* harmony export */   "isIterable": () => (/* binding */ isIterable),
/* harmony export */   "isResponse": () => (/* binding */ isResponse),
/* harmony export */   "iterableToObject": () => (/* binding */ iterableToObject),
/* harmony export */   "resolveURL": () => (/* binding */ resolveURL)
/* harmony export */ });
function isAbsoluteURL(url) {\r
    const r = new RegExp('^(?:[a-z+]+:)?//', 'i');\r
    return r.test(url.toString());\r
}\r
function isResponse(fetch) {\r
    return 'ok' in fetch;\r
}\r
function isPlainObject(obj) {\r
    return (obj && typeof obj === 'object' && obj.constructor === Object);\r
}\r
function isObject(obj) {\r
    return (obj && typeof obj === 'object');\r
}\r
function deepMerge(obj1, obj2) {\r
    const clone = Object.assign({}, obj1);\r
    if (isObject(clone)) {\r
        for (const key in obj2) {\r
            if (isPlainObject(obj2[key])) {\r
                clone[key] = deepMerge(clone[key], obj2[key]);\r
            }\r
            else {\r
                Object.assign(clone, { [key]: obj2[key] });\r
            }\r
        }\r
        return clone; // properties merged into obj1 and overwrite\r
    }\r
    else {\r
        throw new TypeError('Parameter is not of type Object');\r
    }\r
}\r
function isIterable(i) {\r
    if (!i)\r
        return false;\r
    return (Symbol.iterator in i) || Array.isArray(i);\r
}\r
function iterableToObject(iterable) {\r
    if (!isIterable(iterable))\r
        throw new TypeError("Object is not iterable");\r
    const object = {};\r
    for (const item of iterable) {\r
        const [key, value] = item;\r
        object[key] = value;\r
    }\r
    return object;\r
}\r
class GofetchError extends Error {\r
    constructor(response, message) {\r
        super();\r
        this.response = response;\r
        this.name = "GofetchError";\r
        if (response.raw instanceof Response) {\r
            if (message) {\r
                this.message = message;\r
            }\r
            else if (response.raw.statusText) {\r
                this.message = \`\${response.raw.status} \${response.raw.statusText}\`;\r
            }\r
            else {\r
                this.message = \`Request failed with status code \${response.raw.status}\`;\r
            }\r
        }\r
        else {\r
            this.message = message !== null && message !== void 0 ? message : '';\r
        }\r
    }\r
}\r
function resolveURL(path, base) {\r
    if (isAbsoluteURL(path)) {\r
        return path;\r
    }\r
    if (typeof path !== "string" && 'url' in path)\r
        path = path.url;\r
    return new URL(path, base);\r
}\r
function createJSONIndexProxy(obj, indexTest, indexTransformer) {\r
    const testIndex = (p) => {\r
        p = p.toString();\r
        if (typeof indexTest === "string") {\r
            return p === indexTest;\r
        }\r
        else {\r
            return indexTest.test(p);\r
        }\r
    };\r
    const transformKey = (p) => {\r
        let propertyKey = p;\r
        if (testIndex(p)) {\r
            propertyKey = indexTransformer(p);\r
        }\r
        return propertyKey;\r
    };\r
    return new Proxy(obj, {\r
        get(target, p, receiver) {\r
            const propertyKey = transformKey(p);\r
            return Reflect.get(target, propertyKey, receiver);\r
        },\r
        set(target, p, newValue, receiver) {\r
            const propertyKey = transformKey(p);\r
            return Reflect.set(target, propertyKey, newValue, receiver);\r
        },\r
        defineProperty(target, property, attributes) {\r
            const propertyKey = transformKey(property);\r
            return Reflect.defineProperty(target, propertyKey, attributes);\r
        },\r
        deleteProperty(target, p) {\r
            const propertyKey = transformKey(p);\r
            return Reflect.deleteProperty(target, propertyKey);\r
        },\r
        getOwnPropertyDescriptor(target, p) {\r
            const propertyKey = transformKey(p);\r
            return Reflect.getOwnPropertyDescriptor(target, propertyKey);\r
        },\r
        has(target, p) {\r
            const propertyKey = transformKey(p);\r
            return Reflect.has(target, propertyKey);\r
        },\r
    });\r
}\r
function camelToSnakeCase(str) {\r
    return str.replace(/[A-Z]/g, (letter, offset) => {\r
        if (!offset)\r
            return letter.toLowerCase();\r
        return \`_\${letter.toLowerCase()}\`;\r
    });\r
}\r
;\r
const CAMEL_CASE_RE = '^[a-zA-Z]+([A-Z][a-z]+)+$';\r


//# sourceURL=webpack://gofetch-client/./src/common/utils.ts?`)},"./src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CAMEL_CASE_RE": () => (/* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_0__.CAMEL_CASE_RE),
/* harmony export */   "Gofetch": () => (/* binding */ Gofetch),
/* harmony export */   "GofetchError": () => (/* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_0__.GofetchError),
/* harmony export */   "RetryController": () => (/* reexport safe */ _RetryController__WEBPACK_IMPORTED_MODULE_2__.RetryController),
/* harmony export */   "camelToSnakeCase": () => (/* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_0__.camelToSnakeCase),
/* harmony export */   "createJSONIndexProxy": () => (/* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_0__.createJSONIndexProxy),
/* harmony export */   "deepMerge": () => (/* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_0__.deepMerge),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "isAbsoluteURL": () => (/* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_0__.isAbsoluteURL),
/* harmony export */   "isIterable": () => (/* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_0__.isIterable),
/* harmony export */   "isResponse": () => (/* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_0__.isResponse),
/* harmony export */   "iterableToObject": () => (/* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject),
/* harmony export */   "resolveURL": () => (/* reexport safe */ _common_utils__WEBPACK_IMPORTED_MODULE_0__.resolveURL)
/* harmony export */ });
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/utils */ "./src/common/utils.ts");
/* harmony import */ var _MiddlewareManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MiddlewareManager */ "./src/MiddlewareManager.ts");
/* harmony import */ var _RetryController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RetryController */ "./src/RetryController.ts");
/* harmony import */ var _common_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/types */ "./src/common/types.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r
    return new (P || (P = Promise))(function (resolve, reject) {\r
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }\r
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r
        step((generator = generator.apply(thisArg, _arguments || [])).next());\r
    });\r
};\r
var __rest = (undefined && undefined.__rest) || function (s, e) {\r
    var t = {};\r
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r
        t[p] = s[p];\r
    if (s != null && typeof Object.getOwnPropertySymbols === "function")\r
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {\r
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))\r
                t[p[i]] = s[p[i]];\r
        }\r
    return t;\r
};\r
\r
\r
\r
class Gofetch {\r
    constructor(baseURL, options = {}, fetch = new Request(new URL(baseURL.toString()), Object.assign(Object.assign({}, options), { body: undefined })), middlewares = new _MiddlewareManager__WEBPACK_IMPORTED_MODULE_1__["default"]()) {\r
        this._middlewares = new _MiddlewareManager__WEBPACK_IMPORTED_MODULE_1__["default"]();\r
        this._fetch = fetch;\r
        this._defaultOptions = options;\r
        this._middlewares = middlewares;\r
        this.createJSONIndexProxy = (json) => {\r
            return (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.createJSONIndexProxy)(json, new RegExp(_common_utils__WEBPACK_IMPORTED_MODULE_0__.CAMEL_CASE_RE), (index) => {\r
                index = index.toString();\r
                return (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.camelToSnakeCase)(index);\r
            });\r
        };\r
    }\r
    get fetch() {\r
        return this._fetch.clone();\r
    }\r
    get body() {\r
        return this.fetch.body;\r
    }\r
    get bodyUsed() {\r
        return this._fetch.bodyUsed;\r
    }\r
    get headers() {\r
        return (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject)(this._fetch.headers);\r
    }\r
    get url() {\r
        return this._fetch.url;\r
    }\r
    get raw() {\r
        return this.fetch;\r
    }\r
    arrayBuffer() {\r
        return this.fetch.arrayBuffer();\r
    }\r
    blob() {\r
        return this.fetch.blob();\r
    }\r
    clone() {\r
        return this._fetch.clone();\r
    }\r
    formData() {\r
        return this.fetch.formData();\r
    }\r
    json() {\r
        return __awaiter(this, void 0, void 0, function* () {\r
            const json = yield this.fetch.json();\r
            if (!this.createJSONIndexProxy)\r
                return json;\r
            return this.createJSONIndexProxy(json);\r
        });\r
    }\r
    text() {\r
        return this.fetch.text();\r
    }\r
    /**\r
     *\r
     * @param input Input URL of the request resource.\r
     * @param requestConfig The config options that will be passed to fetch().\r
     * @param method The HTTP method of the request\r
     * @returns A Gofetch Response init.\r
     */\r
    gofetch(input, options, method, body) {\r
        var _a;\r
        return __awaiter(this, void 0, void 0, function* () {\r
            let response;\r
            const controller = new _RetryController__WEBPACK_IMPORTED_MODULE_2__.RetryController();\r
            const signal = controller.signal;\r
            let shouldTry = true;\r
            const onRetry = () => {\r
                shouldTry = true;\r
            };\r
            options.method = method;\r
            let request = yield this.dispatchRequestMiddlewares(input, Object.assign({ body }, (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.deepMerge)(this._defaultOptions, options)));\r
            while (true) {\r
                shouldTry = false; // run only once\r
                signal.addEventListener('retry', onRetry, { once: true }); // unless retried\r
                const rawResponse = yield fetch((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.resolveURL)(input, this._fetch.url), Object.assign(Object.assign({}, request), { body: request.body, method }));\r
                response = yield this.dispatchResponseMiddlewares(input, {\r
                    body: rawResponse.body,\r
                    headers: (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject)(rawResponse.headers),\r
                    status: rawResponse.status,\r
                    statusText: rawResponse.statusText\r
                }, controller);\r
                // merge old headers with new headers\r
                if (!request.headers)\r
                    request.headers = response.headers;\r
                else {\r
                    if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.isIterable)(request.headers))\r
                        request.headers = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject)(request.headers);\r
                    request.headers = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.deepMerge)(request.headers, response.headers);\r
                }\r
                // if the body field is specified in the retry config then we consider this the new body\r
                request.body = 'body' in response ? (_a = response.body) !== null && _a !== void 0 ? _a : undefined : request.body;\r
                if (!shouldTry)\r
                    break;\r
            }\r
            // cleanup\r
            signal.removeEventListener('retry', onRetry);\r
            return response;\r
        });\r
    }\r
    get(input, options = {}) {\r
        return __awaiter(this, void 0, void 0, function* () {\r
            if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.isIterable)(options.headers))\r
                options.headers = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject)(options.headers);\r
            return yield this.gofetch(input !== null && input !== void 0 ? input : this.url, options, 'GET');\r
        });\r
    }\r
    head(input, options = {}) {\r
        return __awaiter(this, void 0, void 0, function* () {\r
            if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.isIterable)(options.headers))\r
                options.headers = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject)(options.headers);\r
            return yield this.gofetch(input !== null && input !== void 0 ? input : this.url, options, 'HEAD');\r
        });\r
    }\r
    post(input, body, options = {}) {\r
        return __awaiter(this, void 0, void 0, function* () {\r
            if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.isIterable)(options.headers))\r
                options.headers = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject)(options.headers);\r
            return yield this.gofetch(input !== null && input !== void 0 ? input : this.url, options, 'POST', body);\r
        });\r
    }\r
    options(input, body, options = {}) {\r
        return __awaiter(this, void 0, void 0, function* () {\r
            if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.isIterable)(options.headers))\r
                options.headers = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject)(options.headers);\r
            return yield this.gofetch(input !== null && input !== void 0 ? input : this.url, options, 'OPTIONS', body);\r
        });\r
    }\r
    delete(input, body, options = {}) {\r
        return __awaiter(this, void 0, void 0, function* () {\r
            if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.isIterable)(options.headers))\r
                options.headers = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject)(options.headers);\r
            return yield this.gofetch(input !== null && input !== void 0 ? input : this.url, options, 'DELETE', body);\r
        });\r
    }\r
    patch(input, body, options = {}) {\r
        return __awaiter(this, void 0, void 0, function* () {\r
            if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.isIterable)(options.headers))\r
                options.headers = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject)(options.headers);\r
            return yield this.gofetch(input !== null && input !== void 0 ? input : this.url, options, 'PATCH', body);\r
        });\r
    }\r
    put(input, body, options = {}) {\r
        return __awaiter(this, void 0, void 0, function* () {\r
            if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.isIterable)(options.headers))\r
                options.headers = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.iterableToObject)(options.headers);\r
            return yield this.gofetch(input !== null && input !== void 0 ? input : this.url, options, 'PUT', body);\r
        });\r
    }\r
    /**\r
     *\r
     * @param baseURL The base URL prepended to relative identifiers.\r
     * @param options The config options that will be passed to fetch().\r
     * @param body Optional body of the request.\r
     * @returns A Gofetch Request instance.\r
     */\r
    createInstance(baseURL, options = {}, body) {\r
        // merge defaults\r
        options = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.deepMerge)(this._defaultOptions, options);\r
        const _fetch = new Request(baseURL, Object.assign(Object.assign({}, options), { body }));\r
        return new Gofetch(baseURL, options, _fetch, new _MiddlewareManager__WEBPACK_IMPORTED_MODULE_1__["default"](this._middlewares));\r
    }\r
    /**\r
     *\r
     * @param middleware An object that implements an onRequest, onResponse or onError method.\r
     * @returns The ID associated with the middleware.\r
     */\r
    use(middleware) {\r
        return this._middlewares.add(middleware);\r
    }\r
    /**\r
     *\r
     * @param _id The ID associated with the middleware.\r
     * @returns A boolean indicating whether the middlware was removed or not.\r
     */\r
    remove(_id) {\r
        return this._middlewares.remove(_id);\r
    }\r
    dispatchResponseMiddlewares(input, config, controller) {\r
        return __awaiter(this, void 0, void 0, function* () {\r
            let shouldBreak = false;\r
            const onRetry = () => {\r
                shouldBreak = true; // break middleware chain on retry\r
            };\r
            controller.signal.addEventListener('retry', onRetry, { once: true });\r
            let response = new Gofetch(input, {}, new Response(config.body, {\r
                headers: config.headers,\r
                status: config.status,\r
                statusText: config.statusText\r
            }));\r
            for (const middleware of this._middlewares) {\r
                if (!middleware.onResponse && !middleware.onError)\r
                    continue;\r
                if (response.raw.ok) {\r
                    if (middleware.onResponse) {\r
                        const newConfig = yield middleware.onResponse(response);\r
                        if (newConfig) {\r
                            config = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.deepMerge)(config, newConfig);\r
                            config.body = newConfig.body;\r
                        }\r
                    }\r
                }\r
                else {\r
                    const error = new _common_utils__WEBPACK_IMPORTED_MODULE_0__.GofetchError(response);\r
                    if (middleware.onError) {\r
                        const newConfig = yield middleware.onError(error, controller);\r
                        if (newConfig) {\r
                            config = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.deepMerge)(config, newConfig);\r
                            config.body = newConfig.body;\r
                        }\r
                    }\r
                }\r
                if (config.body instanceof ReadableStream && config.body.locked)\r
                    config.body = response.body;\r
                response = new Gofetch(input, {}, new Response(config.body, {\r
                    headers: config.headers,\r
                    status: config.status,\r
                    statusText: config.statusText\r
                }));\r
                if (shouldBreak)\r
                    break;\r
            }\r
            // cleanup\r
            controller.signal.removeEventListener('retry', onRetry);\r
            // no retry signalled throw unhandled error\r
            if (!shouldBreak && !response.raw.ok) {\r
                const error = new _common_utils__WEBPACK_IMPORTED_MODULE_0__.GofetchError(response);\r
                throw error;\r
            }\r
            return response;\r
        });\r
    }\r
    dispatchRequestMiddlewares(input, config) {\r
        return __awaiter(this, void 0, void 0, function* () {\r
            const { body } = config, options = __rest(config, ["body"]);\r
            let request = this.createInstance(input, options, body);\r
            for (const middleware of this._middlewares) {\r
                const { body } = config, options = __rest(config, ["body"]);\r
                request = this.createInstance(input, options, body);\r
                if (middleware.onRequest) {\r
                    const newConfig = yield middleware.onRequest(request);\r
                    if (newConfig)\r
                        config = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.deepMerge)(config, newConfig);\r
                }\r
            }\r
            return config;\r
        });\r
    }\r
}\r
let baseURL;\r
if (globalThis.location) {\r
    baseURL = globalThis.location.origin;\r
}\r
else if (globalThis.process) {\r
    baseURL = globalThis.process.cwd();\r
}\r
else if (globalThis.Deno) {\r
    baseURL = globalThis.Deno.cwd();\r
}\r
else {\r
    throw new Error('No Base URL');\r
}\r
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Gofetch(baseURL));\r
// on platforms where baseURL is impossible to assume i.e. deno or node\r
// we export the constructor instead\r
\r
\r
\r


//# sourceURL=webpack://gofetch-client/./src/index.ts?`)}},__webpack_module_cache__={};function __webpack_require__(e){var r=__webpack_module_cache__[e];if(r!==void 0)return r.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(e,r)=>{for(var n in r)__webpack_require__.o(r,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})};__webpack_require__.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r);__webpack_require__.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./src/index.ts");__webpack_exports__.CAMEL_CASE_RE;var __webpack_exports__Gofetch=__webpack_exports__.Gofetch;__webpack_exports__.GofetchError;__webpack_exports__.RetryController;__webpack_exports__.camelToSnakeCase;__webpack_exports__.createJSONIndexProxy;__webpack_exports__.deepMerge;var __webpack_exports__default=__webpack_exports__.default;__webpack_exports__.isAbsoluteURL;__webpack_exports__.isIterable;__webpack_exports__.isResponse;__webpack_exports__.iterableToObject;__webpack_exports__.resolveURL;export{__webpack_exports__Gofetch as _,__webpack_exports__default as a};
