(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-notice-detail"],{"0346":function(t,e,n){var a=n("9815");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("53a37f33",a,!0,{sourceMap:!1,shadowMode:!1})},"0dc7":function(t,e,n){"use strict";var a=n("0346"),i=n.n(a);i.a},9815:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.rf-notice-detail .banner[data-v-41ea19ed]{overflow:hidden;position:relative;background-color:#ccc}.rf-notice-detail .banner .banner-img[data-v-41ea19ed]{height:%?300?%;width:100%}.rf-notice-detail .banner .banner-title[data-v-41ea19ed]{max-height:%?84?%;overflow:hidden;position:absolute;bottom:0;width:100%;font-size:%?32?%;font-weight:400;line-height:%?42?%;color:#fff;z-index:11;background-color:rgba(0,0,0,.25);padding:%?4?% %?20?%}.rf-notice-detail .banner-title[data-v-41ea19ed]{padding:%?30?% %?30?% 0;font-size:%?32?%}.rf-notice-detail .article-meta[data-v-41ea19ed]{padding:%?20?% %?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;color:grey}.rf-notice-detail .article-meta .article-text[data-v-41ea19ed]{font-size:%?26?%;line-height:%?50?%;margin:0 %?20?%}.rf-notice-detail .article-meta .article-author[data-v-41ea19ed],\n.rf-notice-detail .article-meta .article-time[data-v-41ea19ed]{font-size:%?30?%}.rf-notice-detail .article-content[data-v-41ea19ed]{padding:0 %?30?%;overflow:hidden;font-size:%?30?%;margin-bottom:%?30?%}',""]),t.exports=e},a755:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var a={rfImage:n("78d7").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"rf-notice-detail"},[t.announceDetail.cover?n("v-uni-view",{staticClass:"banner"},[n("rf-image",{staticClass:"banner-img",attrs:{src:t.announceDetail.cover}}),n("v-uni-view",{staticClass:"banner-title in2line"},[t._v(t._s(t.announceDetail.title))])],1):t._e(),t.announceDetail.cover?t._e():n("v-uni-view",{staticClass:"banner-title"},[t._v(t._s(t.announceDetail.title))]),t.announceDetail.created_at?n("v-uni-view",{staticClass:"article-meta"},[n("v-uni-text",{staticClass:"article-author"},[t._v(t._s(t.announceDetail.author_name))]),n("v-uni-text",{staticClass:"article-text"},[t._v("发布于")]),n("v-uni-text",{staticClass:"article-time"},[t._v(t._s(t._f("time")(t.announceDetail.created_at)))])],1):t._e(),n("v-uni-view",{staticClass:"article-content"},[n("rf-parser",{attrs:{"lazy-load":!0,html:t.announceDetail.content}})],1),t.announceDetail||t.loading?t._e():n("rf-empty",{attrs:{info:"暂无商城公告详情"}}),n("rfLoading",{attrs:{isFullScreen:!0,active:t.loading}})],1)},r=[]},b7f9:function(t,e,n){"use strict";var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var i=a(n("1da1")),r=n("0bdd"),o=a(n("7b90")),c={data:function(){return{announceDetail:{},id:void 0,loading:!0}},filters:{time:function(t){return(0,o.default)(1e3*t).format("YYYY-MM-DD HH:mm")}},onLoad:function(t){this.id=t.id,this.getNotifyAnnounceView(t.id)},onShareAppMessage:function(){return{title:this.banner.title,path:"/pages/index/notice/detail?id=".concat(this.id)}},methods:{getNotifyAnnounceView:function(t){var e=this;return(0,i.default)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$http.get("".concat(r.notifyAnnounceView),{id:t}).then((function(t){e.loading=!1,e.announceDetail=t.data,uni.setNavigationBarTitle({title:t.data.title})})).catch((function(){e.loading=!1}));case 2:case"end":return n.stop()}}),n)})))()}}};e.default=c},c64d:function(t,e,n){"use strict";n.r(e);var a=n("b7f9"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},d13b:function(t,e,n){"use strict";n.r(e);var a=n("a755"),i=n("c64d");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("0dc7");var o,c=n("f0c5"),l=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"41ea19ed",null,!1,a["a"],o);e["default"]=l.exports}}]);