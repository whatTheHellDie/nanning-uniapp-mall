<template>
	<view class="w-picker">
		<view class="mask" :class="{'show':showPicker}" @tap="maskTap" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="w-picker-cnt" :class="{'show':showPicker}">
			<view class="w-picker-hd" @touchmove.stop.prevent catchtouchmove="true">
			  <view class="w-picker-btn" @tap="pickerCancel">取消</view>
			  <view class="w-picker-btn" :style="{'color':themeColor1}" @tap="pickerConfirm">确定</view>
			</view>
			<view class="w-picker-view" v-if="mode=='region'">
				<picker-view :indicator-style="itemHeight" :value="pickVal" @change="bindChange">
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.provinces" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="w-picker-item" v-for="(item,index) in data.citys" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column v-if="!hideArea">
						<view class="w-picker-item" v-for="(item,index) in data.areas" :key="index">{{item.label}}</view>
					</picker-view-column>
				</picker-view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import provinces from './city-data/province.js';
	import citys from './city-data/city.js';
	import areas from './city-data/area.js';
	export default {
		data() {
			return {
				result:[],
				data:{},
				checkArr:[],
				checkValue:[],
				pickVal:[],
				showPicker:false,
				resultStr:"",
				itemHeight:`height: ${uni.upx2px(88)}px;`
			};
		},
		computed:{
			
		},
		props:{
			mode:{
				type:String,

				default(){
					return "date"
				}
			},
			themeColor1:{
				type:String,
				default(){
					return "#f5a200"
				}
			},
			
			defaultVal:{
				type:Array,
				default(){
					return [0,0,0,0,0,0,0]
				}
			},
			areaCode:{
				type:Array,
				default(){
					return null
				}
			},
			hideArea:{//隐藏省市区三级联动   地区列
				type:Boolean,
				default:false
			},
			step:{
				type:[String,Number],
				default:1
			},
			current:{
				type:Boolean,
				default:false
			},
			selectList:{
				type:Array,
				default(){
					return [];
				}
			},
					},
		watch:{
			mode(){
				this.initData();
			},
			selectList(){
				this.initData();
			},
			linkList(){
				this.initData();
			}
		},
		methods:{
			getRegionVal(value,useCode){
				let province=value[0];
				let city=value[1];
				let a=0,b=0,c=0,dval=[];
				let _this=this;
				provinces.map((v,k)=>{
					if(useCode?v.value==province:v.label==province){
						a=k;
					}
				})
				citys[a].map((v,k)=>{
					if(useCode?v.value==city:v.label==city){
						b=k;
					}
				})
				if(!_this.hideArea){
					let area=value[2];
					areas[a][b].map((v,k)=>{
						if(useCode?v.value==area:v.label==area){
							c=k;
						}
					})
					dval=[a,b,c];
				}else{
					dval=[a,b];
				}
				return dval;
			},
			maskTap(){
				this.showPicker = false;
			},
			show(){
				this.showPicker = true;
			},
			hide(){
				this.showPicker = false;
			},
			pickerCancel(){
				this.$emit("cancel",{
					checkArr:this.checkArr,
					defaultVal:this.pickVal
				});
				this.showPicker = false;
			},
			pickerConfirm(e){
				switch(this.mode){
					
					case "region":
					
						this.$emit("confirm",{
							checkArr:this.checkArr,
							checkValue:this.checkValue,
							defaultVal:this.pickVal,
							result:this.resultStr
						});
						break;
					default:
						this.$emit("confirm",{
							checkArr:this.checkArr,
							defaultVal:this.pickVal,
							result:this.resultStr
						});
						break;
				}
				this.showPicker = false;
			},
			bindChange(val){
				let _this=this;
				let arr=val.detail.value;
				let province,city,area;
				let checkArr=_this.checkArr;
				let mode=_this.mode;
				switch(mode){
					case "region":
						province=_this.data.provinces[arr[0]]||_this.data.provinces[0];
						city=_this.data.citys[arr[1]]||_this.data.citys[0];
						if(!_this.hideArea){
							area=_this.data.areas[arr[2]]||_this.data.areas[0];
						}
						if(province.label!=checkArr[0]){
							_this.data.citys = citys[arr[0]]||citys[0];
							if(!_this.hideArea){
								_this.data.areas = areas[arr[0]][0]||areas[0][0];
							}
							arr[1] = 0;
							arr[2] = 0;
							city=_this.data.citys[arr[1]]||_this.data.citys[0];
							if(!_this.hideArea){
								area=_this.data.areas[arr[2]]||_this.data.areas[0];
							}
						};
						if(city.label!=checkArr[1]&&!_this.hideArea){
							_this.data.areas = areas[arr[0]][arr[1]]||areas[0][0];
							arr[2]=0;
							area=_this.data.areas[arr[2]]||_this.data.areas[0];
						};
						if(!_this.hideArea){
							_this.checkArr=[province.label,city.label,area.label];
							_this.checkValue=[
								_this.data.provinces[arr[0]]?_this.data.provinces[arr[0]].value:_this.data.provinces[0].value,
								_this.data.citys[arr[1]]?_this.data.citys[arr[1]].value:_this.data.citys[0].value,
								_this.data.areas[arr[2]]?_this.data.areas[arr[2]].value:_this.data.areas[0].value
							];
							_this.resultStr=province.label+city.label+area.label;
						}else{
							_this.checkArr=[province.label,city.label];
							_this.checkValue=[
								_this.data.provinces[arr[0]]?_this.data.provinces[arr[0]].value:_this.data.provinces[0].value,
								_this.data.citys[arr[1]]?_this.data.citys[arr[1]].value:_this.data.citys[0].value
							];
							_this.resultStr=province.label+city.label;
						};
						break;
					case "selector":
						_this.checkArr=_this.data[arr[0]]||_this.data[_this.data.length-1];
						_this.resultStr=_this.data[arr[0]]?_this.data[arr[0]].label:_this.data[_this.data.length-1].label;
						break;	
				}
				_this.$nextTick(()=>{
					_this.pickVal=arr;
				})
			},
			initData(){
				let _this=this;
				let data={};
				let mode=_this.mode;
				let province,city,area;
				let dVal=[];
				switch(mode){
					case "region":
						if(_this.areaCode){
							dVal=_this.getRegionVal(_this.areaCode,true);
						}else{
							dVal=_this.getRegionVal(_this.defaultVal);
						}
						if(_this.hideArea){
							data={
								provinces:provinces,
								citys:citys[dVal[0]]
							};
						}else{
							data={
								provinces:provinces,
								citys:citys[dVal[0]],
								areas:areas[dVal[0]][dVal[1]]
							};
						};
						break;
					case "selector":
						data=_this.selectList;
						dVal=_this.defaultVal;
						break;
					default:
						dVal=(data.defaultVal&&_this.current)?data.defaultVal:_this.defaultVal
						break;
				}
				_this.data=data;
				switch(mode){
					
					case "region":
						province=data.provinces[dVal[0]];
						city=data.citys[dVal[1]];
						if(!_this.hideArea){
							area=data.areas[dVal[2]];
							_this.checkArr=[province.label,city.label,area.label];
							_this.checkValue=[province.value,city.value,area.value];
							_this.resultStr=province.label+city.label+area.label;
						}else{
							_this.checkArr=[province.label,city.label];
							_this.checkValue=[province.value,city.value];
							_this.resultStr=province.label+city.label;
						}
						break;
					case "selector":
						_this.checkArr=data[dVal[0]]||data[data.length-1];
						_this.resultStr=data[dVal[0]].label||data[data.length-1].label;
						break;
				}
				_this.$nextTick(()=>{
					_this.pickVal=dVal;
				})
			}
		},
		mounted() {
			this.initData();
		}
	}
</script>

<style lang="scss">
	.w-picker{
		position: relative;
		z-index: 888;
		.mask {
		  position: fixed;
		  z-index: 1000;
		  top: 0;
		  right: 0;
		  left: 0;
		  bottom: 0;
		  background: rgba(0, 0, 0, 0.6);
		  visibility: hidden;
		  opacity: 0;
		  transition: all 0.3s ease;
		}
		.mask.show{
			visibility: visible;
			opacity: 1;
		}
		.w-picker-cnt {
		  position: fixed;
		  bottom: 0;
		  left: 0;
		  width: 100%;
		  transition: all 0.3s ease;
		  transform: translateY(100%);
		  z-index: 3000;
		}
		.w-picker-cnt.show {
		  transform: translateY(0);
		}
		.w-picker-hd {
		  display: flex;
		  align-items: center;
		  padding: 0 30upx;
		  height: 88upx;
		  background-color: #fff;
		  position: relative;
		  text-align: center;
		  font-size: 32upx;
		  justify-content: space-between;
		  .w-picker-btn{
		  	font-size: 30upx;
		  }
		}
		
		.w-picker-hd:after {
		  content: ' ';
		  position: absolute;
		  left: 0;
		  bottom: 0;
		  right: 0;
		  height: 1px;
		  border-bottom: 1px solid #e5e5e5;
		  color: #e5e5e5;
		  transform-origin: 0 100%;
		  transform: scaleY(0.5);
		}
		.w-picker-item {
		  text-align: center;
		  width: 100%;
		  height: 88upx;
		  line-height: 88upx;
		  text-overflow: ellipsis;
		  white-space: nowrap;
		  font-size: 30upx;
		}
		.w-picker-view {
		  width: 100%;
		  height: 476upx;
		  overflow: hidden;
		  background-color: rgba(255, 255, 255, 1);
		  z-index: 666;
		}
		picker-view{
			height: 100%;
		}
	}

</style>
