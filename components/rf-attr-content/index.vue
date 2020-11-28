<template>
	<view class="attr-content">
		<view class="a-t">
			<image class="image" mode="widthFix" :src="pic || product.pic"></image>
			<view class="right">
				<text class="title in2line">{{ product.name }}</text>
				<view class="sku-info-wrapper">
					<view class="price-wrapper">
						<image mode="aspectFit" class="image" :src="vipPrice"></image>
						<text :class="'text-' + themeColor.name">{{ moneySymbol }}{{ currentProductPrice }}</text>
					</view>
					<text class="stock">库存：{{ stock }}{{ product.unit || '件' }}</text>
					<view class="selected in2line">
						已选：
						<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
							{{ sItem.title }}
						</text>
						<text> * {{ cartCount }} </text>
					</view>
				</view>
			</view>
		</view>
		<scroll-view class="attr-content-scroll-view" scroll-y>
			<view v-for="(item, index) in productAttributeList" :key="index" class="attr-list">
				<text>{{ item.name }}</text>
				<view class="item-list">
					<view class="flex" v-if="item.id===childItem.productAttributeId" v-for="(childItem, childIndex) in productAttributeValueList"
					 :key="childIndex">
						<view v-for="(itemy,itemyIndex) in childItem.specList" :key="index+itemyIndex.toString()" 
						:class="[childItem.availableList[itemyIndex] ? 'bg-' + themeColor.name : 'tit-normal',
						 !childItem.disabled ? 'disabled' : '']"
						 @tap="selectSpec(index,itemyIndex, {key:item.name,value:itemy})"
						  :style="childItem.selected && parseInt(item.show_type) === 2? styleObject: ''"
						 class="tit">
							<text>{{ itemy }}</text>
						</view>
					</view>
					<view class="flex">
						<view v-for="(itemj, itemjIndex) in item.specList" :key="itemjIndex+'k'"
						 :class="[item.selectedList[itemjIndex] ? 'bg-' + themeColor.name : 'tit-normal',
						  !item.availableList[itemjIndex] ? 'disabled' : '']"
						 @tap="selectSpec(index,itemjIndex, {key:item.name,value:itemj})" :style="itemj.selected && parseInt(item.show_type) === 2? styleObject: ''"
						 class="tit">
							<text>{{ itemj }}</text>
						</view>
					</view>

				</view>
			</view>
			<view class="select-count">
				<text>购买数量</text>
				<!--				<rf-number-box-->
				<!--					v-if="parseInt(stock || product.stock, 10) === 0"-->
				<!--					class="step"-->
				<!--					:disabled="true"-->
				<!--					:min="0"-->
				<!--					:max="0"-->
				<!--					@eventChange="numberChange"-->
				<!--				></rf-number-box>-->
				<rf-number-box class="step" :min="parseInt(product.min_buy, 10) || minNum" :max="parseInt(product.max_buy, 10) || (maxNum === 0 ? parseInt(stock || product.stock, 10) : maxNum)"
				 :value="cartCount" @eventChange="numberChange"></rf-number-box>
				<!--					:max="parseInt(stock || product.stock, 10)"-->
			</view>
		</scroll-view>
		<button v-if="!showBuyBtn" class="btn" :class="'bg-' + themeColor.name" @tap="toggleSpec">完成</button>
		<view class="btn-group" v-else>
			<button class="btn" :class="'bg-' + themeColor.name" @tap="toggleSpec(1)">加入购物车</button>
			<button class="btn" :class="'bg-' + themeColor.name" @tap="toggleSpec(2)">立即购买</button>
		</view>
	</view>
</template>
<script>
	/**
	 *@des 商品规范组件
	 *@author stav stavyan@qq.com
	 *@blog https://stavtop.club
	 *@date 2020/05/03 19:17:15
	 */
	import rfNumberBox from '@/components/rf-number-box';
	export default {
		name: 'rfAttrContent',
		components: {
			rfNumberBox
		},
		props: {
			showBuyBtn: {
				type: Boolean,
				default: false
			},
			isSelectedNum: {
				type: Boolean,
				default: true
			},
			type: {
				type: String,
				default: 'buy_now'
			},
			product: {
				type: Object,
				default () {
					return {};
				}
			},
			minNum: {
				type: Number,
				default: 1
			},
			maxNum: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				chosenItemObj:{},
				beChooseArr:[],
				styleObject: null,
				productAttributeList: [],
				productAttributeValueList: [],
				skuStockList: [],
				skuId: this.product && this.product.sku_id,
				price: null,
				stock: null,
				cartCount: parseInt(this.product.min_buy, 10) || this.minNum || 1,
				pic: null,
				specSelected: [],
				vipPrice: this.$mAssetsPath.vipPrice,
				moneySymbol: this.moneySymbol,
				skuName: null
			};
		},
		computed: {
			currentDiscountPrice() {
				const decimal = this.product.marketing.decimal_reservation_number;
				const discount = this.product.marketing.discount;
				const price = this.price;
				switch (parseInt(decimal, 10)) {
					case -1:
						return (price * discount / 100).toFixed(2);
					case 0:
						return (price * discount / 100).toFixed(0);
					case 1:
						return (price * discount / 100).toFixed(1);
					default:
						return (price * discount / 100).toFixed(2);
				}
			},
			currentProductPrice() {
				let price = this.price;
				if (this.type === 'discount') {
					price = this.currentSkuPrice || this.currentDiscountPrice;
				}
				if (this.type === 'group_buy') {
					price = this.currentSkuPrice || this.product.marketing.ladder.price;
				}
				if (this.product.memberDiscount && this.product.memberDiscount.length !== 0) {
					price = price * (1 - this.product.memberDiscount.discount / 100);
				}
				return parseFloat(price || '0').toFixed(2);
			}
		},

		watch: {
			product: {
				handler(value) {
					if (value.product)
						this.initData()
				},
				deep: true,
				immediately: true,
			}
		},
		methods: {
			initData() {
				let product = JSON.stringify(this.product)
				product = JSON.parse(product)
				let originList = product.productAttributeList
				let productAttributeValueList = product.productAttributeValueList
				let skuStockList = product.skuStockList
				let showSpeclist = []
				let showSpecAttrObj = {}
				let spDataList = []
				skuStockList.forEach((item, i) => {
					let spData = JSON.parse(item.spData)
					spDataList.push(item.spData)
					spData.forEach((itemx) => {
						showSpeclist.push(itemx.key)
						if(!showSpecAttrObj[itemx.key]){
							showSpecAttrObj[itemx.key]=[]
						}
						showSpecAttrObj[itemx.key].push(itemx.value)
						showSpecAttrObj[itemx.key]=[...new Set(showSpecAttrObj[itemx.key])]
					})
				})
				showSpeclist = [...new Set(showSpeclist)] //数组去重
				originList = originList.filter((item) => {
					for (const itemx of showSpeclist) {
						if (itemx === item.name) {
							return true
						}
					}
					return ''
				})

				productAttributeValueList.selectedList = []
				originList.forEach((item, i) => {
					item.selectedList = []
					if (item.inputList) {
						
						item.specList = item.inputList.split(',')
						item.specList.forEach((itemx, j) => {
							item.selectedList[j] = ''
							console.log('???',originList)
						})
					}

				})
				productAttributeValueList.forEach((item, i) => {
					item.selectedList = []
					if (item.value) {
						item.specList = item.value.split(',')
						item.specList.forEach((itemx, j) => {
							item.selectedList[j] = false
						})
					}

				})
				productAttributeValueList=productAttributeValueList.filter((item)=>{
					for (let itemx of originList){
						if(item.productAttributeId===itemx.id){
							return true
						}
					}
					return false
				})
				originList.forEach((item, i) => {
					originList.length
					productAttributeValueList.length
					if(productAttributeValueList.length===0){
						productAttributeValueList.push({})
					}
					if(productAttributeValueList[i]){
						if(originList[i].id!==productAttributeValueList[i].productAttributeId){
							productAttributeValueList.splice(i,0,{})
						}
					}else{
						productAttributeValueList.splice(i,0,{})
					}
				
				})
				this.setAvailableList(originList,showSpecAttrObj)
				this.setAvailableList1(productAttributeValueList,showSpecAttrObj)
				
				
				console.log(originList,'productAttributeList')
				
				console.log(productAttributeValueList,'productAttributeValueList')
				this.productAttributeList = originList;
				this.skuStockList = product.skuStockList
				this.productAttributeValueList = productAttributeValueList

				// this.productAttributeList.forEach(item => {
				// 	if(item.value){
				// 		let list=item.value.split(",")
				// 		this.AttributeChildList=  list;
				// 	}

				// 	// if (!this.product.sku_name) {
				// 	// 	item.value[0].selected = true;
				// 	// 	this.specSelected.push(item.value[0]);
				// 	// }
				// });
				// 	if (this.product.sku_name) {
				// 		this.productAttributeValueList.forEach(item => {
				// 			if (this.product.sku_name.indexOf(item.title) !== -1) {
				// 				item.selected = true;
				// 				this.specSelected.push(item);
				// 			}
				// 		});
				// 	}
				// 	let skuStrArr = [];
				// 	this.specSelected.forEach(item => {
				// 		skuStrArr.push(item.base_spec_value_id);
				// 	});
				// 	this.product.sku.forEach(item => {
				// 		if (item.data === skuStrArr.join('-')) {
				// 			this.stock = item.stock;
				//         if (this.type === 'buy_now') {
				//           this.price = item.price;
				//         } else {
				//           this.price = this.product.marketing_type === 'wholesale' ? item.wholesale_price : item.price;
				//         }
				// 			this.skuName = item.name;
				// 			this.skuId = item.id;
				// 		}
				// 	});
				  },
				  setAvailableList(originList,showSpecAttrObj){
					  let showSpecAttrObjInnerIndex=0 //showSpecAttrObj的index
					  for(let key of Object.keys(showSpecAttrObj)){
					  	let specList=originList[showSpecAttrObjInnerIndex].specList
					  	if(!specList){
					  		showSpecAttrObjInnerIndex++
					  		continue;}
					  	originList[showSpecAttrObjInnerIndex].availableList=[]
					  	let availableList=originList[showSpecAttrObjInnerIndex].availableList
					  	originList[showSpecAttrObjInnerIndex].specList.forEach((itemxxx,j)=>{
					  		availableList[j]=false
					  	})
					  	showSpecAttrObj[key].forEach((item1,i)=>{
					  		specList.forEach((item2,index)=>{
					  			if(specList[index]===item1){
					  				availableList[index]=true
					  			}
					  		})
					  	})
					  	showSpecAttrObjInnerIndex++
					  }
				  },
				  setAvailableList1(productAttributeValueList,showSpecAttrObj){
				  					  let showSpecAttrObjInnerIndex=0 //showSpecAttrObj的index
				  					  for(let key of Object.keys(showSpecAttrObj)){
				  					  	let specList=productAttributeValueList[showSpecAttrObjInnerIndex].specList
				  					  	if(!specList){
				  					  		showSpecAttrObjInnerIndex++
				  					  		continue;}
				  					  	productAttributeValueList[showSpecAttrObjInnerIndex].availableList=[]
				  					  	let availableList=productAttributeValueList[showSpecAttrObjInnerIndex].availableList
				  					  	productAttributeValueList[showSpecAttrObjInnerIndex].specList.forEach((itemxxx,j)=>{
				  					  		availableList[j]=false
				  					  	})
				  					  	showSpecAttrObj[key].forEach((item1,i)=>{
				  					  		specList.forEach((item2,index)=>{
				  					  			if(specList[index]===item1){
				  					  				availableList[index]=true
				  					  			}
				  					  		})
				  					  	})
				  					  	showSpecAttrObjInnerIndex++
				  					  }
				  },
				numberChange(data) {
				    this.cartCount = parseInt(data.number, 10);
			},
			// 选择规格
			selectSpec(parentIndex, index, obj, type) {
				let list = this.productAttributeList[parentIndex].selectedList;
				let list1 = this.productAttributeValueList[parentIndex].selectedList;
				if (list.length > 0) {
					list.forEach((item,i) => {
						list[i]=''
					});
					list[index]='selected'
				}
				if (list1.length > 0) {
					list1.forEach((item,i) => {
						list1[i]=''
					});
					list1[index]='selected'
				}
				this.$forceUpdate()
				this.beChooseArr.push(JSON.stringify(obj))
				this.beChooseArr=[...new Set(this.beChooseArr)]
				this.skuStockList.forEach((item,i)=>{
					let str=item.spData
					let index=0;
					this.beChooseArr.forEach((itemx,j)=>{
						if(str.includes(itemx)){
							index++
						}
					})
					console.log(index,this.productAttributeList.length,'length')
					if(index===this.productAttributeList.length){
						this.chosenItemObj=item
					}
					console.log(this.chosenItemObj)
				})
				if (parseInt(type, 10) === 3) {
					this.pic = list[index].data;
				}
				if (parseInt(type, 10) === 2) {
					this.styleObject = {
						color: list[index].data,
						border: `1px solid ${list[index].data}`
					};
				}

				// 存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				// this.specSelected = [];
				// list.forEach(item => {
				// 	if (item.selected === true) {
				// 		this.specSelected.push(item);
				// 	}
				// });
				// let skuStr = [];
				// this.specSelected.forEach(item => {
				// 	skuStr.push(item.base_spec_value_id);
				// });
				// this.product.sku.forEach(item => {
				// 	if (item.data === skuStr.join('-')) {
				// 		this.pic = item.pic;
				// 		this.stock = item.stock;
				// 		this.price = this.product.marketing_type === 'wholesale' ? item.wholesale_price : item.price;
				// 		this.skuId = item.id;
				// 		this.skuName = item.name;
				// 	}
				// 	// else {
				// 	// 	if (item.data.indexOf(skuStr.join('-')) !== -1) {
				// 	// 		console.log('skuStr', skuStr);
				// 	// 		console.log('item.data', item.data);
				// 	// 		this.productAttributeValueList.forEach(item2 => {
				// 	// 			if (item2.base_spec_value_id === '120') {
				// 	// 				item2.disabled = true;
				// 	// 			}
				// 	// 		});
				// 	// 		// console.log(this.productAttributeValueList);
				// 	// 	}
				// 	// }
				// });
			},
			toggleSpec(type) {
				if (!this.skuId) {
					this.$mHelper.toast('请选择规格');
					return;
				}
				if (this.stock < 1) {
					this.$mHelper.toast('库存不足');
					return;
				}
				this.$emit('toggle', {
					stock: this.stock,
					skuId: this.skuId,
					cartCount: this.cartCount,
					skuName: this.skuName || this.singleSkuText,
					price: this.price,
					type: type
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	.sku-info-wrapper {
		width: 100%;
		padding-bottom: $spacing-sm;
	}

	.price-wrapper {
		height: 38upx;
		display: flex;
		align-items: center;
		margin: $spacing-sm 0;

		.image {
			width: 120upx;
			height: 38upx;
		}

		.base-color {
			margin-top: 2upx;
		}
	}

	.btn-group {
		display: flex;
		justify-content: space-between;

		.btn {
			width: 40vw;
		}
	}
</style>
