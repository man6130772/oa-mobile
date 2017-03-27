define(['vue', 'css!iconfont', 'css!commoncss', 'css!contactsIndexCSS', 'common', 'vue.template'], function(Vue) {
    function page() {
        var that = this,
            allList,
            allListArr = allListArr || [],
            contactsList,
            eventType,
            conListVersion;

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

        //lodash数组过滤
        var filter = function(array, predicate) {
            var index = -1;
            var resIndex = 0;
            var length = array == null ? 0 : array.length;
            var result = [];

            while (++index < length) {
                var value = array[index];
                if (predicate(value, index, array)) {
                    result[resIndex++] = value;
                }
            }
            return result;
        }

        this.init = function(e) {
            eventType = e.type;
            
            if(eventType == 'pageInit') $.showIndicator();
            
            contactsList = (eventType == 'pageReinit' ? contactsList : that.render('contactsList'));
            
            eventType == 'pageInit' && that.getCurrVersion();
            eventType == 'pageInit' && that.contactsSearch();
        };

        this.render = function(id, data) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: data || {}
                }
            });
        };

        // 通过接口获取通讯录更新日期
        this.getCurrVersion = function() {
            ajaxData('GET', ajaxUrl.contactsListVersion, function(data) {
                currVersion = data.version;
                console.log(currVersion);

                that.checkVersion();
            });
        };

        // 与本地保存的更新日期比较，相同不更新数据，不相同更新数据
        this.checkVersion = function(currVersion) {
            conListVersion = localStorage.getItem('conListVersion') || '';
            if(conListVersion || conListVersion === currVersion) {
                //不更新从storage里取数据
                console.log('这里是从缓存中获取数据');
                that.getCacheData(contactsList);
            }else {
                //更新，重新获取数据
                console.log('这里是重新获取数据');
                eventType == 'pageInit' && that.ajaxData(ajaxUrl.contactsList, contactsList);
            }
        };

        this.ajaxData = function(url, vm) {
            ajaxData('GET', url, function(data) {
                $.hideIndicator();
                vm.data = data;
                allList = data;
                
                vm.$nextTick(function(){   //for渲染完成的回调
                    $(".contacts-block").indexList();
                });

                // 对象变数组
                that.getListArr();
                // 把数据存入缓存
                localStorage.setItem('conListVersion', currVersion);
                var listData = { obj: allList, arr: allListArr };
                localStorage.setItem('listData', JSON.stringify(listData));
            });
        };

        this.getCacheData = function(vm) {
            console.log(localStorage.getItem('listData').length)
            var listData = JSON.parse(localStorage.getItem('listData'));
            $.hideIndicator();
            allList = listData.obj;
            allListArr = listData.arr;
            vm.data = allList;

            vm.$nextTick(function(){   //for渲染完成的回调
                $(".contacts-block").indexList();
            });
        }

        // 搜索初始化
        this.contactsSearch = function() {
            $('#search').on('input', throttle(function() {
                var keyword = $(this).val().toLowerCase();
                that.filterData(keyword);    
            }, 200))
        };

        // 搜索过滤
        this.filterData = function(keyword) {
            var filterCondition = function(item) {
                var name = item.name;
                var first = item.first;
                return ((name.indexOf(keyword) > -1) || (first.indexOf(keyword) > -1));
            };

            if(keyword) {
                // console.log(allListArr.filter(filterCondition));
                contactsList.data = filter(allListArr, filterCondition);
                $('.index-list-bar').hide();
            }else {
                contactsList.data = allList;
                $('.index-list-bar').show();
            }
        };

        // 从首字母与对应数组列表对象中提取所有条目，得到整体联系人数组，只在ajax更新数据后进行操作存入本地
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
                    allListArr.push(item[i]);
                }    
            }

            console.log('allListArr.length', allListArr.length);
            // console.log(allListArr);
        }
    }
    return new page();
});