(window["gcp_jsonp"] = window["gcp_jsonp"] || []).push([[1],{

/***/ "0e5f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules//.cache//vue-loader","cacheIdentifier":"2867f158-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/web-components/DatasetPicker/DatasetPicker.vue?vue&type=template&id=7857c51f&shadow
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"gcp-picker"},[_c('md-button',{staticClass:"md-primary md-raised gcp-picker--btn",on:{"click":function($event){_vm.select()}}},[_vm._v("Select")])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/web-components/DatasetPicker/DatasetPicker.vue?vue&type=template&id=7857c51f&shadow

// EXTERNAL MODULE: ./src/web-components/common.js
var common = __webpack_require__("f2fe");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/web-components/DatasetPicker/DatasetPicker.vue?vue&type=script&lang=js&shadow
//
//
//
//
//
//

/* harmony default export */ var DatasetPickervue_type_script_lang_js_shadow = ({
  name: 'DatasetPicker',
  props: {
    onSelect: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return {};
  },
  methods: {
    select: function select() {
      var result = {
        'qido-rs': 'https://healthcare.googleapis.com/v1alpha/projects/healthcare-api-215503/locations/us-central1/datasets/mydataset/dicomStores/mydicomstore/dicomWeb'
      };
      this.$props.onSelect(result);
    }
  }
});
// CONCATENATED MODULE: ./src/web-components/DatasetPicker/DatasetPicker.vue?vue&type=script&lang=js&shadow
 /* harmony default export */ var DatasetPicker_DatasetPickervue_type_script_lang_js_shadow = (DatasetPickervue_type_script_lang_js_shadow); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/web-components/DatasetPicker/DatasetPicker.vue?shadow



function injectStyles (context) {
  
  var style0 = __webpack_require__("efcb")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  DatasetPicker_DatasetPickervue_type_script_lang_js_shadow,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  null
  ,true
)

component.options.__file = "DatasetPicker.vue"
/* harmony default export */ var DatasetPickershadow = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "63d6":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("e378");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("6b300aa7", content, shadowRoot)
};

/***/ }),

/***/ "e378":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports
exports.i(__webpack_require__("45f9"), "");
exports.i(__webpack_require__("72c7"), "");

// module
exports.push([module.i, "\n.gcp-picker{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-font-smoothing:antialiased;display:-webkit-box;display:-ms-flexbox;display:flex;width:450px;height:300px\n}\n.gcp-picker--btn{margin:auto\n}", ""]);

// exports


/***/ }),

/***/ "efcb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_3_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DatasetPicker_vue_vue_type_style_index_0_lang_stylus_shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("63d6");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_3_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DatasetPicker_vue_vue_type_style_index_0_lang_stylus_shadow__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_3_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DatasetPicker_vue_vue_type_style_index_0_lang_stylus_shadow__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_3_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DatasetPicker_vue_vue_type_style_index_0_lang_stylus_shadow__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_3_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DatasetPicker_vue_vue_type_style_index_0_lang_stylus_shadow__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_11_oneOf_1_0_node_modules_css_loader_index_js_ref_11_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_2_node_modules_postcss_loader_lib_index_js_ref_11_oneOf_1_3_node_modules_stylus_loader_index_js_ref_11_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DatasetPicker_vue_vue_type_style_index_0_lang_stylus_shadow__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f2fe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8bbf");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_material_dist_components_MdButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("7193");
/* harmony import */ var vue_material_dist_components_MdButton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_material_dist_components_MdButton__WEBPACK_IMPORTED_MODULE_1__);


vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vue_material_dist_components_MdButton__WEBPACK_IMPORTED_MODULE_1___default.a);

/***/ })

}]);
//# sourceMappingURL=gcp.1.js.map