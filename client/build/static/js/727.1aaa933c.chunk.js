"use strict";(self.webpackChunkCLient_app=self.webpackChunkCLient_app||[]).push([[727],{7778:function(e,t,a){a.r(t),a.d(t,{pageSetupConfiguration:function(){return n}});var n=function(e,t){return{method:"post",url:"https://avangardio-1.ru/page/pageSetup",withCredentials:!0,data:{uId:e,pageData:t}}}},5727:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var n=a(885),i=a(2791),r=a(9434),u=a(4569),s=a.n(u),l=a(9085),c=a(6501),o=a(184),h=c.P.instance.socket,d=a(7778).pageSetupConfiguration,g=a(5774).getPageConfiguration;function p(e){var t,a=e.userId,u=(0,r.v9)((function(e){return e.userState.uId})),c=(0,i.useState)(!1),p=(0,n.Z)(c,2),f=p[0],m=p[1],x=(0,i.useState)(),j=(0,n.Z)(x,2),v=j[0],S=j[1],b=(0,i.useState)(!1),C=(0,n.Z)(b,2),P=(C[0],C[1]),N=(0,i.useState)(""),Z=(0,n.Z)(N,2),y=Z[0],A=Z[1],O=(0,i.useState)({width:0,height:0}),w=(0,n.Z)(O,2),k=(w[0],w[1]),D=(0,i.useState)(),I=(0,n.Z)(D,2),L=I[0],_=(I[1],(0,i.useState)()),F=(0,n.Z)(_,2),M=F[0],U=(F[1],(0,i.useState)("")),q=(0,n.Z)(U,2),E=q[0],H=q[1],T=(0,i.useState)(""),R=(0,n.Z)(T,2),W=R[0],z=R[1],B=(0,i.useState)(""),G=(0,n.Z)(B,2),J=G[0],K=G[1],Q=(0,i.useState)(""),V=(0,n.Z)(Q,2),X=V[0],Y=V[1],$=(0,i.useState)(""),ee=(0,n.Z)($,2),te=ee[0],ae=ee[1],ne=(0,i.useState)(""),ie=(0,n.Z)(ne,2),re=ie[0],ue=ie[1],se=(0,i.useState)({unit:"%",x:25,y:25,width:50,height:50}),le=(0,n.Z)(se,2);le[0],le[1];return(0,i.useEffect)((function(){if(u||a)return s()(g(u||a)).then((function(e){m(!0),S(!0);var t=e.data.page;H(t?t.firstName:""),z(t?t.lastName:""),P(!1),A(t?t.profilePhoto:""),K(t?t.city:""),Y(t?t.aboutMe:""),ae(t?t.birthDay:"")})).catch((function(e){m(!0),404===e.response.status&&S(!1)})),h.on("UPLOAD_PHOTO_ANSWER",(function(e){var t=new Image;t.src=e,t.onload=function(){P(!0),k({height:t.height,width:t.width}),A(e)}})),function(){h.off("UPLOAD_PHOTO_ANSWER")}}),[u]),f&&(t=(0,o.jsxs)("div",{className:"PageSetup",children:[v?(0,o.jsx)("h1",{children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b"}):(0,o.jsx)("h1",{children:"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b"}),(0,o.jsx)("div",{className:"PageSetupForm",children:(0,o.jsxs)("form",{onSubmit:function(e){return function(e){e.preventDefault(),s()(d(u||a,{firstName:E,lastName:W,profilePhoto:y,uploadedAvatar:L,uploadedMiniAvatar:M,city:J,aboutMe:X,birthDay:te})).then((function(e){ue("Page Update Success!"===e.data.message?"\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0430 \u0443\u0441\u043f\u0435\u0448\u043d\u043e":e.data.message)})).catch((function(e){e&&console.log(e)}))}(e)},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{htmlFor:"firstName",children:(0,o.jsx)("b",{children:"\u0418\u043c\u044f:"})}),(0,o.jsx)("input",{name:"firstName",required:!0,value:E,onChange:function(e){return H(e.target.value)},placeholder:"\u0412\u0430\u0448\u0435 \u0438\u043c\u044f."})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{htmlFor:"lastName",children:(0,o.jsx)("b",{children:"\u0424\u0430\u043c\u0438\u043b\u0438\u044f"})}),(0,o.jsx)("input",{name:"lastName",required:!0,value:W,onChange:function(e){return z(e.target.value)},placeholder:"\u0412\u0430\u0448\u0430 \u0444\u0430\u043c\u0438\u043b\u0438\u044f."})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{htmlFor:"age",children:(0,o.jsx)("b",{children:"\u0414\u0430\u0442\u0430 \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f:"})}),(0,o.jsx)("input",{name:"age",value:te,onChange:function(e){return ae(e.target.value)},type:"date"})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{htmlFor:"city",children:(0,o.jsx)("b",{children:"\u0413\u043e\u0440\u043e\u0434:"})}),(0,o.jsx)("input",{name:"city",value:J,onChange:function(e){return K(e.target.value)},placeholder:"\u0412\u0430\u0448 \u0433\u043e\u0440\u043e\u0434."})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{htmlFor:"aboutMe",children:(0,o.jsx)("b",{children:"\u041e \u0441\u0435\u0431\u0435:"})}),(0,o.jsx)("textarea",{name:"aboutMe",value:X,onChange:function(e){return Y(e.target.value)},placeholder:"\u0420\u0430\u0441\u0441\u043a\u0430\u0436\u0438\u0442\u0435 \u043e \u0441\u0435\u0431\u0435."})]}),(0,o.jsxs)("div",{className:"PageSetupAvatar",children:[(0,o.jsx)("input",{type:"button",onClick:function(){return document.querySelector("#ChatImageLoad").click()}}),y?(0,o.jsx)("img",{className:"UserPageImage",src:y}):null,(0,o.jsx)("input",{type:"file",onChange:function(e){var t=e.target.files[0];t.size>6291456?l.Am.error("\u0424\u0430\u0439\u043b \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u0439!"):h.emit("UPLOAD_PHOTO",t,t.name)},accept:"image/png, image/jpeg",id:"ChatImageLoad"})]}),(0,o.jsx)("button",{type:"submit",children:(0,o.jsx)("b",{children:"\u0412\u043d\u0435\u0441\u0442\u0438 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f"})})]})}),(0,o.jsx)("p",{children:re})]})),(0,o.jsx)("div",{children:t})}}}]);
//# sourceMappingURL=727.1aaa933c.chunk.js.map