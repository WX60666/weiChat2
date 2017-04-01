var Bn = function() {
	var Binding = function() {
		this.oBtn = null;
		this.oConf = null;
		this.isLegalNum = false;
		this.alert = new Alert();
	}
	Binding.prototype = {
		constructor: Binding,
		init:function(arg1, arg2) {
			this.oBtn = document.getElementsByClassName(arg1)[0];
			this.oConf = document.getElementById(arg2);
			var This = this;
			this.oBtn.addEventListener('touchend', function() {
				This.checkOutNum();
			}, false);
			this.oConf.addEventListener('touchend', function() {
				This.checkOutQrCode();
			}, false);
			this.oConf.style.color = "#999";

		},
		getVcode: function() {
			this.oBtn.disabled = true;
			this.update_p(0, 60);
		},
		update_p: function(num, t) {
			var This = this;
			this.oBtn.disabled = true;
			if(num == t) {
				this.oBtn.value = "获取验证码";
				this.oBtn.disabled = false;
			} else {
				printnr = t - num;
				num++;
				this.oBtn.value = " (" + printnr + ")秒后重新发送";
				setTimeout(function() {
					This.update_p(num, t);
				}, 1000);
			}
		},
		checkOutNum: function() {
			if(this.oBtn.disabled) {
				return false;
			}
			var phone = document.getElementById('phone').value;			
			if (!(/^1[34578]\d{9}$/.test(phone))) {			  
			    this.alert.init('page', 'page_form', '请输入正确的手机号');
			    this.alert.animate(4);
				return false;
			} else {
				//alert.style.display = 'none';
				this.getVcode(60);
				this.isLegalNum = true;
				this.oConf.style.color = "#3CC51F";
			}
		},
		checkOutQrCode: function () {
		    if(this.isLegalNum){
		        var qrCode = document.getElementById('qr-code').value;
		        if (qrCode == '') {
		            this.alert.init('page', 'page_form', '请输入正确的验证码');
		            this.alert.animate(4);
		            return false;
		        } else {
		            //清空手机号,验证码
		            document.getElementById('qr-code').value = "";
		            document.getElementById('phone').value = "";
		            window.location.href = 'msgpage.html';
		        }
		    } 
		}

	};

	return {
		init: function() {
			var b = new Binding();
			b.init('get_v_code', 'conf');
		}
	}
}();

window.onload = function() {
	Bn.init();
}