(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{119:function(e,t,a){},121:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),s=a(5),r=a.n(s),l=(a(71),a(62)),m=a(30),o=a(31),c=a(33),u=a(32),h=a(34),d=a(7),b=a(48),g=(a(117),a(119),a(12)),p=a.n(g),S=new Date,E=new Date;E.setMinutes(E.getMinutes()+50);var f=p()().second(0),_={course_name:"Underwater Basket Weaving",exam_name:"Midterm 1",start_time:S,end_time:E,instructions:"Remember to write your name. No cheating."},v=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={exam_info:_,showSettings:!0},a.handleSettingsSubmit=a.handleSettingsSubmit.bind(Object(d.a)(Object(d.a)(a))),a.toggleSettingsVisibility=a.toggleSettingsVisibility.bind(Object(d.a)(Object(d.a)(a))),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleSettingsSubmit",value:function(e){this.setState({exam_info:e})}},{key:"toggleSettingsVisibility",value:function(){this.setState({showSettings:!this.state.showSettings})}},{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(O,{exam_info:this.state.exam_info,handleSubmit:this.handleSettingsSubmit,toggleSettings:this.toggleSettingsVisibility,showSettings:this.state.showSettings}),i.a.createElement("h1",null,this.state.exam_info.course_name,": ",this.state.exam_info.exam_name," "),i.a.createElement(y,{start_time:this.state.exam_info.start_time,end_time:this.state.exam_info.end_time,instructions:this.state.exam_info.instructions}))}}]),t}(n.Component),O=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).handleStartTimeChange=function(e){return a.setState({start_time:e.toDate()})},a.handleEndTimeChange=function(e){return a.setState({end_time:e.toDate()})},a.state=a.props.exam_info,a.handleChange=a.handleChange.bind(Object(d.a)(Object(d.a)(a))),a.handleStartTimeChange=a.handleStartTimeChange.bind(Object(d.a)(Object(d.a)(a))),a.handleEndTimeChange=a.handleEndTimeChange.bind(Object(d.a)(Object(d.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(Object(d.a)(a))),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(l.a)({},a,n))}},{key:"handleSubmit",value:function(e){this.props.handleSubmit(this.state),e.preventDefault()}},{key:"render",value:function(){return i.a.createElement("div",{className:"SetupBar"},i.a.createElement("button",{onClick:this.props.toggleSettings},this.props.showSettings?"Hide Setup":"Setup"),i.a.createElement("div",{className:this.props.showSettings?"SetupForm":"SetupFormHidden"},i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement("label",{htmlFor:"course_name"},"Course name: "),i.a.createElement("input",{id:"course_name",name:"course_name",type:"text",value:this.state.course_name,onChange:this.handleChange}),i.a.createElement("br",null),i.a.createElement("label",{htmlFor:"exam_name"},"Exam name: "),i.a.createElement("input",{id:"exam_name",name:"exam_name",type:"text",value:this.state.exam_name,onChange:this.handleChange}),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("label",{htmlFor:"start_time"},"Start time: "),i.a.createElement(b.a,{showSecond:!0,defaultValue:f,className:"SetupFormTime",onChange:this.handleStartTimeChange,format:"h:mm a",use12Hours:!0,inputReadOnly:!0}),i.a.createElement("br",null),i.a.createElement("label",{htmlFor:"end_time"},"End time: "),i.a.createElement(b.a,{showSecond:!0,defaultValue:f,className:"SetupFormTime",onChange:this.handleEndTimeChange,format:"h:mm a",use12Hours:!0,inputReadOnly:!0}),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("label",{htmlFor:"instructions"},"Instructions: "),i.a.createElement("textarea",{id:"instructions",name:"instructions",value:this.state.instructions,onChange:this.handleChange}),i.a.createElement("br",null),i.a.createElement("label",{htmlFor:"submitButton"}),i.a.createElement("input",{id:"submitButton",type:"submit",value:"Apply Changes"}))),i.a.createElement("hr",null))}}]),t}(n.Component),y=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={date:new Date},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval(function(){return e.tick()},1e3)}},{key:"componentWillUnMount",value:function(){clearInterval(this.timerID)}},{key:"tick",value:function(){this.setState({date:new Date})}},{key:"render",value:function(){return i.a.createElement("div",null," ",this.state.date<this.props.start_time?i.a.createElement("span",{style:{color:"grey"}},"Hold up! The exam has not started yet."):this.state.date<this.props.end_time?i.a.createElement("span",{style:{color:"lime"}},"Exam in progress..."):i.a.createElement("span",{style:{color:"red"}},"Time is up! Please turn in your exam."),i.a.createElement("h2",{className:"timer"},this.state.date.toLocaleTimeString()),i.a.createElement("div",{className:"announcement"},i.a.createElement("h3",null,"Start time: ",this.props.start_time.toLocaleTimeString()),i.a.createElement("h3",null,"End time: ",this.props.end_time.toLocaleTimeString()),i.a.createElement("p",null,this.props.instructions)))}}]),t}(n.Component),j=v;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},66:function(e,t,a){e.exports=a(121)},71:function(e,t,a){}},[[66,2,1]]]);
//# sourceMappingURL=main.936b8cc4.chunk.js.map