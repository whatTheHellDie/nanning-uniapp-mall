(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-set-invoice-invoice"],{"0d7f":function(e,t,i){"use strict";i.r(t);var n=i("696a"),o=i("eebb");for(var a in o)"default"!==a&&function(e){i.d(t,e,(function(){return o[e]}))}(a);i("ef33");var r,d=i("f0c5"),s=Object(d["a"])(o["default"],n["b"],n["c"],!1,null,"52c8d52a",null,!1,n["a"],r);t["default"]=s.exports},2909:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;var n=d(i("6005")),o=d(i("db90")),a=d(i("06c5")),r=d(i("3427"));function d(e){return e&&e.__esModule?e:{default:e}}function s(e){return(0,n.default)(e)||(0,o.default)(e)||(0,a.default)(e)||(0,r.default)()}},3427:function(e,t,i){"use strict";function n(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},"4def":function(e,t,i){"use strict";i.r(t);var n=i("7125"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},6005:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=a;var n=o(i("6b75"));function o(e){return e&&e.__esModule?e:{default:e}}function a(e){if(Array.isArray(e))return(0,n.default)(e)}},"696a":function(e,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return n}));var n={rfLoadMore:i("a874").default},o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"invoice-list"},[e.invoiceList.length>0?i("v-uni-view",{staticClass:"rf-list"},[e._l(e.invoiceList,(function(t,n){return i("v-uni-view",{key:n,staticClass:"rf-list-item",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.checkInvoice(t)},longpress:function(i){arguments[0]=i=e.$handleEvent(i),e.deleteInvoice(t.id)}}},[i("v-uni-view",{staticClass:"mid"},[i("v-uni-view",{staticClass:"t-box"},[1===parseInt(t.is_default,10)?i("v-uni-text",{staticClass:"tag",class:["text-"+e.themeColor.name]},[e._v("默认")]):e._e(),i("v-uni-text",[e._v("发票抬头: "+e._s(t.title))])],1),i("v-uni-view",{staticClass:"u-box"},[e._v("["+e._s(1===parseInt(t.type,10)?"公司":"个人")+"] —\n\t\t\t\t\t"+e._s(t.duty_paragraph||"个人发票无税号"))])],1),i("v-uni-view",{staticClass:"right"},[i("v-uni-text",{staticClass:"iconfont iconbianji",on:{click:function(i){i.stopPropagation(),arguments[0]=i=e.$handleEvent(i),e.addInvoice("edit",t.id)}}})],1)],1)})),e.invoiceList.length>0?i("v-uni-text",{staticClass:"tips",class:"text-"+e.themeColor.name},[e._v("提示：长按可删除当前发票。最多只能存在一个默认发票。")]):e._e(),e.invoiceList.length>0?i("rf-load-more",{attrs:{status:e.loadingType}}):e._e()],2):e._e(),i("v-uni-view",{staticClass:"add-btn-wrapper"},[i("v-uni-button",{staticClass:"add-btn",class:"bg-"+e.themeColor.name,on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.addInvoice("add")}}},[e._v("新增发票")])],1),0!==e.invoiceList.length||e.loading?e._e():i("rf-empty",{attrs:{info:"暂无发票"}}),i("rfLoading",{attrs:{isFullScreen:!0,active:e.loading}})],1)},a=[]},7125:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={name:"rf-load-more",props:{status:{type:String,default:"more"},width:{type:String,default:"100vw"},showIcon:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{}}}},data:function(){return{}}};t.default=n},"75a1":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.memberLevelIndex=t.productVirtualVerificationVerify=t.orderProductVirtualView=t.orderProductVirtualIndex=t.notifySubscriptionConfigIndex=t.notifySubscriptionConfigUpConfig=t.notifyUnRreadCount=t.notifyClearAll=t.notifyClear=t.notifyReadAll=t.notifyRead=t.notifyView=t.notifyIndex=t.orderProductIndex=t.orderCustomerRefundClose=t.orderCustomerRefundApply=t.orderCustomerSalesReturn=t.rechargeConfigIndex=t.thirdPartyAuthDelete=t.thirdPartyAuthList=t.opinionDetail=t.opinionCreate=t.opinionList=t.uploadImage=t.orderInvoiceList=t.orderInvoiceCreate=t.invoiceDel=t.invoiceDefault=t.invoiceDetail=t.invoiceUpdate=t.invoiceCreate=t.invoiceList=t.evaluateAgain=t.evaluateCreate=t.creditsLogList=t.collectList=t.footPrintDel=t.footPrintList=t.couponReceive=t.orderTakeDelivery=t.orderDelete=t.orderDetail=t.orderProductSalesReturn=t.closeOrderRefundApply=t.orderRefundApply=t.orderList=t.couponDetail=t.couponClear=t.myCouponList=t.couponList=t.addressDelete=t.addressUpdate=t.addressDetail=t.addressDefault=t.addressCreate=t.addressList=t.memberUpdate=t.memberInfo=void 0;var n="/sso/info";t.memberInfo=n;var o="/tiny-shop/v1/member/member/update";t.memberUpdate=o;var a="/member/address/list";t.addressList=a;var r="/tiny-shop/v1/member/address/default";t.addressDefault=r;var d="/tiny-shop/v1/member/address/view";t.addressDetail=d;var s="/member/address/add";t.addressCreate=s;var c="/tiny-shop/v1/member/address/update";t.addressUpdate=c;var l="/tiny-shop/v1/member/address/delete";t.addressDelete=l;var u="/tiny-shop/v1/marketing/coupon-type/index";t.couponList=u;var v="/tiny-shop/v1/member/coupon/index";t.myCouponList=v;var f="/tiny-shop/v1/marketing/coupon-type/view";t.couponDetail=f;var m="/member/coupon/add/";t.couponReceive=m;var p="/tiny-shop/v1/member/coupon/clear";t.couponClear=p;var b="/order/list";t.orderList=b;var h="/tiny-shop/v1/member/order/take-delivery";t.orderTakeDelivery=h;var y="/tiny-shop/v1/member/order-product/refund-apply";t.orderRefundApply=y;var g="/tiny-shop/v1/member/order-product/refund-sales-return";t.orderProductSalesReturn=g;var w="/tiny-shop/v1/member/order-product/refund-close";t.closeOrderRefundApply=w;var x="/tiny-shop/v1/member/order/view";t.orderDetail=x;var k="/tiny-shop/v1/member/order/delete";t.orderDelete=k;var C="/member/readHistory/list";t.footPrintList=C;var _="/tiny-shop/v1/member/footprint/delete";t.footPrintDel=_;var L="/member/productCollection/list";t.collectList=L;var I="/tiny-shop/v1/member/credits-log/index";t.creditsLogList=I;var D="/tiny-shop/v1/member/evaluate/create";t.evaluateCreate=D;var R="/tiny-shop/v1/member/evaluate/again";t.evaluateAgain=R;var P="/tiny-shop/v1/member/order-product/index";t.orderProductIndex=P;var A="/tiny-shop/v1/member/invoice/index";t.invoiceList=A;var M="/tiny-shop/v1/member/invoice/create";t.invoiceCreate=M;var O="/tiny-shop/v1/member/invoice/update";t.invoiceUpdate=O;var S="/tiny-shop/v1/member/invoice/view";t.invoiceDetail=S;var j="/tiny-shop/v1/member/invoice/default";t.invoiceDefault=j;var V="/tiny-shop/v1/member/invoice/delete";t.invoiceDel=V;var E="/tiny-shop/v1/member/order-invoice/index";t.orderInvoiceList=E;var T="/tiny-shop/v1/member/order-invoice/create";t.orderInvoiceCreate=T;var U="/tiny-shop/v1/member/opinion/index";t.opinionList=U;var $="/tiny-shop/v1/member/opinion/create";t.opinionCreate=$;var z="/tiny-shop/v1/member/opinion/view";t.opinionDetail=z;var B="/tiny-shop/v1/member/auth/index";t.thirdPartyAuthList=B;var F="/tiny-shop/v1/member/auth/delete";t.thirdPartyAuthDelete=F;var H="/tiny-shop/v1/member/recharge-config/index";t.rechargeConfigIndex=H;var J="/tiny-shop/v1/member/order-customer/apply";t.orderCustomerRefundApply=J;var G="/tiny-shop/v1/member/order-customer/sales-return";t.orderCustomerSalesReturn=G;var q="/tiny-shop/v1/member/order-customer/close";t.orderCustomerRefundClose=q;var K="/tiny-shop/v1/common/file/images";t.uploadImage=K;var N="/tiny-shop/v1/member/notify/index";t.notifyIndex=N;var Q="/tiny-shop/v1/member/notify/view";t.notifyView=Q;var W="/tiny-shop/v1/member/notify/read";t.notifyRead=W;var X="/tiny-shop/v1/member/notify/read-all";t.notifyReadAll=X;var Y="/tiny-shop/v1/member/notify/clear";t.notifyClear=Y;var Z="/tiny-shop/v1/member/notify/clear-all";t.notifyClearAll=Z;var ee="/tiny-shop/v1/member/notify/un-read-count";t.notifyUnRreadCount=ee;var te="/tiny-shop/v1/member/notify-subscription-config/index";t.notifySubscriptionConfigIndex=te;var ie="/tiny-shop/v1/member/notify-subscription-config/up-config";t.notifySubscriptionConfigUpConfig=ie;var ne="/tiny-shop/v1/member/order-product-virtual/index";t.orderProductVirtualIndex=ne;var oe="/tiny-shop/v1/member/order-product-virtual/view";t.orderProductVirtualView=oe;var ae="/tiny-shop/v1/order/product-virtual-verification/verify";t.productVirtualVerificationVerify=ae;var re="/tiny-shop/v1/member/member-level/index";t.memberLevelIndex=re},"8c53":function(e,t,i){var n=i("995b");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("279df42a",n,!0,{sourceMap:!1,shadowMode:!1})},"8dd6":function(e,t,i){var n=i("d6b9");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("7846749e",n,!0,{sourceMap:!1,shadowMode:!1})},"995b":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-52c8d52a]{background-color:#f8f8f8}.invoice-list[data-v-52c8d52a]{position:relative}.invoice-list .t-box[data-v-52c8d52a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?30?%;color:#303133}.invoice-list .t-box .tag[data-v-52c8d52a]{font-size:%?24?%;margin-right:%?10?%;border:1px solid;-webkit-border-radius:%?4?%;border-radius:%?4?%;padding:0 %?12?%}.invoice-list .u-box[data-v-52c8d52a]{font-size:%?28?%;color:#909399;margin-top:%?16?%}.invoice-list .u-box .name[data-v-52c8d52a]{margin-right:%?30?%}body.?%PAGE?%[data-v-52c8d52a]{background-color:#f8f8f8}',""]),e.exports=t},a27f:function(e,t,i){"use strict";var n=i("4ea4");i("99af"),i("e25e"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(i("2909"));i("96cf");var a=n(i("1da1")),r=i("75a1"),d=n(i("a874")),s={components:{rfLoadMore:d.default},data:function(){return{timeOutEvent:0,source:0,invoiceList:[],page:1,loadingType:"more",loading:!0}},onShow:function(){this.initData()},onLoad:function(e){this.source=e.source},onPullDownRefresh:function(){this.page=1,this.invoiceList.length=0,this.getInvoiceList("refresh")},onReachBottom:function(){"nomore"!==this.loadingType&&(this.page++,this.getInvoiceList())},methods:{deleteInvoice:function(e){var t=this;uni.showModal({content:"确定要删除该发票吗",success:function(i){i.confirm&&t.handleInvoiceDel(e)}})},handleInvoiceDel:function(e){var t=this;return(0,a.default)(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,t.$http.delete("".concat(r.invoiceDel,"?id=").concat(e)).then((function(){t.page=1,t.invoiceList.length=0,t.getInvoiceList()}));case 2:case"end":return i.stop()}}),i)})))()},goTouchEnd:function(){clearTimeout(this.timeOutEvent)},goTouchMove:function(){clearTimeout(this.timeOutEvent),this.timeOutEvent=0},initData:function(){this.page=1,this.invoiceList.length=0,this.getInvoiceList()},getInvoiceList:function(e){var t=this;return(0,a.default)(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,t.$http.get("".concat(r.invoiceList),{page:t.page}).then((function(i){t.loading=!1,"refresh"===e&&uni.stopPullDownRefresh(),t.loadingType=10===i.data.length?"more":"nomore",t.invoiceList=[].concat((0,o.default)(t.invoiceList),(0,o.default)(i.data))})).catch((function(){"refresh"===e&&uni.stopPullDownRefresh(),t.loading=!1}));case 2:case"end":return i.stop()}}),i)})))()},checkInvoice:function(e){1===parseInt(this.source,10)&&(this.$mHelper.prePage().invoiceItem=e,this.$mRouter.back())},addInvoice:function(e,t){this.$mRouter.push({route:"/pages/set/invoice/manage?type=".concat(e,"&id=").concat(t)})}}};t.default=s},a874:function(e,t,i){"use strict";i.r(t);var n=i("be58"),o=i("4def");for(var a in o)"default"!==a&&function(e){i.d(t,e,(function(){return o[e]}))}(a);i("e10f");var r,d=i("f0c5"),s=Object(d["a"])(o["default"],n["b"],n["c"],!1,null,"1f4d694c",null,!1,n["a"],r);t["default"]=s.exports},be58:function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return n}));var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"rf-load-more",style:{width:e.width}},["loading"===e.status&&e.showIcon?i("v-uni-view",{staticClass:"rf-load-more__img"},[i("v-uni-view",{staticClass:"load1"},[i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}})],1),i("v-uni-view",{staticClass:"load2"},[i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}})],1),i("v-uni-view",{staticClass:"load3"},[i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}}),i("v-uni-view",{style:{background:e.color}})],1)],1):e._e(),i("v-uni-view",{staticClass:"cu-load",class:"more"===e.status?"loading":"over"})],1)},a=[]},d6b9:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,".rf-load-more[data-v-1f4d694c]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center\n\t/*position: fixed;*/\n\t/*bottom: 5upx;*/\n\t/*text-align: center;*/}.rf-load-more__text[data-v-1f4d694c]{font-size:%?28?%;color:#999}.rf-load-more__img[data-v-1f4d694c]{height:24px;width:24px;margin-right:10px}.rf-load-more__img > uni-view[data-v-1f4d694c]{position:absolute}.rf-load-more__img > uni-view uni-view[data-v-1f4d694c]{width:6px;height:2px;-webkit-border-top-left-radius:1px;border-top-left-radius:1px;-webkit-border-bottom-left-radius:1px;border-bottom-left-radius:1px;background:#999;position:absolute;opacity:.2;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-1f4d694c 1.56s ease infinite;animation:load-data-v-1f4d694c 1.56s ease infinite}.rf-load-more__img > uni-view uni-view[data-v-1f4d694c]:nth-child(1){-webkit-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.rf-load-more__img > uni-view uni-view[data-v-1f4d694c]:nth-child(2){-webkit-transform:rotate(180deg);transform:rotate(180deg);top:11px;right:0}.rf-load-more__img > uni-view uni-view[data-v-1f4d694c]:nth-child(3){-webkit-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.rf-load-more__img > uni-view uni-view[data-v-1f4d694c]:nth-child(4){top:11px;left:0}.load1[data-v-1f4d694c],\n.load2[data-v-1f4d694c],\n.load3[data-v-1f4d694c]{height:24px;width:24px}.load2[data-v-1f4d694c]{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-1f4d694c]{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.load1 uni-view[data-v-1f4d694c]:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-1f4d694c]:nth-child(1){-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-1f4d694c]:nth-child(1){-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-1f4d694c]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-1f4d694c]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-1f4d694c]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-1f4d694c]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-1f4d694c]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-1f4d694c]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-1f4d694c]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-1f4d694c]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-1f4d694c]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-1f4d694c{0%{opacity:1}100%{opacity:.2}}",""]),e.exports=t},db90:function(e,t,i){"use strict";function n(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}i("a4d3"),i("e01a"),i("d28b"),i("a630"),i("d3b7"),i("3ca3"),i("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},e10f:function(e,t,i){"use strict";var n=i("8dd6"),o=i.n(n);o.a},eebb:function(e,t,i){"use strict";i.r(t);var n=i("a27f"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},ef33:function(e,t,i){"use strict";var n=i("8c53"),o=i.n(n);o.a}}]);