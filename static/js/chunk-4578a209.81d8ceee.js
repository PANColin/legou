(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4578a209"],{1655:function(t,e,n){},"2e1a":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"goods-show"},[n("van-dropdown-menu",[n("van-dropdown-item",{attrs:{options:t.option1},on:{change:t.changeDevelop},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}}),n("van-dropdown-item",{attrs:{options:t.option2},on:{change:t.changeDevelop},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}})],1),n("van-grid",{attrs:{border:!1,"column-num":2,gutter:4}},t._l(t.currentGoods.length?t.currentGoods:t.goodsList,(function(e){return n("van-grid-item",{key:e.id,attrs:{to:"/gooddetail?id="+e.id}},[n("van-image",{attrs:{src:e.list_pic_url}}),n("div",{staticClass:"text"},[n("p",[t._v(t._s(e.name))]),n("p",{staticClass:"price"},[t._v("￥"+t._s(e.retail_price))])])],1)})),1)],1)])},a=[],i={name:"Goodsshow",components:{},props:{goodsList:{type:Array,required:!0},currentGoods:{type:Array,required:!1}},data:function(){return{value1:0,value2:"",current:"",option1:[{text:"全部商品",value:0},{text:"新款商品",value:1},{text:"活动商品",value:2}],option2:[{text:"默认排序",value:""},{text:"价格降序",value:"desc"},{text:"价格升序",value:"asc"}]}},mounted:function(){},methods:{changeDevelop:function(t){this.current=t,this.$emit("changeDef",t)}},created:function(){}},r=i,s=(n("d25c"),n("2877")),u=Object(s["a"])(r,o,a,!1,null,"74df3a54",null);e["a"]=u.exports},"423a":function(t,e,n){},"53af":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var o=n("0c6d");function a(t){return Object(o["a"])({url:"/goods/goodsList",data:t})}},b0c0:function(t,e,n){var o=n("83ab"),a=n("9bf2").f,i=Function.prototype,r=i.toString,s=/^\s*function ([^ (]*)/,u="name";o&&!(u in i)&&a(i,u,{configurable:!0,get:function(){try{return r.call(this).match(s)[1]}catch(t){return""}}})},b5cb:function(t,e,n){"use strict";n("423a")},d25c:function(t,e,n){"use strict";n("1655")},fa2e:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("van-nav-bar",{attrs:{title:"乐购","left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft}}),n("goods-show",{ref:"menu",attrs:{goodsList:t.list,currentGoods:t.list},on:{changeDef:t.getMsgFormSon}})],1)},a=[],i=(n("b0c0"),n("53af")),r=n("2e1a"),s={data:function(){return{msgFormSon:"",list:[],currentStatus:"",current:"default"}},computed:{},components:{GoodsShow:r["a"]},created:function(){this.init()},mounted:function(){},updated:function(){},methods:{getMsgFormSon:function(t){this.msgFormSon=t,this.init()},onClickLeft:function(){this.$router.push("/home")},init:function(){var t=this;Object(i["a"])({isHot:"hot"==this.$route.query.name?1:"",isNew:"new"==this.$route.query.name?1:"",order:this.msgFormSon}).then((function(e){t.list=e.data.data}))}}},u=s,c=(n("b5cb"),n("2877")),l=Object(c["a"])(u,o,a,!1,null,"43aa344d",null);e["default"]=l.exports}}]);