<template>
	<view class="rf-product-detail">
		<!--顶部返回按钮-->
		<!--#ifdef MP-WEIXIN-->
		<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
		<!--#endif-->
		<!--header-->


		<view class="detail">
			<!--顶部商品轮播图-->
			<view class="carousel">
				<swiper indicator-dots circular="true" duration="400" controls touchable v-if="product.product">
					<!--#ifdef APP-PLUS-->
					<!-- <swiper-item class="swiper-item" v-if="product.video_url">
						<video muted :poster="product.covers[0]" object-fit="contain" :src="product.video_url"></video>
					</swiper-item> -->
					<!--#endif-->

					<swiper-item class="swiper-item" v-for="(item, index) in albumPics" :key="index">
						<view class="image-wrapper">
							<image :src="item" class="loaded" mode="aspectFill"></image>
						</view>
						<uni-tag class="content" circle size="small" :text="`${index + 1}  / ${albumPics.length}`"></uni-tag>
					</swiper-item>
				</swiper>
			</view>
			<!--商品信息-->
			<view class="introduce-section">
				<view class="introduce-first-line">
					<view class="price-box point-box" v-if="product.point_exchange_type == 4">
						该商品仅需
						<text class="price">{{ product.point_exchange }} 积分</text>
					</view>
					<view class="price-box" v-else>
						<view class="price-first-line">
							<!-- <image
								class="member-level"
								mode="aspectFit"
								v-if="product.memberDiscount != [] && product.memberDiscount && product.memberDiscount.discount > 0 && userInfo"
								:src="vipPrice">
							</image> -->
							<text class="price" :class="'text-' + themeColor.name">{{ moneySymbol }}{{ productData.price }}</text>
						</view>
						<view class="m-price-wrapper">
							价格 <text class="m-price">{{ moneySymbol }}{{ productData.originalPrice }}</text>
						</view>
					</view>
					<view class="collect" @tap="toFavorite">
						<view class="iconfont" :class="[ favorite ? `text-${themeColor.name} iconshixin1` : 'iconguanzhu']"></view>
						<text>收藏</text>
					</view>
				</view>
				<view class="introduce-second-line">
					<view class="title">
						<text>{{ productData.name }}</text>
						<text class="sketch">{{ product.sketch }}</text>
					</view>
					<view class="share">
						<rf-tag type="gray" size="small" tui-tag-class="tui-tag-share tui-size" shape="circleLeft">
							<button class="share-btn" open-type="share" :class="'text-' + themeColor.name" @tap.stop="share()">
								<text class="iconfont iconfenxiang"></text>
								<text class="tui-share-text tui-gray">分享</text>
							</button>
						</rf-tag>
					</view>
				</view>
				<!-- <view class="product-tag">
					<uni-tag
						@tap="openPoster"
						class="tag"
						circle
						type="base"
						text="生成海报"
						size="small"
					/>
				</view> -->
				<view class="data">
					<text class="item">快递: {{ '包邮'  }}</text>
					<text class="item">月销 {{ productData.sale }}</text>
					<text v-if="product.address_name" class="item in1line">{{ product.address_name }}</text>
				</view>
			</view>
			<!--商品参数-->
			<view class="c-list">
				<!--商品库存-->
				<rf-item-popup title="商品库存" v-if="parseInt(product.is_stock_visible, 10) == 1" :isEmpty="parseInt(currentStock, 10) === 0"
				 empty="库存不足">
					<view slot="content">
						{{ currentStock || product.stock || 0 }} {{ product.unit || '件' }}
					</view>
				</rf-item-popup>
				<!--满减送-->
				<rf-item-popup v-if="product.fullGiveRule" title="满减送" @hide="hideService" @show="
						showPopupService(
							'fullGiveClass',
							product.fullGiveRule
						)
					"
				 :specClass="fullGiveClass">
					<view slot="content" class="con-list">
						<text :class="'text-' + themeColor.name">{{ product.fullGiveRule[0] }}</text>
					</view>
					<view slot="right" v-if="product.fullGiveRule"><text class="iconfont iconyou"></text></view>
					<view slot="popup" class="service">
						<view class="content">
							<view class="row" v-for="(item, index) in product.fullGiveRule" :key="index">
								<text>{{ item }}</text>
							</view>
						</view>
						<button class="btn" :class="'bg-' + themeColor.name" @tap="hideService">完成</button>
					</view>
				</rf-item-popup>
				<!--满包邮-->
				<rf-item-popup v-if="product.fullMail && product.fullMail.is_open === '1' && product.shipping_type !== '1'" title="满包邮">
					<view slot="content" :class="'text-' + themeColor.name">满{{ product.fullMail.full_mail_money }}元包邮</view>
				</rf-item-popup>
				<!--购买类型-->
				<rf-item-popup title="购买类型" @hide="hideService" :specClass="specClass" @show="toggleSpec">
					<view slot="content">
						<text class="selected-text" v-if="currentSkuName === singleSkuText">{{ currentCartCount }} {{ product.unit || '件' }}</text>
						<text class="selected-text" v-else-if="currentSkuName">{{ currentSkuName }} * {{ currentCartCount }}</text>
						<text class="selected-text" v-else>请选择规格</text>
					</view>
					<view slot="right"><text class="iconfont iconyou"></text></view>
					<view slot="popup" @click.stop="stopPrevent">
						<rf-attr-content :type="type" :product="product" :minNum="minNum" :maxNum="maxNum" @toggle="toggleSpec"></rf-attr-content>
					</view>
				</rf-item-popup>
				<!--优惠券-->
				<rf-item-popup title="优惠券" @hide="hideService" :specClass="couponClass" @show="showPopupService('couponClass', canReceiveCoupon)">
					<view slot="content">
						<text class="con t-r">领取优惠券</text>
					</view>
					<view slot="right" v-if="canReceiveCoupon > 0"><text class="iconfont iconyou"></text></view>
					<view slot="popup" class="service">
						<!-- 优惠券列表 -->
						<view class="sub-list valid">
							<view class="row" v-for="(item, index) in canReceiveCoupon" :key="index" @tap.stop="getCoupon(item)">
								<view class="carrier">
									<view class="title">
										<view>
											<text class="cell-icon" :class="'bg-' + themeColor.name">{{
												item.type !==0 ? '限' : '全'
											}}</text>
											<text class="cell-title">{{ item.name }}</text>
										</view>
										<view :class="'text-' + themeColor.name">
											<text class="price">{{ moneySymbol }}{{ item.amount }}</text>
											<!-- <text class="price-discount" v-else>{{ `${item.discount / 10}折` }}</text> -->
										</view>
									</view>
									<view class="term">
										<text>{{ item.startTime  }} ~ {{ item.endTime  }}</text>
										<text class="at_least">满{{ item.minPoint }}可用</text>
									</view>
									<view class="usage">
										<text>
											{{
												item.type !==0
													? '部分产品使用'
													: '全场产品使用'
											}}
										</text>
										<view>
											{{
												parseInt(item.max_fetch, 10) === 0
													? '不限'
													: `每人限领${item.perLimit}`
											}}
											已领{{ item.useType }}
											<text class="last" v-if="item.count">剩余{{ item.count }}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</rf-item-popup>
				<!--限购说明-->
				<rf-item-popup title="限购说明" v-if="type === 'buy_now' && parseInt(productData.max_buy, 10) > 0">
					<view slot="content">
						<text>{{ `${productData.max_buy} ${productData.unit || '件'}` }}</text>
					</view>
				</rf-item-popup>
				<!--积分活动-->
				<rf-item-popup title="积分活动" v-if="productData.point_exchange_type !== '1'">
					<view slot="content" class="con-list">
						<text v-if="productData.point_exchange_type">兑换类型: {{ productData.point_exchange_type | pointExchangeTypeFilter }}</text>
						<text v-if="parseInt(productData.give_point, 10) > 0">赠送类型: {{ productData.integral_give_type | integralGiveTypeFilter }}</text>
						<text v-if="parseInt(productData.give_point, 10) > 0">下单可获得: {{ productData | givePointFilter }}积分</text>
						<text v-if="productData.point_exchange != 0">兑换所需积分: {{ productData.point_exchange }}
						</text>
						<text v-if="productData.max_use_point != 0">可使用抵扣积分: {{ productData.max_use_point }}</text>
						<text class="buy-now" @tap="addCart('buy', true)" v-if="productData.point_exchange_type == 3">积分兑换 >>
						</text>
					</view>
				</rf-item-popup>
				<!--服务-->
				<rf-item-popup v-if="productData.tags" title="服务" @hide="hideService" @show="showPopupService('serviceClass', productData.tags)"
				 :specClass="serviceClass">
					<view slot="content">
						<text>{{ productData.tags[0] }}</text>
					</view>
					<view slot="right" v-if="productData.tags"><text class="iconfont iconyou"></text></view>
					<view slot="popup" class="service">
						<view class="content">
							<view class="row" v-for="(item, index) in productData.tags" :key="index">
								<view class="description">{{ item }}</view>
							</view>
						</view>
						<button class="btn" :class="'bg-' + themeColor.name" @tap="hideService">完成</button>
					</view>
				</rf-item-popup>
				<!--阶梯优惠-->
				<rf-item-popup title="阶梯优惠" @hide="hideService" @show="
						showPopupService(
							'ladderPreferentialClass',
							productData.ladderPreferential
						)
					"
				 :specClass="ladderPreferentialClass" v-if="productData.ladderPreferential">
					<view slot="content" class="con-list">
						<text>
							满{{
								productData.ladderPreferential &&
									productData.ladderPreferential[0] &&
									productData.ladderPreferential[0].quantity
							}}{{ productData.unit || '件' }}
							<text v-if="
									parseInt(
										productData.ladderPreferential &&
											productData.ladderPreferential[0] &&
											productData.ladderPreferential[0].type,
										10
									) === 1
								">
								每{{ productData.unit || '件' }}减{{
									productData.ladderPreferential &&
										productData.ladderPreferential[0] &&
										productData.ladderPreferential[0].price
								}}元</text>
							<text v-if="
									parseInt(
										productData.ladderPreferential &&
											productData.ladderPreferential[0] &&
											productData.ladderPreferential[0].type,
										10
									) === 2
								">
								每{{ productData.unit || '件' }}{{
									parseInt(
										productData.ladderPreferential &&
											productData.ladderPreferential[0] &&
											productData.ladderPreferential[0].price,
										10
									)
								}}折</text>
						</text>
					</view>
					<view slot="right" v-if="productData.ladderPreferential"><text class="iconfont iconyou"></text></view>
					<view slot="popup" class="service">
						<view class="content">
							<view class="row" v-for="(item, index) in productData.ladderPreferential" :key="index">
								<view class="title">满{{ item.quantity }}{{ productData.unit || '件' }}
									<text v-if="parseInt(item.type, 10) === 1">每{{ productData.unit || '件' }}减{{ item.price }}元</text>
									<text v-if="parseInt(item.type, 10) === 2">每{{ productData.unit || '件' }}{{ parseInt(item.price, 10) }}折</text>
								</view>
							</view>
						</view>
						<button class="btn" :class="'bg-' + themeColor.name" @tap="hideService">完成</button>
					</view>
				</rf-item-popup>
				<!--商品参数-->

				<!-- <rf-item-popup
					title="商品参数"
					@hide="hideService"
					@show="
						showPopupService(
							'attributeValueClass',
							product.productAttributeList
						)
					"
					:specClass="attributeValueClass"
					v-if="product.productAttributeList"
				>
					<view slot="content">
						<text>
							{{
								`${product.productAttributeList &&
									product.productAttributeList[0] &&
									product.productAttributeList[0]
										.name}: ${product.productAttributeList &&
									product.productAttributeList[0] &&
									product.productAttributeList[0].value}`
							}}</text
						>
					</view>
					<view slot="right" v-if="product.productAttributeList"
						><text class="iconfont iconyou"></text
					></view>
					<view slot="popup" class="service">
						<view class="content">
							<view
								class="row"
								v-for="(item, index) in product.productAttributeList"
								:key="index"
							>
								<view class="title">
									{{ `${item.name}:${item.inputList} ${(product.productAttributeValueList[index]&&product.productAttributeValueList[index].value)||''}` }}
								</view>
							</view>
						</view>
						<button class="btn" :class="'bg-' + themeColor.name" @tap="hideService">完成</button>
					</view>
				</rf-item-popup> -->
			</view>
			<!-- 评价 -->
			<view class="eva-section" v-if="false" @tap="toEvaluateList">
				<view class="e-header">
					<text class="tit">评价({{ productData.comment_num || 0 }})</text>
					<text class="tip" v-if="productData.match_ratio">好评率 {{ productData.match_ratio }}%</text>
					<text class="tip" v-else>暂无评价信息</text>
					<i class="iconfont iconyou"></i>
				</view>
				<view class="eva-box" v-if="productData.evaluate && productData.evaluate">
					<image class="portrait" :src="
							(productData.evaluate &&
								productData.evaluate[0] &&
								productData.evaluate[0].member_head_portrait) ||
								headImg
						"
					 mode="aspectFill"></image>
					<view class="right">
						<view class="name">
							<text>
								{{
									(productData.evaluate &&
										productData.evaluate[0] &&
										productData.evaluate[0].member_nickname) ||
										'匿名用户'
								}}
							</text>
							<rf-rate v-if="evaluateList" size="16" disabled="true" :value="evaluateList[0].scores" :active-color="themeColor.color" />
						</view>
						<text class="con in2line">{{
							(productData.evaluate &&
								productData.evaluate[0] &&
								productData.evaluate[0].content) ||
								'这个人很懒，什么都没留下~'
						}}</text>
						<view class="bot">
							<text class="attr">购买类型：{{
									(productData.evaluate &&
										productData.evaluate[0] &&
										productData.evaluate[0].sku_name) ||
										singleSkuText
								}}</text>
							<text class="time">{{
								productData.evaluate &&
									productData.evaluate[0] &&
									productData.evaluate[0].created_at | time
							}}</text>
						</view>
					</view>
				</view>
			</view>
			<!--底部商品详情-->
			<view class="detail-desc">
				<view class="d-header">
					<text>商品详情</text>
				</view>
				<rf-parser :html="productData.detailHtml" lazy-load></rf-parser>
			</view>
			<!-- 底部操作菜单 -->
			<view class="page-bottom">
				<view class="page-bottom-bth-wrapper">
					<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
						<i class="iconfont iconzhuyedefuben"></i>
						<text>首页</text>
					</navigator>
					<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn cart">
						<i class="iconfont icongouwuche2"></i>
						<text>购物车</text>
						<rf-badge v-if="hasLogin && cartNum && cartNum > 0" type="error" size="small" class="badge" :text="cartNum"></rf-badge>
					</navigator>
					<!-- <view @tap="kefuShow = true" class="p-b-btn">
						<i class="iconfont iconkefu2"></i>
						<text>客服</text>
					</view> -->
				</view>
				<view class="action-btn-group" v-if="parseInt(this.currentStock || this.productData.stock, 10) > 0">
					<button class="action-btn" :class="'bg-' + themeColor.name" :disabled="buyBtnDisabled" @tap="addCart('buy')">
						立即购买
					</button>
					<button :disabled="addCartBtnDisabled" class="action-btn" :class="'bg-' + themeColor.name" @tap="addCart('cart')">
						加入购物车
					</button>
				</view>
				<view class="action-btn">
					<button v-if="parseInt(this.currentStock || this.productData.stock, 10) === 0" class="action-btn-submit" :disabled="buyBtnDisabled">
						库存不足
					</button>
				</view>
			</view>
		</view>
		<!-- 分享引导 -->
		<view class="popup spec show" v-if="shareClass === 'show'" @touchmove.stop.prevent="stopPrevent" @tap="hideShareSpec">
			<!-- 遮罩层 -->
			<view class="mask" @tap="hideShareSpec"></view>
			<view class="share-bg">
				<image :src="shareBg"></image>
			</view>
		</view>
		<view class="hideCanvasView" v-if="canvasShow">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
		<!--回到顶部-->
		<!--#ifdef MP-->
		<rf-nav></rf-nav>
		<!--#endif-->
		<view class="popup spec show" v-if="kefuShow" @touchmove.stop.prevent="stopPrevent" @tap="hide">
			<!-- 遮罩层 -->
			<view class="mask" @tap="hide"></view>
			<view class="kefu-bg">
				<image :src="appServiceQr"></image>
			</view>
		</view>
	</view>
</template>
<script>
	/**
	 *@des 封装商品详情
	 *@author stav stavyan@qq.com
	 *@blog https://stavtop.club
	 *@date 2020/05/15 16:22:24
	 */
	import rfItemPopup from '@/components/rf-item-popup';
	import moment from '@/common/moment';
	import rfAttrContent from '@/components/rf-attr-content';
	import rfRate from '@/components/rf-rate/rf-rate';
	import rfBadge from '@/components/rf-badge/rf-badge';
	import uniTag from '@/components/uni-tag/uni-tag';
	import rfNav from '@/components/rf-nav';
	import {
		cartItemCount,
		cartItemCreate
	} from '@/api/product';
	import {
		collectCreate,
		collectDel,
		pickupPointIndex,
		transmitCreate
	} from '@/api/basic';
	import {
		couponReceive,
		addressList
	} from '@/api/userInfo';
	import {
		mapMutations
	} from 'vuex';
	export default {
		name: 'rfProductDetail',
		watch: {
			product(val) {
				console.log(val, 111)
				//.product.albumPics.split(",")
				if (val.product) {
					this.getCanReceiveCoupon(val.product.id)
					this.albumPics = val.product.albumPics.split(",")
					this.productData = val.product
					this.productDataDetail = this.productData.product

				}
			}
		},
		props: {
			product: {
				type: Object,
				default () {
					return {};
				}
			},
			userInfo: {
				type: Object,
				default () {
					return {};
				}
			},
			url: {
				type: String,
				default: ''
			},
			marketType: {
				type: String,
				default: 'buy_now'
			}
		},
		components: {
			rfNav,
			rfItemPopup,
			rfBadge,
			rfRate,
			uniTag,
			rfAttrContent
		},
		data() {
			return {
				productDataDetail: {},
				productData: {},
				albumPics: [],
				appServiceQr: this.$mSettingConfig.appServiceQr,
				kefuShow: false,
				addressClass: 'none',
				canvasShow: true,
				logo: this.$mSettingConfig.appLogo,
				vipPrice: this.$mAssetsPath.vipPrice,
				posterShow: false,
				serviceClass: 'none', // 服务弹窗
				ladderPreferentialClass: 'none', // 阶梯优惠弹窗
				attributeValueClass: 'none', // 商品参数弹窗
				specClass: 'none', // 商品参数弹窗
				couponClass: 'none', // 优惠券弹窗
				shareClass: 'none', // 分享引导弹窗
				fullGiveClass: 'none', // 满减送弹窗
				cartType: null, // 下单类型
				couponList: [], // 优惠券列表
				currentStock: null,
				currentSkuPrice: null,
				currentSkuName: null,
				currentCartCount: 1,
				evaluateList: [],
				hasLogin: this.$mStore.getters.hasLogin,
				cartNum: uni.getStorageSync('cartNum'),
				addressTypeList: this.$mConstDataConfig.addressTypeList,
				tabCurrentIndex: 0,
				loading: true,
				errorInfo: '',
				headImg: this.$mAssetsPath.headImg,
				isPointExchange: false,
				shareBg: this.$mAssetsPath.shareBg,
				appServiceType: this.$mSettingConfig.appServiceType,
				productPosterQrType: this.$mSettingConfig.productPosterQrType,
				appName: this.$mSettingConfig.appName,
				shareFrom: '',
				poster: {},
				promoCode: '',
				addressList: [],
				moneySymbol: this.moneySymbol,
				state: 1,
				singleSkuText: this.singleSkuText,
				thirdPartyQrCodeImg: '',
				canReceiveCoupon: []
			};
		},


		async onShareAppMessage() {
			// #ifdef MP
			await this.$http.post(`${transmitCreate}`, {
				topic_type: 'product',
				topic_id: this.productId
			}).then(() => {
				return {
					title: this.productDetail.name,
					path: `/pages/product/product?id=${this.productId}`
				};
			});
			// #endif
		},
		filters: {
			time(val) {
				return moment(val * 1000).format('YYYY-MM-DD HH:mm');
			},
			pointExchangeTypeFilter(val) {
				const type = [
					'',
					'非积分兑换',
					'积分加现金',
					'积分兑换或直接购买',
					'只支持积分兑换'
				];
				return type[parseInt(val, 10)];
			},
			integralGiveTypeFilter(val) {
				const type = ['固定积分', '百分比'];
				return type[parseInt(val, 10)];
			},
			givePointFilter(val) {
				return val.integral_give_type === '1' ?
					Math.round((parseInt(val.give_point, 10) / 100) * parseInt(val.minSkuPrice, 10)) :
					parseInt(val.give_point, 10);
			}
		},
		computed: {
			type() {
				return 'buy_now';
			},
			// 购买按钮禁用
			buyBtnDisabled() {
				return parseInt(this.currentStock || this.product.stock, 10) === 0;
			},
			// 添加购物车按钮禁用
			addCartBtnDisabled() {
				return (
					this.product.point_exchange_type === '2' ||
					this.product.point_exchange_type === '4' ||
					parseInt(this.currentStock || this.product.stock, 10) === 0 ||
					this.product.is_virtual === '1'
				);
			},
			// 最小购买数量
			minNum() {
				return 1;
			},
			// 最小购买数量
			maxNum() {
				let maxNum = 0;
				return maxNum;
			},
			favorite() {
				return !!this.product.myCollect;
			},
			// 计算倒计时时间
			second() {
				return function(val) {
					return Math.floor(val - new Date() / 1000);
				};
			},
			currentProductPrice() {
				let price;
				if (this.type === 'buy_now') {
					if (this.product.memberDiscount && this.product.memberDiscount) {
						// eslint-disable-next-line
						this.product.minSkuPrice = this.product.minSkuPrice * (1 - this.product.memberDiscount.discount / 100).toFixed(2);
						// eslint-disable-next-line
						this.product.maxSkuPrice = this.product.maxSkuPrice ? (this.product.maxSkuPrice * (1 - this.product.memberDiscount
							.discount / 100)).toFixed(2) : 0;
					}
					// eslint-disable-next-line
					price = this.currentSkuPrice || ((this.product.maxSkuPrice && (this.product.minSkuPrice !== this.product.maxSkuPrice)) ?
						(this.product.minSkuPrice + ' ~ ' + this.product.maxSkuPrice) : parseFloat(this.product.minSkuPrice).toFixed(2));
					return price;
				}
				return parseFloat(price || '0').toFixed(2);
			}
		},
		methods: {
			...mapMutations(['setCartNum']),
			// 获取优惠券列表
			async getCanReceiveCoupon(id) {
				await this.$http
					.get(`/member/coupon/listByProduct/${id}`, {})
					.then(r => {
						r.data.forEach(item => {
							item.startTime = this.formatDateTime(new Date(item.startTime))
							item.endTime = this.formatDateTime(new Date(item.endTime))
						})
						this.canReceiveCoupon = r.data
					});
			},
			formatDateTime(date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0' + minute) : minute;
				var second = date.getSeconds();
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
			},
			// 返回上一页
			navBack() {
				this.$mRouter.back();
			},
			hide() {
				this.kefuShow = false;
			},
			// 分享商品
			share() {
				// #ifdef H5
				if (this.$mPayment.isWechat()) {
					this.shareClass = 'show';
				} else {
					this.$mHelper.h5Copy(this.url);
				}
				// #endif
				// #ifdef APP-PLUS
				this.$mHelper.handleAppShare(this.url, this.appName, this.product.name, this.product.pic);
				// #endif
			},
			// 通用跳转
			navTo(route) {
				if (this.appServiceType === '1' && route === '/pages/product/service/index') {
					this.kefuShow = true;
					return;
				}
				if (!this.hasLogin) {
					this.$mHelper.backToLogin();
				} else {
					if (this.appServiceType === '0') {
						this.$mHelper.toast('暂不提供客服功能');
					} else {
						this.$mRouter.push({
							route
						});
					}
				}
			},
			// 弹窗显示
			showPopupService(type, list) {
				// if (list.length === 0) return;
				this[type] = 'show';
			},
			// 关闭服务弹窗
			hideService() {
				this.specClass = 'none';
				this.couponClass = 'none';
				this.serviceClass = 'none';
				this.ladderPreferentialClass = 'none';
				this.attributeValueClass = 'none';
				this.fullGiveClass = 'none';
			},
			// 获取优惠券
			async getCoupon(item) {
				if (!this.hasLogin) {
					await this.$mHelper.backToLogin();
					return;
				}
				await this.$http
					.post(`${couponReceive}${item.id}`)
					.then(() => {
						this.$mHelper.toast('领取成功');
					});
			},
			// 跳转至评价列表
			toEvaluateList() {
				if (!this.product.evaluateStat || parseInt(this.product.comment_num, 10) === 0) return;
				this.$mRouter.push({
					route: `/pages/order/evaluation/list?comment_num=${
						this.product.comment_num
					}&evaluateStat=${JSON.stringify(this.product.evaluateStat)}`
				});
			},
			// 顶部tab点击
			tabClick(index, state) {
				this.page = 1;
				// this.addressList.length = 0;
				this.tabCurrentIndex = index;
				this.state = state;
				const api = (this.state === 1 ? addressList : pickupPointIndex);
				this.getAddressList(api);
			}, // 获取收货地址列表
			async getAddressList(api) {
				await this.$http
					.get(api, {})
					.then(r => {
						this.addressList = r.data;
					});
			},
			// 规格弹窗开关
			toggleSpec(row) {
				if (!this.productData.id) return;
				if (this.specClass === 'show') {
					this.currentStock = row.stock;
					this.currentSkuPrice = row.price;
					const skuId = row.skuId;
					if (parseInt(this.currentStock, 10) === 0) {
						this.$mHelper.toast('库存不足');
						return;
					}
					if (this.cartType === 'cart'||row.type==='cart') {
						this.handleCartItemCreate(skuId,row);
					} else if (this.cartType === 'buy') {
						this.buy(skuId);
					}
					this.cartType = null;
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			// 海报弹窗开关
			async openPoster() {
				this.$mHelper.toast('该版本不支持生成海报');
			},
			hideSpec() {
				this.specClass = 'hide';
				setTimeout(() => {
					this.specClass = 'none';
				}, 250);
			},
			hideShareSpec() {
				this.shareClass = 'hide';
				setTimeout(() => {
					this.shareClass = 'none';
				}, 250);
			},
			// 添加商品至购物车
			async handleCartItemCreate(skuId,row) {
				const params={
					"createDate": new Date().toISOString(),
					// "deleteStatus": 0,
					"id": row.product.id,
					"price": row.price,
					"productAttr": row.spData,
					"productBrand": row.brand.name,
					"productCategoryId":  row.product.productCategoryId,
					"productId": row.product.id,
					"productName": row.product.name,
					"productPic": row.pic||row.product.pic,
					"productSkuCode": row.skuCode,
					// "productSkuId": 0,
					"productSn": row.product.productSn,
					"productSubTitle": row.product.subTitle,
					"quantity": row.cartCount
				}
				console.log(row)
				await this.$http
					.post(`${cartItemCreate}`, params,{type:'data'})
					.then(() => {
						this.$mHelper.toast('添加购物车成功');
						// this.$http.get(`${cartItemCount}`).then(r => {
						// 	this.setCartNum(r.data);
						// 	this.cartNum = r.data;
						// });
					});
			},
			// 收藏
			async toFavorite() {
				if (!this.productData.id) return;
				console.log(this.hasLogin)
				if (!this.hasLogin) {
					this.specClass = 'none';
					await this.$mHelper.backToLogin();
				} else {
					this.favorite ? this.handleCollectDel() : this.handleCollectCreate();
				}
			},
			// 收藏商品
			async handleCollectCreate() {
				await this.$http
					.post(`${collectCreate}`, {
						// "createTime": new Date(),
						// "id": "string",
						// "memberIcon": "string",
						// "memberId": 0,
						// "memberNickname": "string",
						"productId": this.productData.id,
						// "productName": "string",
						// "productPic": "string",
						// "productPrice": "string",
						// "productSubTitle": "string"
					})
					.then(() => {
						this.$mHelper.toast('收藏成功');
						this.$emit('product');
					});
			},
			// 取消收藏商品
			async handleCollectDel() {
				await this.$http
					.delete(`${collectDel}?id=${this.product.myCollect.id}`)
					.then(() => {
						this.$mHelper.toast('取消收藏成功');
						this.$emit('product');
					});
			},
			async buy(skuId) {
				const params = {};
				params.data = JSON.stringify({
					sku_id: skuId,
					num: this.currentCartCount
				});
				if (
					this.product.point_exchange_type === '2' ||
					this.product.point_exchange_type === '4' ||
					(this.product.point_exchange_type === '3' &&
						this.isPointExchange)
				) {
					params.type = 'point_exchange';
				} else {
					params.type = this.type;
				}
				this.$mRouter.push({
					route: `/pages/order/create/order?data=${JSON.stringify(params)}&promo_code=${this.promoCode}`
				});
			},
			async preSell(skuId) {
				let params = {};
				params.type = 'presell_buy';
				params.data = JSON.stringify({
					num: this.currentCartCount,
					sku_id: skuId
				});
				this.$mRouter.push({
					route: `/pages/order/create/order?data=${JSON.stringify(params)}&promo_code=${this.promoCode}`
				});
			},
			addCart(type, isPointExchange) {
				if (!this.productData.id) return;
				if (!this.hasLogin) {
					this.$mHelper.backToLogin();
					return;
				}
				this.specClass = 'show';
				this.cartType = type;
				this.isPointExchange = isPointExchange;
			},
			stopPrevent() {}
		}
	};
</script>
<style lang="scss">
	.rf-product-detail {
		.back-btn {
			position: fixed;
			left: 40upx;
			z-index: 9999;
			padding-top: var(--status-bar-height);
			top: 40upx;
			font-size: 40upx;
			color: $font-color-dark;
		}

		.carousel {
			height: 722upx;
			position: relative;

			swiper {
				height: 100%;
			}

			.image-wrapper {
				width: 100%;
				height: 100%;
			}

			.swiper-item {
				display: flex;
				justify-content: center;
				align-content: center;
				height: 750upx;
				overflow: hidden;
				border-bottom: 1upx solid rgba(0, 0, 0, 0.01);

				image {
					width: 100%;
					height: 100%;
				}

				.content {
					position: absolute;
					right: $spacing-base;
					bottom: $spacing-base;
				}
			}
		}

		.detail {
			padding-bottom: 60upx;
		}

		.service {
			padding: $spacing-base $spacing-lg 0;

			.row {
				font-size: $font-lg;
				margin-bottom: $spacing-sm;
			}
		}

		.selected-text {
			margin-right: 4upx;
		}

		.sub-list {
			margin: 40upx 0 80upx;

			.row {
				width: 100%;
				margin-bottom: $spacing-lg;
			}
		}

		.share-bg {
			image {
				position: fixed;
				z-index: 100;
				width: 70vw;
				height: 45vw;
				right: $spacing-base;
				top: $spacing-base;
			}
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.rf-list {
				max-height: 60vh;
				padding-bottom: 0;
				margin-bottom: $spacing-sm;
			}
		}

		// 拼团公告
		.rf-swiper-slide {
			margin-top: 20upx;

			.label {
				margin-left: 10upx;
			}
		}

		// 玩法介绍
		.play-way {
			background-color: $color-white;
			padding: 0 20upx;
			margin: 20upx 0;
			font-size: $font-base;

			.title {
				border-bottom: 1px solid #eee;
				padding: $spacing-base 0;
				display: flex;
				justify-content: space-between;

				.iconfont {
					margin-left: 0.13rem;
					font-size: 0.28rem;
					color: #717171;
				}
			}

			.way {
				font-size: $font-base - 2upx;
				padding: 20upx 0;
				display: flex;

				.item {
					flex: 1;
					text-align: center;

					.tip {
						font-size: 0.22rem;
						color: #a5a5a5;
					}
				}

				.arrow {
					width: 40upx;

					.iconfont {
						color: $font-color-light;
						font-weight: 100;
					}
				}
			}
		}

		.assemble {
			background-color: #fff;

			.assemble-item {
				height: 120upx;
				border-bottom: 1px solid #f0f0f0;

				.pictxt {
					display: flex;
					justify-content: space-between;

					.pic {
						display: flex;

						image {
							width: 80upx;
							height: 80upx;
							margin: 20upx 0;
							border-radius: 50%;
						}

						.text {
							line-height: 120upx;
							margin-left: 20upx;
						}
					}

					.right {
						display: flex;
						align-items: center;

						.time-wrapper {
							text-align: right;
							margin-right: 20upx;

							.lack {
								font-size: $font-sm;

								.font-color-red {
									margin: 0 4upx;
								}
							}

							.time {
								font-size: $font-sm;
								color: $font-color-light;
							}
						}

						.spellBnt {
							font-size: $font-sm;
							width: 120upx;
							height: 48upx;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 48upx;
						}
					}
				}
			}
		}

		.c-list {
			font-size: $font-sm + 2upx;
			color: $font-color-base;
			background: #fff;

			.c-row {
				display: flex;
				align-items: center;
				padding: 20upx 30upx;
				position: relative;
			}

			.tit {
				width: 140upx;
			}

			.con {
				flex: 1;
				color: $font-color-dark;

				.selected-text {
					margin-right: 10upx;
				}
			}

			.bz-list {
				height: 40upx;
				font-size: $font-sm + 2upx;
				color: $font-color-dark;

				text {
					display: inline-block;
					margin-right: 30upx;
				}
			}

			.con-list {
				flex: 1;
				display: flex;
				flex-direction: column;
				color: $font-color-dark;
				line-height: 40upx;

				.buy-now {
					color: $uni-color-primary;
				}
			}

			.red {
				color: $uni-color-primary;
			}
		}

		.kefu-bg {
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 98;

			image {
				width: 60vw;
				height: 60vw;
				border-radius: 12upx;
				z-index: 98;
			}
		}
	}
</style>
