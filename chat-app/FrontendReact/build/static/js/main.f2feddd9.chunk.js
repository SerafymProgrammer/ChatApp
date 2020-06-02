(this["webpackJsonpchat-app"]=this["webpackJsonpchat-app"]||[]).push([[0],{190:function(e,t,a){e.exports=a(371)},195:function(e,t,a){},283:function(e,t){},371:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),o=a.n(c),i=(a(195),a(13)),s=a(42),l=a(165),u=a(17),m={users:[],isConnected:!1,socket:null,messages:[],roomName:"default"};var d={isLoggedIn:!1,allUsers:[],isConnected:!1,isFetching:!1};var f=Object(s.c)({chatReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USERS":return Object(u.a)(Object(u.a)({},e),{},{users:t.users});case"IS_CONNECTED":return Object(u.a)(Object(u.a)({},e),{},{isConnected:t.isConnected});case"SET_SOCKET":return Object(u.a)(Object(u.a)({},e),{},{socket:t.socket});case"FOCUS_ROOM":return Object(u.a)(Object(u.a)({},e),{},{roomName:t.roomName});case"ALL_MESSAGES":return Object(u.a)(Object(u.a)({},e),{},{messages:t.messages});default:return e}},authReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"IS_LOGGED_IN":return Object(u.a)(Object(u.a)({},e),{},{isLoggedIn:t.isLoggedIn});case"IS_FETCHING":return Object(u.a)(Object(u.a)({},e),{},{isFetching:t.isFetching});default:return e}}}),b=Object(s.d)(f,Object(s.a)(l.a)),h=a(39),g=a(415),p=a(172),O=a.n(p),E=a(90),v=a(378),j=a(18),k=a(404),x=a(38),y=function(e){var t=Object(n.useState)(e),a=Object(x.a)(t,2),r=a[0],c=a[1];return{value:r,setValue:c,reset:function(){return c("")},bind:{value:r,onChange:function(e){c(e.target.value)}}}},C=function(e){var t=e.isFetching,a=e.handleSubmit,c=y(""),o=c.value,i=c.bind,s=(c.reset,y("")),l=s.value,u=s.bind;s.reset;Object(n.useEffect)((function(){return j.ValidatorForm.addValidationRule("moreThanThreeChar",(function(e){return e.length>3})),j.ValidatorForm.addValidationRule("notAllowedSpecialSymbols",(function(e){return!/[^A-z\u0410-\u044f\u0401\u04510-9]/.test(e)})),function(){j.ValidatorForm.removeValidationRule("moreThanThreeChar"),j.ValidatorForm.removeValidationRule("moreThanThreeChar")}}),[j.ValidatorForm]);var m=Object(n.useCallback)((function(e){e.preventDefault(),a({username:o,password:l})}),[o,l,a]);return r.a.createElement(j.ValidatorForm,{onSubmit:m},r.a.createElement(j.TextValidator,Object.assign({fullWidth:!0,label:"Username",name:"username"},i,{validators:["required","moreThanThreeChar","notAllowedSpecialSymbols"],errorMessages:["this field is required","3 characters minimum","Not allowed special symbols"],margin:"normal"})),r.a.createElement(j.TextValidator,Object.assign({fullWidth:!0,label:"Password",type:"password"},u,{name:"password",validators:["required"],errorMessages:["this field is required"],margin:"normal"})),r.a.createElement(v.a,{variant:"contained",fullWidth:!0,color:"primary",type:"submit",disabled:t,margin:"normal"},t&&r.a.createElement(k.a,{size:20})," Sign In"))},N=a(56),S=a.n(N),w=a(87),M=a(34),R=a(170),T=a.n(R),I=function e(){Object(M.a)(this,e)};I.loginUser=function(e){return T.a.post("".concat("http://localhost:3000","/auth/login"),e)};var F=a(57),V=a.n(F),L=function(e){return{type:"IS_FETCHING",isFetching:e}},W=function(e){return{type:"IS_LOGGED_IN",isLoggedIn:e}};var A=a(24),D=a(377),_=a(171),H=a.n(_)()((function(e){return{main:Object(A.a)({width:"auto",display:"block",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(400+3*e.spacing.unit*2),{width:400,marginLeft:"auto",marginRight:"auto"}),paper:{marginTop:8*e.spacing.unit,display:"flex",flexDirection:"column",alignItems:"center",padding:"".concat(2*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px")},avatar:{margin:e.spacing.unit},text:{textAlign:"center"}}}))((function(e){var t=e.classes,a=e.children;return r.a.createElement("div",null,r.a.createElement("main",{className:t.main},r.a.createElement(D.a,{className:t.paper},a)))})),U=function(e){var t=Object(i.c)(),a=Object(n.useCallback)((function(e){return t(function(e){return function(){var t=Object(w.a)(S.a.mark((function t(a){return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a(L(!0));case 2:return t.next=4,I.loginUser(e).then((function(e){var t=e.data,n=t.token,r=t.isAdmin,c=t.nickNameColor,o=t.nickName;V.a.set("token",n),V.a.set("userData",{isAdmin:r,nickName:o,nickNameColor:c}),a(L(!1)),a(W(!0))})).catch((function(e){alert(e.response.data),a(L(!1))}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(e))}),[t]),c=Object(i.d)((function(e){return e.authReducer.isFetching})),o=Object(i.d)((function(e){return e.authReducer.isLoggedIn}));Object(n.useEffect)((function(){o&&e.history.push("/chat")}),[o]);return r.a.createElement(H,null,r.a.createElement(g.a,null,r.a.createElement(O.a,null)),r.a.createElement(E.a,{component:"h1",variant:"h5"},"Sign in"),r.a.createElement(C,{handleSubmit:function(e){return function(e){var t=e.username,n=e.password;a({nickName:t,password:n}).catch((function(e){alert(e.message)}))}(e)},isFetching:c}))},G=a(180),B=a(406),P=a(173),q=a.n(P),z=a(405),J=Object(z.a)((function(e){return{inputMsg:Object(A.a)({width:"50%"},e.breakpoints.down("xs"),{width:"100%"}),formMsg:{display:"flex"}}})),K=function(e){var t=J(),a=y(""),c=a.value,o=a.bind,i=a.reset;Object(n.useEffect)((function(){return j.ValidatorForm.addValidationRule("maxSymbols",(function(e){return e.length<200})),function(){j.ValidatorForm.removeValidationRule("maxSymbols")}}),[j.ValidatorForm]);var s=Object(n.useCallback)((function(){var t=c;i(),e.handleSubmit(t)}));return r.a.createElement(j.ValidatorForm,{onSubmit:s,className:t.form},r.a.createElement(j.TextValidator,Object.assign({fullWidth:!0,label:"Message"},o,{name:"message",validators:["required","maxSymbols"],errorMessages:["this field is required","maximum 200 symbols"],margin:"normal",className:t.inputMsg})),r.a.createElement(B.a,{"aria-label":"send",type:"submit"},r.a.createElement(q.a,null)))},Y=a(408),$=a(407),Q=Object(z.a)((function(e){return{root:{display:"flex",marginTop:5,justifyContent:"flex-start"},myMsg:{display:"flex",marginTop:5,justifyContent:"flex-end"},rootPaper:{padding:e.spacing(1),maxWidth:200,borderRadius:20,backgroundColor:"#eaeaea"},myMsgPaper:{padding:e.spacing(1),maxWidth:200,borderRadius:20,backgroundColor:"#c1e2ce"},msgText:{margin:"auto",display:"block",maxHeight:"100%"}}}));function X(e){var t=e.timeMessage,a=e.authorMessage,n=e.textMessage,c=e.username,o=e.colorNickName,i=Q(c===a?"flex-end":"flex-start");return r.a.createElement("div",{className:c===a?i.myMsg:i.root},r.a.createElement(D.a,{className:c===a?i.myMsgPaper:i.rootPaper},r.a.createElement($.a,{item:!0,xs:!0,container:!0,direction:"column",className:c===a?i.myMsgPaper:i.rootPaper},r.a.createElement($.a,{item:!0,xs:!0},r.a.createElement(E.a,{variant:"subtitle2",style:{color:o}},a)),r.a.createElement($.a,{item:!0,xs:!0},r.a.createElement(E.a,{variant:"body1",style:{wordWrap:"break-word"}},n)),r.a.createElement($.a,{item:!0,xs:!0},r.a.createElement(E.a,{variant:"body2",color:"textSecondary"},t)))))}var Z=a(174),ee=a.n(Z),te=Object(z.a)((function(e){return{messagesContainer:{background:"inherit",display:"flex",flexDirection:"column",overflowY:"scroll",height:"inherit",maxHeight:"inherit",paddingBottom:10}}})),ae=function(e){var t=e.messages,a=e.username,c=Object(n.useRef)(null),o=te();return Object(n.useEffect)((function(){c.current.scrollTop=c.current.scrollHeight}),[t,c]),r.a.createElement(Y.a,{className:o.messagesContainer,ref:c},t.map((function(e,t){return r.a.createElement(X,{key:"key-msg-".concat(t),timeMessage:ee()(e.timeMessage).calendar(),authorMessage:e.authorMessage,textMessage:e.textMessage,username:a,colorNickName:e.colorAuthorName})})))},ne=a(403),re=a(410),ce=a(411),oe=a(409),ie=a(412),se=Object(z.a)((function(e){return{root:Object(A.a)({width:"100%",maxWidth:360,position:"relative",height:"avalaible",maxHeight:"inherit",borderColor:"#000",borderWidth:2,backgroundColor:"#eabf7d8c",top:0,left:0},e.breakpoints.down("xs"),{position:"absolute",backgroundColor:"#8cd2b5",height:300,overflowY:"scroll"}),ul:{backgroundColor:"#eabf7d8c",padding:0}}})),le=function(e){var t=e.isAdmin,a=e.users,n=e.userName,c=e.setMuteStatus,o=e.setBan,i=e.showUsersContainer,s=e.goToOneToOneRoome,l=se(),u={Online:a.filter((function(e){return e.onlineStatus})),Offline:a.filter((function(e){return!e.onlineStatus}))},m=t?["Online","Offline"]:["Online"];return r.a.createElement(ne.a,{className:l.root,subheader:r.a.createElement("li",null),style:i?{display:"block"}:{display:"none"}},m.map((function(e,a){return r.a.createElement("li",{key:"section-".concat(a),className:l.listSection},r.a.createElement("ul",{className:l.ul},r.a.createElement(oe.a,null,"".concat(e)),u[e].map((function(e){return r.a.createElement(re.a,{key:"".concat(e.nickName)},r.a.createElement(ce.a,{primary:"".concat(e.nickName),style:{color:e.nickNameColor}}),r.a.createElement(v.a,{onClick:function(){return t=e.userId,void s(t);var t}}," 1to1"),t&&e.nickName!==n?r.a.createElement(ie.a,{size:"small","aria-label":"small outlined button group"},r.a.createElement(v.a,{onClick:function(){return t=e.userId,void c(t);var t}}," ",e.isMuted?"unmute":"mute"),r.a.createElement(v.a,{onClick:function(){return t=e.userId,void o(t);var t}},e.isBaned?"unban":"ban")):null)}))))})))},ue=a(51),me=a(175),de=a.n(me),fe=function(){function e(t){if(Object(M.a)(this,e),e.exists)return e.instance;e.instance=this,e.exists=!0,this.socket=de()("".concat("http://localhost:3000","?token=").concat(t),{forceNew:!0})}return Object(ue.a)(e,[{key:"getSocket",value:function(){return this.socket}}],[{key:"changeExists",value:function(){e.exists=!1}}]),e}();function be(e){return{type:"SET_SOCKET",socket:e}}var he=a(413),ge=a(414),pe=a(176),Oe=a.n(pe),Ee=Object(z.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},titleRoom:{flexGrow:1,marginLeft:40,borderWidth:1,borderColor:"#000"}}}));function ve(e){var t=Ee(),a=Object(i.d)((function(e){return e.chatReducer.roomName}),i.b);return r.a.createElement("div",{className:t.root},r.a.createElement(he.a,{position:"static"},r.a.createElement(ge.a,null,r.a.createElement(B.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(Oe.a,{onClick:e.showHideUsersList})),r.a.createElement(E.a,{variant:"h6",className:t.title,style:{color:e.colorNickName}},e.username),"default"!==a?r.a.createElement(E.a,{variant:"h6",className:t.titleRoom,style:{color:e.colorNickName}},a):null,r.a.createElement(v.a,{onClick:e.logout,color:"inherit"},"Logout"))))}var je=a(177),ke=Object(z.a)((function(e){var t;return{chatContainer:(t={background:"#6d81af",display:"flex",flexDirection:"row-reverse",margin:0,padding:0,height:800,position:"relative",maxHeight:1e3},Object(A.a)(t,e.breakpoints.down("xs"),{height:300,maxHeight:600}),Object(A.a)(t,e.breakpoints.down("sm"),{height:600,maxHeight:800}),t)}})),xe=function(e){var t=ke(),a=V.a.get("userData"),c=a.nickNameColor,o=a.isAdmin,s=a.nickName,l=c,u=Object(n.useState)([]),m=Object(x.a)(u,2),d=m[0],f=m[1],b=Object(n.useState)(!1),h=Object(x.a)(b,2),g=h[0],p=h[1],O=Object(n.useState)(""),E=Object(x.a)(O,2),v=E[0],j=E[1],k=Object(n.useState)(!1),y=Object(x.a)(k,2),C=y[0],N=y[1],M=Object(n.useState)(!0),R=Object(x.a)(M,2),T=R[0],I=R[1],F=Object(i.c)(),L=Object(i.d)((function(e){return e.chatReducer.isConnected}),i.b),A=Object(i.d)((function(e){return e.chatReducer.users}),i.b),D=Object(i.d)((function(e){return e.chatReducer.socket}),i.b),_=Object(i.d)((function(e){return e.chatReducer.roomName}),i.b),H=Object(n.useCallback)((function(){return F(function(e){return Object(w.a)(S.a.mark((function t(){var a,n;return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,localStorage.getItem("token");case 2:a=t.sent,(n=new fe(a).getSocket())&&e(be(n));case 5:case"end":return t.stop()}}),t)})))}(F))}),[F]),U=Object(n.useCallback)((function(e){return F(function(e){return{type:"USERS",users:e}}(e))}),[F]),B=Object(n.useCallback)((function(e){return F(function(e){return{type:"IS_CONNECTED",isConnected:e}}(e))}),[F]),P=Object(n.useCallback)((function(e){return F(W(e))}),[F]),q=Object(n.useCallback)((function(){D.disconnect(!0),z()})),z=Object(n.useCallback)((function(){V.a.clearAll(),P(!1),fe.changeExists(),e.history.push("/login")})),J=Object(n.useCallback)((function(e){return D.emit("chat",e)}));return Object(n.useEffect)((function(){return H(),D&&(D.on("users",(function(e){return U(e)})),D.on("previousMessages",(function(e){return f(e)})),D.on("error",(function(t){alert(t),e.history.push("/login")})),D.on("initialMuteStatus",(function(e){return N(e)})),D.on("mute",(function(e){return N(e)})),D.on("chat",(function(e){return f([].concat(Object(G.a)(d),[e]))})),D.on("disconnect",(function(e){z()})),p(o),j(s),B(!0)),function(){return B(!1)}}),[A,D,d]),L&&A.length>0?r.a.createElement(Y.a,{style:{display:"flex",flexDirection:"column"}},r.a.createElement(ve,{username:s,colorNickName:l,showHideUsersList:function(){return I(!T)},logout:function(){return q()}}),"default"===_?r.a.createElement(Y.a,{className:t.chatContainer},r.a.createElement(je.ChatList,{className:"chat-list",dataSource:[{avatar:"https://facebook.github.io/react/img/logo.svg",alt:"Reactjs",title:"Facebook",subtitle:"What are you doing?",date:new Date,unread:0}]}),r.a.createElement(le,{users:A,isAdmin:g,userName:v,setMuteStatus:function(e){return t=e,D.emit("mute",t);var t},setBan:function(e){return t=e,D.emit("ban",t);var t},showUsersContainer:T}),r.a.createElement(ae,{messages:d,username:s})):r.a.createElement(Y.a,{className:t.chatContainer},r.a.createElement(ae,{messages:d,username:s})),C?null:r.a.createElement(K,{handleSubmit:function(e){return J(e)}})):null},ye=a(89),Ce=a(88),Ne=function(e){Object(ye.a)(a,e);var t=Object(Ce.a)(a);function a(e){var n;return Object(M.a)(this,a),(n=t.call(this,e)).state={},n}return Object(ue.a)(a,[{key:"render",value:function(){return r.a.createElement(h.a,{to:"/login"})}}]),a}(n.Component),Se=a(58),we=function(e,t,a){e.meta.auth?(localStorage.getItem("token")&&a.redirect("/chat"),a.redirect("/login")):a()},Me=a(179),Re=function(e){Object(ye.a)(a,e);var t=Object(Ce.a)(a);function a(e){var n;return Object(M.a)(this,a),(n=t.call(this,e)).state={loading:!0},n}return Object(ue.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(Me.a,{color:"#123abc",loading:this.state.loading}))}}]),a}(r.a.Component),Te=function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"404 page not found"),r.a.createElement("p",null,"We are sorry but the page you are looking for does not exist."))},Ie=function(){return r.a.createElement(Se.a,{guards:[we],loading:Re,error:Te},r.a.createElement(h.d,null,r.a.createElement(Se.b,{path:"/login",exact:!0,component:U,meta:{auth:!0}}),r.a.createElement(Se.b,{path:"/",exact:!0,component:Ne,meta:{auth:!0}}),r.a.createElement(Se.b,{path:"/chat",exact:!0,component:xe,meta:{auth:!0}}),r.a.createElement(Se.b,{path:"*",component:Te})))},Fe=a(27),Ve=Object(Fe.a)(),Le=b,We=function(){return r.a.createElement(i.a,{store:Le},r.a.createElement(h.c,{history:Ve},r.a.createElement(Ie,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(We,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[190,1,2]]]);
//# sourceMappingURL=main.f2feddd9.chunk.js.map