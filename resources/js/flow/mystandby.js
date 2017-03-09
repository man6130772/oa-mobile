define(['vue', 'css!iconfont', 'css!commoncss', 'css!mystandbyCSS', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this;
        var tabs = ['all', 'unread', 'read', 'star', 'reverse'];
        var index = 0;
        var cacheData = {};
        var list;

        this.init = function() {
            // 绑定header的回退事件
            that.handleBackClick();
            this.tabClick();
            this.starClick();

            list = that.renderTab('list');
            this.getListData();
        };

        this.getListData = function() {
            ajaxData('GET', ajaxUrl.myStandby, function(data) {
                list.msgList = data;
                cacheData[tabs[index]] = data;
            }, { tab: tabs[index] });
        };

        this.renderTab = function() {
            return new Vue({
                el: '#list',
                data: {
                    msgList: []
                }
            });
        };

        this.tabClick = function() {
            $('#mystandby').on('click', 'a.tab-link', function() {
                index = $(this).index();
                console.log(index)
                $(this).addClass('active').siblings().removeClass('active');
                var currList = cacheData[tabs[index]];
                if(currList) {
                    list.msgList = currList;
                }else {
                    that.getListData();
                }
            })
        };

        this.starClick = function() {
            $('#mystandby').on('click', '.card-header>.iconfont', function(e) {
                e.stopPropagation();
                e.preventDefault();
                var currStar = $(this);
                
                ajaxData('GET', ajaxUrl.myStandbyStar, function(data){
                    if(data.state) {
                        currStar.addClass('icon-xingxingkongxin').toggleClass('icon-xingxingshixin').toggleClass('color-gold');    
                    }
                }, { tab: tabs[index], id: currStar.attr('data-id') })
            })
        }

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});