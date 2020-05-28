(this["webpackJsonpchat-app"]=this["webpackJsonpchat-app"]||[]).push([[0],{159:function(e,t,n){e.exports=n(257)},164:function(e,t,n){},253:function(e,t){},257:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(9),o=n.n(i),s=(n(164),n(51)),c=n(42),u=n(136),l=n(18),m={users:[],isConnected:!1,socket:null,messages:[]};var h={isLoggedIn:!1,allUsers:[],isConnected:!1,isFetching:!1};var d=Object(c.c)({chatReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USERS":return Object(l.a)(Object(l.a)({},e),{},{users:t.users});case"IS_CONNECTED":return Object(l.a)(Object(l.a)({},e),{},{isConnected:t.isConnected});case"SET_SOCKET":return Object(l.a)(Object(l.a)({},e),{},{socket:t.socket});case"ALL_MESSAGES":return Object(l.a)(Object(l.a)({},e),{},{messages:t.messages});default:return e}},authReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"IS_LOGGED_IN":return Object(l.a)(Object(l.a)({},e),{},{isLoggedIn:t.isLoggedIn});case"IS_FETCHING":return Object(l.a)(Object(l.a)({},e),{},{isFetching:t.isFetching});default:return e}}}),g=Object(c.d)(d,Object(c.a)(u.a)),p=n(40),f=n(16),b=n(17),v=n(25),k=n(23),x=n(302),y=n(143),E=n.n(y),O=n(76),j=n(20),w=n(263),S=n(21),C=n(290),N=function(e){Object(v.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).handleChange=function(e){var t=e.target.value,n=e.target.name;a.setState(Object(j.a)({},n,t))},a.handleSubmit=function(){a.props.handleSubmit(a.state)},a.state={username:"",password:""},a}return Object(b.a)(n,[{key:"componentDidMount",value:function(){S.ValidatorForm.addValidationRule("moreThanThreeChar",(function(e){return!(e.length<3)})),S.ValidatorForm.addValidationRule("notAllowedSpecialSymbols",(function(e){return!/[^A-z\u0410-\u044f\u0401\u04510-9]/.test(e)}))}},{key:"componentWillUnmount",value:function(){S.ValidatorForm.removeValidationRule("moreThanThreeChar"),S.ValidatorForm.removeValidationRule("notAllowedSpecialSymbols")}},{key:"reset",value:function(){this.setState((function(e){return{username:"",password:""}}))}},{key:"render",value:function(){var e=this.state,t=e.username,n=e.password,a=this.props.isFetching;return r.a.createElement(S.ValidatorForm,{ref:"form",onSubmit:this.handleSubmit},r.a.createElement(S.TextValidator,{fullWidth:!0,label:"Username",onChange:this.handleChange,name:"username",value:t,validators:["required","moreThanThreeChar","notAllowedSpecialSymbols"],errorMessages:["this field is required","3 characters minimum","Not allowed special symbols"],margin:"normal"}),r.a.createElement(S.TextValidator,{fullWidth:!0,label:"Password",type:"password",onChange:this.handleChange,name:"password",value:n,validators:["required"],errorMessages:["this field is required"],margin:"normal"}),r.a.createElement(w.a,{variant:"contained",fullWidth:!0,color:"primary",type:"submit",disabled:a,margin:"normal"},a&&r.a.createElement(C.a,{size:20})," Sign In"))}}]),n}(a.Component),M=n(28),I=n.n(M),T=n(43),R=n(141),U=n.n(R),F=function e(){Object(f.a)(this,e)};F.loginUser=function(e){return U.a.post("".concat("http://localhost:3000","/auth/login"),e)};var L=n(55),H=n.n(L),W=function(e){return{type:"IS_FETCHING",isFetching:e}};var A=n(262),V=n(142),D=n.n(V)()((function(e){return{main:Object(j.a)({width:"auto",display:"block",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(400+3*e.spacing.unit*2),{width:400,marginLeft:"auto",marginRight:"auto"}),paper:{marginTop:8*e.spacing.unit,display:"flex",flexDirection:"column",alignItems:"center",padding:"".concat(2*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px")},avatar:{margin:e.spacing.unit},text:{textAlign:"center"}}}))((function(e){var t=e.classes,n=e.children;return r.a.createElement("div",null,r.a.createElement("main",{className:t.main},r.a.createElement(A.a,{className:t.paper},n)))})),_=function(e){Object(v.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={},a}return Object(b.a)(n,[{key:"componentDidMount",value:function(){}},{key:"login",value:function(e){var t=e.username,n=e.password;this.props.signIn({nickName:t,password:n}).catch((function(e){alert(e.message)}))}},{key:"componentDidUpdate",value:function(e){e.isLoggedIn!==this.props.isLoggedIn&&this.props.isLoggedIn&&this.props.history.push("/chat")}},{key:"render",value:function(){var e=this,t=this.props.isFetching;return r.a.createElement(D,null,r.a.createElement(x.a,null,r.a.createElement(E.a,null)),r.a.createElement(O.a,{component:"h1",variant:"h5"},"Sign in"),r.a.createElement(N,{handleSubmit:function(t){return e.login(t)},isFetching:t}))}}]),n}(a.Component);var B=Object(s.b)((function(e){return{isFetching:e.authReducer.isFetching,isLoggedIn:e.authReducer.isLoggedIn}}),(function(e){return{signIn:function(t){return e(function(e){return function(){var t=Object(T.a)(I.a.mark((function t(n){return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n(W(!0));case 2:return t.next=4,F.loginUser(e).then((function(e){var t=e.data,a=t.token,r=t.isAdmin,i=t.nickNameColor,o=t.nickName;H.a.set("token",a),H.a.set("userData",{isAdmin:r,nickName:o,nickNameColor:i}),n(W(!0)),n({type:"IS_LOGGED_IN",isLoggedIn:!0})})).catch((function(e){alert(e.response.data),n(W(!1))}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t))}}}))(_),G=n(150),P=n(291),q=n(144),z=n.n(q),J=function(e){Object(v.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).handleChange=function(e){var t=e.target.value,n=e.target.name;a.setState(Object(j.a)({},n,t))},a.handleSubmit=function(){var e=a.state.message;a.reset(),a.props.handleSubmit(e)},a.state={message:"",isMobileWindow:!1},a}return Object(b.a)(n,[{key:"componentDidMount",value:function(){var e=this;window.matchMedia("(max-width: 400px)").addListener((function(t){e.setState({isMobileWindow:t.matches})})),S.ValidatorForm.addValidationRule("maxSymbols",(function(e){return!(e.length>200)}))}},{key:"componentWillUnmount",value:function(){S.ValidatorForm.removeValidationRule("maxSymbols")}},{key:"reset",value:function(){this.setState((function(e){return{message:""}}))}},{key:"render",value:function(){var e=this.state,t=e.message,n=e.isMobileWindow;return r.a.createElement(S.ValidatorForm,{ref:"form",onSubmit:this.handleSubmit,style:{display:"flex"}},r.a.createElement(S.TextValidator,{fullWidth:!0,label:"Message",onChange:this.handleChange,name:"message",value:t,validators:["required","maxSymbols"],errorMessages:["this field is required","maximum 200 symbols"],margin:"normal",style:n?{width:"100%"}:{width:"50%"}}),r.a.createElement(P.a,{"aria-label":"send",type:"submit"},r.a.createElement(z.a,null)))}}]),n}(a.Component),K=n(295),Y=n(294),$=n(292),Q=n(293),X=Object($.a)((function(e){return{root:{display:"flex",marginTop:5,justifyContent:"flex-start"},myMsg:{display:"flex",marginTop:5,justifyContent:"flex-end"},rootPaper:{padding:e.spacing(1),maxWidth:200,borderRadius:20,backgroundColor:"#eaeaea"},myMsgPaper:{padding:e.spacing(1),maxWidth:200,borderRadius:20,backgroundColor:"#c1e2ce"},msgText:{margin:"auto",display:"block",maxHeight:"100%"}}}));function Z(e){var t=e.timeMessage,n=e.authorMessage,a=e.textMessage,i=e.username,o=e.colorNickName,s=X(i===n?"flex-end":"flex-start");return r.a.createElement("div",{className:i===n?s.myMsg:s.root},r.a.createElement(A.a,{className:i===n?s.myMsgPaper:s.rootPaper},r.a.createElement(Q.a,{item:!0,xs:!0,container:!0,direction:"column",className:i===n?s.myMsgPaper:s.rootPaper},r.a.createElement(Q.a,{item:!0,xs:!0},r.a.createElement(O.a,{variant:"subtitle2",style:{color:o}},n)),r.a.createElement(Q.a,{item:!0,xs:!0},r.a.createElement(O.a,{variant:"body1",style:{wordWrap:"break-word"}},a)),r.a.createElement(Q.a,{item:!0,xs:!0},r.a.createElement(O.a,{variant:"body2",color:"textSecondary"},t)))))}var ee=n(145),te=n.n(ee),ne=Object(Y.a)(K.a)({background:"inherit",display:"flex",flexDirection:"column",overflowY:"scroll",height:"inherit",maxHeight:"inherit",paddingBottom:10}),ae=function(e){var t=e.messages,n=e.username,i=Object(a.useRef)(null);return Object(a.useEffect)((function(){i.current.scrollTop=i.current.scrollHeight}),[t,i]),r.a.createElement(ne,{ref:i},t.map((function(e,t){return r.a.createElement(Z,{key:"key-msg-".concat(t),timeMessage:te()(e.timeMessage).calendar(),authorMessage:e.authorMessage,textMessage:e.textMessage,username:n,colorNickName:e.colorAuthorName})})))},re=n(289),ie=n(297),oe=n(298),se=n(296),ce=n(299),ue=Object($.a)((function(e){return{root:Object(j.a)({width:"100%",maxWidth:360,position:"relative",height:"avalaible",maxHeight:"inherit",borderColor:"#000",borderWidth:2,backgroundColor:"#eabf7d8c",top:0,left:0},e.breakpoints.down("xs"),{position:"absolute",backgroundColor:"#8cd2b5",height:300,overflowY:"scroll"}),ul:{backgroundColor:"#eabf7d8c",padding:0}}}));function le(e){var t=e.isAdmin,n=e.users,a=e.userName,i=e.setMuteStatus,o=e.setBan,s=e.showUsersContainer,c=ue(),u={Online:n.filter((function(e){return e.onlineStatus})),Offline:n.filter((function(e){return!e.onlineStatus}))},l=t?["Online","Offline"]:["Online"];return r.a.createElement(re.a,{className:c.root,subheader:r.a.createElement("li",null),style:s?{display:"block"}:{display:"none"}},l.map((function(e,n){return r.a.createElement("li",{key:"section-".concat(n),className:c.listSection},r.a.createElement("ul",{className:c.ul},r.a.createElement(se.a,null,"".concat(e)),u[e].map((function(e){return r.a.createElement(ie.a,{key:"".concat(e.nickName)},r.a.createElement(oe.a,{primary:"".concat(e.nickName),style:{color:e.nickNameColor}}),t&&e.nickName!==a?r.a.createElement(ce.a,{size:"small","aria-label":"small outlined button group"},r.a.createElement(w.a,{onClick:function(){return function(e){i(e)}(e)}}," ",e.isMuted?"unmute":"mute"),r.a.createElement(w.a,{onClick:function(){return t=e.id,void o(t);var t}},e.isBaned?"unban":"ban")):null)}))))})))}var me=n(146),he=n.n(me),de=function(){function e(t){if(Object(f.a)(this,e),e.exists)return e.instance;e.instance=this,e.exists=!0,this.socket=he()("".concat("http://localhost:3000","?token=").concat(t),{forceNew:!0})}return Object(b.a)(e,[{key:"getSocket",value:function(){return this.socket}}]),e}();function ge(e){return{type:"SET_SOCKET",socket:e}}var pe=n(300),fe=n(301),be=n(147),ve=n.n(be),ke=Object($.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function xe(e){var t=ke();return r.a.createElement("div",{className:t.root},r.a.createElement(pe.a,{position:"static"},r.a.createElement(fe.a,null,r.a.createElement(P.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(ve.a,{onClick:e.showHideUsersList})),r.a.createElement(O.a,{variant:"h6",className:t.title,style:{color:e.colorNickName}},e.username),r.a.createElement(w.a,{onClick:e.logout,color:"inherit"},"Logout"))))}var ye=n(6),Ee=(Object(Y.a)(K.a)({background:"#6d81af",display:"flex",flexDirection:"row-reverse",margin:0,padding:0,height:800,position:"relative",maxHeight:1e3,"@media (max-height:900px)":{height:700,maxHeight:900},"@media (max-height:800px)":{height:600,maxHeight:800},"@media (max-height:700px)":{height:500,maxHeight:700},"@media (max-height:600px)":{height:400,maxHeight:600},"@media (max-height:500px)":{height:300,maxHeight:500},"@media (max-height:400px)":{height:200,maxHeight:400}}),function(e){Object(v.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).colorNickName="white",a.state={messages:[],isAdmin:!1,nickName:"",isMuted:!1,showUsersContainer:!0},a}return Object(b.a)(n,[{key:"componentWillUnmount",value:function(){this.props.isConnected(!1)}},{key:"componentDidMount",value:function(){var e=Object(T.a)(I.a.mark((function e(){var t,n,a,r,i,o=this;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.props.initConnection();case 2:(t=this.props.socket).on("users",(function(e){o.props.setUsers(e)})),t.on("previousMessages",(function(e){return o.setState({messages:e})})),t.on("error",(function(e){alert(e),o.props.history.push("/login")})),t.on("initialMuteStatus",(function(e){o.setState({isMuted:e})})),t.on("mute",(function(e){o.setState({isMuted:e})})),t.on("chat",(function(e){return o.setState({messages:[].concat(Object(G.a)(o.state.messages),[e])})})),t.on("disconnect",(function(e){H.a.clearAll(),o.props.history.push("/login")})),n=H.a.get("userData"),a=n.nickNameColor,r=n.isAdmin,i=n.nickName,this.colorNickName=a,this.setState({isAdmin:r,nickName:i}),this.props.isConnected(!0);case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"setMuteStatus",value:function(e){this.props.socket.emit("mute",e.id)}},{key:"setBan",value:function(e){this.props.socket.emit("ban",e)}},{key:"sendMsg",value:function(e){this.props.socket.emit("chat",e)}},{key:"logout",value:function(){var e=Object(T.a)(I.a.mark((function e(){return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,localStorage.removeItem("userToken");case 2:this.props.socket.disconnect(!0),this.props.history.push("/login");case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.props,n=t.isConnected,a=t.users,i=t.classes,o=this.state,s=o.isAdmin,c=o.nickName,u=o.showUsersContainer,l=o.messages;return n&&a.length>0?r.a.createElement(K.a,{style:{display:"flex",flexDirection:"column"}},r.a.createElement(xe,{username:c,colorNickName:this.colorNickName,showHideUsersList:function(){return e.setState({showUsersContainer:!e.state.showUsersContainer})},logout:function(){return e.logout()}}),r.a.createElement(K.a,{className:i.chatContainer},r.a.createElement(le,{users:a,isAdmin:s,userName:c,setMuteStatus:function(t){return e.setMuteStatus(t)},setBan:function(t){return e.setBan(t)},showUsersContainer:u}),r.a.createElement(ae,{messages:l,username:c})),this.state.isMuted?null:r.a.createElement(J,{handleSubmit:function(t){return e.sendMsg(t)}})):null}}]),n}(a.Component));var Oe=Object(s.b)((function(e){return{isConnected:e.chatReducer.isConnected,users:e.chatReducer.users,messages:e.chatReducer.messages,socket:e.chatReducer.socket}}),(function(e){return{initConnection:function(){return e(function(e){return Object(T.a)(I.a.mark((function t(){var n,a;return I.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,localStorage.getItem("token");case 2:n=t.sent,(a=new de(n).getSocket())&&e(ge(a));case 5:case"end":return t.stop()}}),t)})))}(e))},setUsers:function(t){return e(function(e){return{type:"USERS",users:e}}(t))},isConnected:function(t){return e(function(e){return{type:"IS_CONNECTED",isConnected:e}}(t))}}}))(Object(ye.a)((function(e){var t;return{chatContainer:(t={background:"#6d81af",display:"flex",flexDirection:"row-reverse",margin:0,padding:0,height:800,position:"relative",maxHeight:1e3},Object(j.a)(t,e.breakpoints.down("xs"),{height:300,maxHeight:600}),Object(j.a)(t,e.breakpoints.down("sm"),{height:600,maxHeight:800}),t)}}))(Ee)),je=function(e){Object(v.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={},a}return Object(b.a)(n,[{key:"render",value:function(){return r.a.createElement(p.a,{to:"/login"})}}]),n}(a.Component),we=n(56),Se=function(e,t,n){e.meta.auth?(localStorage.getItem("token")&&n.redirect("/chat"),n.redirect("/login")):n()},Ce=n(149),Ne=function(e){Object(v.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={loading:!0},a}return Object(b.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(Ce.a,{color:"#123abc",loading:this.state.loading}))}}]),n}(r.a.Component),Me=function(){return r.a.createElement("div",null,r.a.createElement("h3",null,"404 page not found"),r.a.createElement("p",null,"We are sorry but the page you are looking for does not exist."))},Ie=function(){return r.a.createElement(we.a,{guards:[Se],loading:Ne,error:Me},r.a.createElement(p.d,null,r.a.createElement(we.b,{path:"/login",exact:!0,component:B,meta:{auth:!0}}),r.a.createElement(we.b,{path:"/",exact:!0,component:je,meta:{auth:!0}}),r.a.createElement(we.b,{path:"/chat",exact:!0,component:Oe,meta:{auth:!0}}),r.a.createElement(we.b,{path:"*",component:Me})))},Te=n(31),Re=Object(Te.a)(),Ue=g,Fe=function(){return r.a.createElement(s.a,{store:Ue},r.a.createElement(p.c,{history:Re},r.a.createElement(Ie,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Fe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[159,1,2]]]);
//# sourceMappingURL=main.fc0a8f00.chunk.js.map