import{d as f,r as _,a as y,b as m,o as h,c as k,w as c,g as n,e as i,u as r,_ as v,f as g,t as x,F as C,h as b}from"./index-DGFEgVXd.js";const D=f({__name:"demo",setup(w){let e=_([{label:"姓名",code:"name",type:"input",show:!0},{label:"年龄",code:"age",type:"input",show:!1},{label:"性别",code:"sex",type:"select",show:!0,options:[],changeFunName:"onChange"},{label:"地址",code:"address",type:"input",show:!0},{label:"工种",code:"work",type:"select",show:!0,options:[]},{type:"",slot:"btn",show:!0,"label-width":"0"}]),u=_({inline:!0}),l=y(),t={getOptions(){setTimeout(()=>{e.find(o=>o.code=="sex").options=[{label:"男",value:"1"},{label:"女",value:"2"}]},100)},onChange(o){l.value.setFieldsValue({work:""});let d=e.find(a=>a.code=="work");o==1?d.options=[{label:"前端",value:"1"},{label:"后端",value:"2"}]:d.options=[{label:"运营",value:"3"},{label:"设计",value:"4"}],e.find(a=>a.code=="address").show=o!=1}},s={onChange:t.onChange};return t.getOptions(),(o,d)=>{const a=m("el-button"),p=m("yh-form");return h(),k(p,{formData:r(e),config:r(u),functions:r(s),ref_key:"formRef",ref:l},{btn:c(()=>[n(a,{type:"primary"},{default:c(()=>[i("查询")]),_:1})]),_:1},8,["formData","config","functions"])}}}),F=v(D,[["__scopeId","data-v-652b7c53"]]),N=f({__name:"demo2",setup(w){let e=_([{label:"姓名",code:"name",type:"input",show:!0,required:!0},{label:"年龄",code:"age",type:"input",show:!0,required:!0},{label:"性别",code:"sex",type:"select",show:!0,required:!0,options:[{label:"男",value:"1"},{label:"女",value:"2"}]},{label:"地址",code:"address",type:"input",show:!0},{label:"工种",code:"work",type:"select",show:!0,options:[{label:"前端",value:"1"},{label:"后端",value:"2"},{label:"运营",value:"3"},{label:"设计",value:"4"}]},{label:"插槽",type:"",slot:"slotName",show:!0}]),u=y(),l={onChange(s){e.find(o=>o.code=="address").show=s!=1},onSave(){u.value.checkForm().then(s=>{console.log(s)})}},t={onChange:l.onChange};return(s,o)=>{const d=m("yh-form"),a=m("el-button");return h(),g(C,null,[n(d,{formData:r(e),functions:r(t),ref_key:"formRef",ref:u},{slotName:c(p=>[i(x(p.data),1)]),_:1},8,["formData","functions"]),n(a,{type:"primary",onClick:r(l).onSave},{default:c(()=>[i("提交")]),_:1},8,["onClick"])],64)}}}),R=v(N,[["__scopeId","data-v-9ab06de5"]]),B={class:"markdown-body"},V=b("h1",null,"表单",-1),q=b("h2",null,"基础用法",-1),E=b("h2",null,"查询条件 inline = true",-1),I={},O="",T=f({__name:"README",setup(w,{expose:e}){return e({frontmatter:{},excerpt:void 0}),(u,l)=>{const t=m("preview");return h(),g("div",B,[V,q,n(t,{"comp-name":"Form","demo-name":"demo2"},{default:c(()=>[n(R)]),_:1}),E,n(t,{"comp-name":"Form","demo-name":"demo"},{default:c(()=>[n(F)]),_:1})])}}});export{T as default,O as excerpt,I as frontmatter};
