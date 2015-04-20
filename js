<script src="/socket.io/socket.io.js"></script>
		<script>
			var sock=io.connect('ws://localhost:81');//连接sock
			var onLine=document.getElementById('onLine');
			var btn=onLine.getElementsByTagName('input')[0];
			var h3=onLine.getElementsByTagName('h3')[0];
			var oLine_span=h3.getElementsByTagName('span')[0];
			
			var msg=document.getElementById('msg');
			var ul=msg.getElementsByTagName('ul')[0];
			var oT=document.getElementById('oT');
			
			var State=document.getElementById('State');
			var State_oSpan=State.getElementsByTagName('span')[0];
			//在线状态以及人数
			sock.on('connect',function(){
				State_oSpan.innerHTML='在线';
				State_oSpan.className='green';
			});
			sock.on('disconnect',function(){
				State_oSpan.innerHTML='离线';
				State_oSpan.className='red';
			})
			sock.on('line',function(str){
				oLine_span.innerHTML=str;
			});
			
			//
			sock.on('msg_result',function(){
				var add_color='rgb('+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+')';
				if(!oT.value)return;
				var oLi=document.createElement('li');
				oLi.className='ri';
				oLi.innerHTML='<div class="t">'+
						'<span>自己</span>'+
						'<span>----</span>'+
						'<span>time</span>'+
					'</div>'+
					'<p>'+oT.value+'</p>'+
					'<strong class="p2" style="color:'+add_color+'">----------飘逸的分隔符----------</strong>';
				oT.value='';
				ul.appendChild(oLi);
			})
			btn.onclick=function(){
				sock.emit('msg',oT.value);
			}
			//接受消息
			sock.on('recv_msg',function(str){
				console.log(str);
				var add_color='rgb('+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+')';
				var oLi=document.createElement('li');
				oLi.className='le';
				oLi.innerHTML='<div class="t">'+
						'<span>别人</span>'+
						'<span>----</span>'+
						'<span>time</span>'+
					'</div>'+
					'<p>'+str+'</p>'+
					'<strong class="p2" style="color:'+add_color+'">----------飘逸的分隔符----------</strong>';
				oT.value='';
				ul.appendChild(oLi);
			});
			var oTxtUser=document.getElementById('txt_user');
			var oTxtPass=document.getElementById('txt_pass');
			var oBtnLogin=document.getElementById('btn_login');
			var oBtnReg=document.getElementById('btn_reg');
			
			var state_msg=document.getElementById('state_msg');
			
			var oDiv1=document.getElementById('div1');
			var oDiv2=document.getElementById('div2');
			//登入 
			oBtnLogin.onclick=function(){
				if(oTxtUser.value=='' || oTxtPass.value==''){
					state_msg.innerHTML='账号或者密码不能为空';
					state_msg.className='red';
					return;
				}
				sock.emit('login',oTxtUser.value,oTxtPass.value);
			}
			sock.on('login_rasult',function(state,msg){
				if(!state){
					state_msg.innerHTML=msg;
					state_msg.className='red';
				}else{
					oDiv2.style.display='none';
					oDiv1.className+=' gdt';
				}
			});
			
			//注册
			oBtnReg.onclick=function(){
				if(oTxtUser.value=='' || oTxtPass.value==''){
					state_msg.innerHTML='账号或者密码不能为空';
					state_msg.className='red';
					return;
				}
				sock.emit('reg',oTxtUser.value,oTxtPass.value);
			}
			sock.on('reg_result',function(state,msg){
				if(!state){
					state_msg.innerHTML=msg;
					state_msg.className='red';
				}else{
					state_msg.innerHTML=msg;
					state_msg.className='';
				}
			});
		</script>
