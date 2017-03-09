define(['vue', 'css!iconfont', 'css!commoncss', 'css!contactsIndexCSS', 'pinyin', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this,
            allList,
            allListArr = allListArr || [],
            contactsList,
            eventType;

        // lodash的节流函数
        var throttle = function(func, wait) {
            var context, args, timeout, result;
            var previous = 0;
            var later = function() {
              previous = new Date;
              timeout = null;
              result = func.apply(context, args);
            };
            return function() {
              var now = new Date;
              var remaining = wait - (now - previous);
              context = this;
              args = arguments;
              if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
              } else if (!timeout) {
                timeout = setTimeout(later, remaining);
              }
              return result;
            };
        };

        this.init = function(e) {
            checkLogined();
            eventType = e.type;
            if(eventType == 'pageInit') $.showIndicator();
            
            contactsList = (eventType == 'pageReinit' ? contactsList : that.render('contactsList'));
            eventType == 'pageInit' && that.ajaxData(ajaxUrl.contactsList, contactsList);

            that.contactsSearch();
        };

        this.render = function(id, data) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: data || {}
                }
            });
        };

        this.ajaxData = function(url, vm) {
            ajaxData('GET', url, function(data) {
                $.hideIndicator();
                vm.data = data;
                allList = data;
                
                vm.$nextTick(function(){   //for渲染完成的回调
                    $(".contacts-block").indexList();
                });
            });
        };

        this.contactsSearch = function() {
            $('#search').on('input', throttle(function() {
                var keyword = $(this).val().toUpperCase();
                if(!allListArr.length) that.getListArr();

                that.filterData(keyword);    
            }, 200))
        };

        this.filterData = function(keyword) {
            var filterCondition = function(item) {
                var name = item.name;
                var first = item.first;
                return ((name.indexOf(keyword) > -1) || (first.indexOf(keyword) > -1));
            };

            if(keyword) {
                // console.log(allListArr.filter(filterCondition));
                contactsList.data = allListArr.filter(filterCondition);
                $('.index-list-bar').hide();
            }else {
                contactsList.data = allList;
                $('.index-list-bar').show();
            }
        };

        this.getListArr = function() {
            var filterFirstEqual = function(arr, key) {
                for (var i = 0; i < arr.length; i++) {
                    return arr[i][0] === key ? arr[i] : arr[0];
                }
            };

            for (var key in allList) {
                var item = allList[key];
                var len = item.length;
                for (var i = 0; i < len; i++) {
                    var firstNameArr = pinyinUtil.getFirstLetter(item[i].name, true);
                    var firstNameArrLen = firstNameArr.length;
                    item[i].first = (firstNameArrLen === 1 ? firstNameArr[0] : filterFirstEqual(firstNameArr, key));
                    allListArr.push(item[i]);
                }    
            }

            console.log(allListArr.length);
            // console.log(allListArr);
        }
    }
    return new page();
});