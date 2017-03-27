define(['vue', 'webuploader', 'css!commoncss', 'css!webuploadercss', 'css!personalInfoCSS', 'common', 'vue.template'], function(Vue, WebUploader) {
    function page() {
        var that = this;
        var eventType;
        var personalInfo;

        this.init = function(e) {
            eventType = e.type;
            // 绑定header的回退事件
            that.handleBackClick();

            personalInfo = (eventType == 'pageReinit' ? personalInfo : that.render('userInfo'));
            that.ajaxData(ajaxUrl.personInfo, personalInfo);

            that.handleImgUpload();
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
                vm.data = data;
            });
        };


        this.handleImgUpload = function() {      
            var uploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: true,

                // 提前预处理下个文件
                prepareNextFile: true,

                // 去重
                duplicate: true,

                // 分片处理
                chunked: true,

                // 文件接收服务端。
                // server: 'http://' + location.host + '/fileupload',
                server: ajaxUrl.imgUpload,

                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#headImg',

                // 只允许选择图片文件。
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },

                // 图片压缩
                compress: {
                    width: 500,
                    height: 500,

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
                },

                withCredentials: true  // 支持CORS跨域带cookie
            });

            uploader.on('fileQueued', function( file ) {
                // uploader.upload();

                var headImg = $('#userInfo .user-header');
                // 创建缩略图
                // 如果为非图片文件，可以不用调用此方法。
                uploader.makeThumb(file, function(error, src) {
                    if (error) return;

                    headImg.attr('src', src);

                }, headImg.width(), headImg.height());
            });

            // 文件上传成功，给item添加成功class, 用样式标记上传成功。
            uploader.on('uploadSuccess', function(file, res) {
                if(res.resCode === 0) that.ajaxData(ajaxUrl.personInfo, personalInfo);
            });
        }

        this.handleBackClick = function() {
            $('.app-btn-back').off('click').on('click', function() {
                history.back();
            });
        };
    }
    return new page();
});