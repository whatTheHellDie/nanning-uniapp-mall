(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-set-feedback-detail"],{"2a99":function(e,t,i){"use strict";var r=i("da2f"),a=i.n(r);a.a},3031:function(e,t,i){"use strict";var r=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("96cf");var a=r(i("1da1")),o=i("75a1"),n={data:function(){return{feedbackDetail:{},feedbackType:[{value:"1",name:"功能建议"},{value:"2",name:"BUG反馈"},{value:"3",name:"业务咨询"}]}},onLoad:function(e){this.initData(e)},methods:{initData:function(e){this.getFeedbackDetail(e.id)},getFeedbackDetail:function(e){var t=this;return(0,a.default)(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,t.$http.get("".concat(o.opinionDetail),{id:e}).then((function(e){t.feedbackDetail=e.data}));case 2:case"end":return i.stop()}}),i)})))()}}};t.default=n},"38ee":function(e,t,i){var r=i("24fb");t=r(!1),t.push([e.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-9ecf4f54]{background-color:#f8f8f8}\n/* 上传 */.uni-uploader[data-v-9ecf4f54]{-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-uploader-body[data-v-9ecf4f54]{margin-top:%?16?%}.uni-uploader__files[data-v-9ecf4f54]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap}.uni-uploader__file[data-v-9ecf4f54]{margin:%?10?%;width:%?210?%;height:%?210?%}.uni-uploader__img[data-v-9ecf4f54]{display:block;width:%?210?%;height:%?210?%}\n/*问题反馈*/.feedback-title[data-v-9ecf4f54]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?20?%;color:#8f8f94;font-size:%?28?%}.feedback-body[data-v-9ecf4f54]{background:#fff;padding:%?10?% %?20?%}.feedback-body .gender-item[data-v-9ecf4f54]{margin-right:%?20?%}.feedback-body .gender-item .gender-item-text[data-v-9ecf4f54]{padding-left:%?10?%}.feedback-body .gender-item uni-radio .wx-radio-input.wx-radio-input-checked[data-v-9ecf4f54]{background:#fa436a;border-color:#fa436a}.feedback-textare[data-v-9ecf4f54]{height:%?200?%;font-size:%?34?%;line-height:%?50?%;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;padding:%?20?% %?30?% 0}.feedback-input[data-v-9ecf4f54]{font-size:%?28?%;height:%?72?%;min-height:%?50?%;padding:%?15?% %?20?%;line-height:%?72?%}.feedback-uploader[data-v-9ecf4f54]{padding:%?22?% %?20?%}body.?%PAGE?%[data-v-9ecf4f54]{background-color:#f8f8f8}',""]),e.exports=t},"61bf":function(e,t,i){"use strict";i.r(t);var r=i("3031"),a=i.n(r);for(var o in r)"default"!==o&&function(e){i.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},"75a1":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.memberLevelIndex=t.productVirtualVerificationVerify=t.orderProductVirtualView=t.orderProductVirtualIndex=t.notifySubscriptionConfigIndex=t.notifySubscriptionConfigUpConfig=t.notifyUnRreadCount=t.notifyClearAll=t.notifyClear=t.notifyReadAll=t.notifyRead=t.notifyView=t.notifyIndex=t.orderProductIndex=t.orderCustomerRefundClose=t.orderCustomerRefundApply=t.orderCustomerSalesReturn=t.rechargeConfigIndex=t.thirdPartyAuthDelete=t.thirdPartyAuthList=t.opinionDetail=t.opinionCreate=t.opinionList=t.uploadImage=t.orderInvoiceList=t.orderInvoiceCreate=t.invoiceDel=t.invoiceDefault=t.invoiceDetail=t.invoiceUpdate=t.invoiceCreate=t.invoiceList=t.evaluateAgain=t.evaluateCreate=t.creditsLogList=t.collectList=t.footPrintDel=t.footPrintList=t.couponReceive=t.orderTakeDelivery=t.orderDelete=t.orderDetail=t.orderProductSalesReturn=t.closeOrderRefundApply=t.orderRefundApply=t.orderList=t.couponDetail=t.couponClear=t.myCouponList=t.couponList=t.addressDelete=t.addressUpdate=t.addressDetail=t.addressDefault=t.addressCreate=t.addressList=t.memberUpdate=t.memberInfo=void 0;var r="/sso/info";t.memberInfo=r;var a="/tiny-shop/v1/member/member/update";t.memberUpdate=a;var o="/member/address/list";t.addressList=o;var n="/tiny-shop/v1/member/address/default";t.addressDefault=n;var d="/tiny-shop/v1/member/address/view";t.addressDetail=d;var s="/member/address/add";t.addressCreate=s;var c="/tiny-shop/v1/member/address/update";t.addressUpdate=c;var v="/tiny-shop/v1/member/address/delete";t.addressDelete=v;var l="/tiny-shop/v1/marketing/coupon-type/index";t.couponList=l;var u="/tiny-shop/v1/member/coupon/index";t.myCouponList=u;var f="/tiny-shop/v1/marketing/coupon-type/view";t.couponDetail=f;var p="/member/coupon/add/";t.couponReceive=p;var b="/tiny-shop/v1/member/coupon/clear";t.couponClear=b;var m="/order/list";t.orderList=m;var y="/tiny-shop/v1/member/order/take-delivery";t.orderTakeDelivery=y;var h="/tiny-shop/v1/member/order-product/refund-apply";t.orderRefundApply=h;var x="/tiny-shop/v1/member/order-product/refund-sales-return";t.orderProductSalesReturn=x;var k="/tiny-shop/v1/member/order-product/refund-close";t.closeOrderRefundApply=k;var g="/tiny-shop/v1/member/order/view";t.orderDetail=g;var w="/tiny-shop/v1/member/order/delete";t.orderDelete=w;var C="/member/readHistory/list";t.footPrintList=C;var D="/tiny-shop/v1/member/footprint/delete";t.footPrintDel=D;var _="/member/productCollection/list";t.collectList=_;var L="/tiny-shop/v1/member/credits-log/index";t.creditsLogList=L;var R="/tiny-shop/v1/member/evaluate/create";t.evaluateCreate=R;var I="/tiny-shop/v1/member/evaluate/again";t.evaluateAgain=I;var P="/tiny-shop/v1/member/order-product/index";t.orderProductIndex=P;var A="/tiny-shop/v1/member/invoice/index";t.invoiceList=A;var V="/tiny-shop/v1/member/invoice/create";t.invoiceCreate=V;var U="/tiny-shop/v1/member/invoice/update";t.invoiceUpdate=U;var S="/tiny-shop/v1/member/invoice/view";t.invoiceDetail=S;var z="/tiny-shop/v1/member/invoice/default";t.invoiceDefault=z;var j="/tiny-shop/v1/member/invoice/delete";t.invoiceDel=j;var O="/tiny-shop/v1/member/order-invoice/index";t.orderInvoiceList=O;var T="/tiny-shop/v1/member/order-invoice/create";t.orderInvoiceCreate=T;var M="/tiny-shop/v1/member/opinion/index";t.opinionList=M;var F="/tiny-shop/v1/member/opinion/create";t.opinionCreate=F;var E="/tiny-shop/v1/member/opinion/view";t.opinionDetail=E;var G="/tiny-shop/v1/member/auth/index";t.thirdPartyAuthList=G;var J="/tiny-shop/v1/member/auth/delete";t.thirdPartyAuthDelete=J;var Q="/tiny-shop/v1/member/recharge-config/index";t.rechargeConfigIndex=Q;var $="/tiny-shop/v1/member/order-customer/apply";t.orderCustomerRefundApply=$;var B="/tiny-shop/v1/member/order-customer/sales-return";t.orderCustomerSalesReturn=B;var H="/tiny-shop/v1/member/order-customer/close";t.orderCustomerRefundClose=H;var q="/tiny-shop/v1/common/file/images";t.uploadImage=q;var K="/tiny-shop/v1/member/notify/index";t.notifyIndex=K;var N="/tiny-shop/v1/member/notify/view";t.notifyView=N;var W="/tiny-shop/v1/member/notify/read";t.notifyRead=W;var X="/tiny-shop/v1/member/notify/read-all";t.notifyReadAll=X;var Y="/tiny-shop/v1/member/notify/clear";t.notifyClear=Y;var Z="/tiny-shop/v1/member/notify/clear-all";t.notifyClearAll=Z;var ee="/tiny-shop/v1/member/notify/un-read-count";t.notifyUnRreadCount=ee;var te="/tiny-shop/v1/member/notify-subscription-config/index";t.notifySubscriptionConfigIndex=te;var ie="/tiny-shop/v1/member/notify-subscription-config/up-config";t.notifySubscriptionConfigUpConfig=ie;var re="/tiny-shop/v1/member/order-product-virtual/index";t.orderProductVirtualIndex=re;var ae="/tiny-shop/v1/member/order-product-virtual/view";t.orderProductVirtualView=ae;var oe="/tiny-shop/v1/order/product-virtual-verification/verify";t.productVirtualVerificationVerify=oe;var ne="/tiny-shop/v1/member/member-level/index";t.memberLevelIndex=ne},a23c:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return r}));var r={rfImage:i("78d7").default},a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"feedback-detail"},[i("v-uni-view",{staticClass:"feedback-title"},[i("v-uni-text",[e._v("问题和意见")])],1),i("v-uni-view",{staticClass:"feedback-body"},[i("v-uni-textarea",{staticClass:"feedback-textare",attrs:{disabled:!0,value:e.feedbackDetail.content}})],1),e.feedbackDetail.covers&&e.feedbackDetail.covers.length>0?i("v-uni-view",{staticClass:"feedback-title"},[i("v-uni-text",[e._v("图片")])],1):e._e(),i("v-uni-view",{staticClass:"uni-uploader-body"},[i("v-uni-view",{staticClass:"uni-uploader__files"},[e._l(e.feedbackDetail.covers,(function(e,t){return[i("v-uni-view",{key:t+"_0",staticClass:"uni-uploader__file"},[i("rf-image",{staticClass:"uni-uploader__img",attrs:{src:e}})],1)]}))],2)],1),i("v-uni-view",{staticClass:"feedback-title"},[i("v-uni-text",[e._v("反馈类型")])],1),i("v-uni-view",{staticClass:"feedback-body"},[i("v-uni-radio-group",e._l(e.feedbackType,(function(t,r){return i("v-uni-label",{key:r,staticClass:"gender-item"},[i("v-uni-radio",{staticClass:"gender-item-radio",attrs:{color:e.themeColor.color,value:t.value,checked:t.value==e.feedbackDetail.type}}),i("v-uni-text",{staticClass:"gender-item-text"},[e._v(e._s(t.name))])],1)})),1)],1),i("v-uni-view",{staticClass:"feedback-title"},[i("v-uni-text",[e._v("QQ/邮箱/手机号")])],1),i("v-uni-view",{staticClass:"feedback-body"},[i("v-uni-input",{staticClass:"feedback-input",attrs:{disabled:!0,value:e.feedbackDetail.contact_way||"暂未留下联系方式"}})],1),i("v-uni-view",{staticClass:"feedback-title"},[i("v-uni-text",[e._v("回复内容")])],1),i("v-uni-view",{staticClass:"feedback-body"},[i("v-uni-textarea",{staticClass:"feedback-textare",attrs:{disabled:!0,value:e.feedbackDetail.reply||"管理员未回复"}})],1)],1)},o=[]},b837:function(e,t,i){"use strict";i.r(t);var r=i("a23c"),a=i("61bf");for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);i("2a99");var n,d=i("f0c5"),s=Object(d["a"])(a["default"],r["b"],r["c"],!1,null,"9ecf4f54",null,!1,r["a"],n);t["default"]=s.exports},da2f:function(e,t,i){var r=i("38ee");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=i("4f06").default;a("56d67116",r,!0,{sourceMap:!1,shadowMode:!1})}}]);