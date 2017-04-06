/**
 * Created by Administrator on 2017/4/1.
 */

    var Alert = function(){
        this.parent = null;
        this.doc = null;
    };

    Alert.prototype = {
        constructor:Alert,
        init :function(parent,ref,msg){
            this.parent = document.getElementsByClassName(parent)[0];
            var refNode = document.getElementsByClassName(ref)[0];
            this.doc = document.createElement('div');
            this.doc.id = 'page_alert';
            this.doc.innerHTML = '<div class="alert">'+msg+'</div>';
            this.parent.insertBefore(this.doc, refNode);
        },
        animate:function(duration){
            this.doc.className = 'anm';
            var This = this;          
            setTimeout(function () {
                if (This.parent.childNodes > 0) {
                    This.parent.removeChild(This.doc);
                }               
            },(duration+1)*1000);
        }
    };
