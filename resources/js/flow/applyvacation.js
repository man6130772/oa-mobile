define(['vue', 'webuploader', 'swipeout', 'css!webuploadercss', 'css!iconfont', 'css!commoncss', 'css!leftdetailsCSS', 'css!applyvacationCSS', 'vue.template'], function(Vue, WebUploader) {
    function page() {
        var that = this,
            eventType,
            flowForm,
            imguploader;

        this.init = function(e, pageId, $page) {
            // 判断事件加载形式
            eventType = e.type;

            // 绑定header的回退事件
            that.handleBackClick();

            flowForm = eventType === 'pageReinit' ? flowForm : that.renderForm('flowForm');
            that.ajaxData('../../resources/json/applyvacation.json', flowForm, that.handleImgUpload);

            that.handleSubmit(pageId);

            var flowState = that.render('flowState');
            that.ajaxData('../../resources/json/flowState.json', flowState);
        };

        this.render = function(id, data) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: data || {}
                }
            });
        };

        this.renderForm = function(id, data) {
            return new Vue({
                el: '#' + id,
                data: {
                    data: data || {}
                },
                updated: function() {
                    $(document).off($.touchEvents.start, '.list-block li.swipeout');
                    $(document).off($.touchEvents.move, '.list-block li.swipeout');
                    $(document).off($.touchEvents.end, '.list-block li.swipeout');
                    $.initSwipeout();
                    var vm = this;
                    $(document).off('deleted', '.list-block li.swipeout').on('deleted', '.list-block li.swipeout', function(e) {
                        // 关键：先清空数组，再接收返回的新数据，重置明细的number
                        vm.data.leftDetails = [];
                        $.ajax({
                            url: '../../resources/json/applyvacation.json',
                            type: 'POST',
                            data: {
                                delete: $(this).find('.item-title').text()
                            },
                            success: function(data) {
                                vm.data = data;
                            }
                        });
                    });
                },
            });
        };

        this.ajaxData = function(url, vm, cb) {
            $.getJSON(url, function(data) {
                vm.data = data;
                if (cb) cb(vm, data);
            });
        };

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };

        this.handleSubmit = function(pageId) {
            $('#' + pageId + ' .app-submit').off('click').on('click', function() {
                var uploader = $('#' + pageId + ' .imguploader').data('uploader');
                if (uploader) uploader.upload();
            });
        };

        this.handleTimerBack = function() {
            $.modal({
                text: '<span class="iconfont icon-dui color-limegreen icon-big p-r-sm"></span>提交成功！',
                afterText: '<p class="app-modal-remarks"><span id="backCount" class="color-red">2</span> 秒后跳转【创建流程】</p>'
            });
            var timer = setInterval(function() {
                var count = $('#backCount').text();
                if (count > 0) $('#backCount').text(--count);
                if (count === 0) {
                    clearInterval(timer);
                    $.closeModal();
                    history.back();
                }
            }, 1000);
        };

        this.handleImgUpload = function(vm) {
            if (imguploader && eventType === 'pageReinit') return;
            var $wrap = imguploader = $(vm.$el).find('.imguploader');
            var $upitem = $('<div class="upitem iconfont icon-xiangji"></div>').appendTo($wrap);
            var uploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: false,

                // 提前预处理下个文件
                prepareNextFile: true,

                // 去重
                duplicate: true,

                // 分片处理
                chunked: true,

                // 文件接收服务端。
                server: 'http://' + location.host + '/fileupload',

                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: $upitem[0],

                // 只允许选择图片文件。
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },

                // 图片压缩
                compress: {
                    width: 1600,
                    height: 1600,

                    // 图片质量，只有type为`image/jpeg`的时候才有效。
                    quality: 80,

                    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                    allowMagnify: false,

                    // 是否允许裁剪。
                    crop: false,

                    // 是否保留头部meta信息。
                    preserveHeaders: true,

                    // 如果发现压缩后文件大小比原来还大，则使用原来图片
                    // 此属性可能会影响图片自动纠正功能
                    noCompressIfLarger: false,

                    // 单位字节，如果图片大小小于此值，不会采用压缩。
                    compressSize: 0
                }
            });

            // 把uploader实例传给jquery
            $wrap.data('uploader', uploader);

            uploader.on('fileQueued', function(file) {
                var $item = $('<div class="imgitem"><img id="' + file.id + '"><i class="iconfont icon-cha"></i></div>'),
                    $img = $item.find('img'),
                    $canelNode = $item.find('i');

                // $list为容器jQuery实例
                $upitem.before($item);

                // 创建缩略图
                // 如果为非图片文件，可以不用调用此方法。
                uploader.makeThumb(file, function(error, src) {
                    if (error) {
                        $img.replaceWith('<span>不能预览</span>');
                        return;
                    }

                    $img.attr('src', src);

                }, $item.width(), $item.height());

                $canelNode.on('click', function() {
                    uploader.removeFile(file);
                    $item.remove();
                });
            });

            // 文件上传成功，给item添加成功class, 用样式标记上传成功。
            uploader.on('uploadSuccess', function(file, res) {
                $('#' + file.id).parent('.imgitem').removeClass('upload-fail').addClass('upload-success');
                var stats = uploader.getStats(),
                    imgNum = imguploader.find('.imgitem').length;
                if (stats.progressNum === 0 && stats.queueNum === 0 && stats.successNum === imgNum) {
                    that.handleTimerBack();
                }
            });

            // 文件上传失败，显示上传出错。
            uploader.on('uploadError', function(file, res) {
                $('#' + file.id).parent('.imgitem').removeClass('upload-success').addClass('upload-fail');
            });
        }
    }
    return new page();
});