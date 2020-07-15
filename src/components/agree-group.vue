<template>
    <div class="agree-group">
        <input v-resetInput type="checkbox" :checked="value" :value="currentValue" @click="handleInput" />
        <label>我已阅读
            <a href="javascript:void(0);" @click="toXuzhi">《投保须知》</a>和
            <a href="javascript:void(0);" @click="showImgViewer('tiaokuanViewer')">《保险条款》</a>
        </label>

        <!-- <pic-viewer :pic-list="xuzhiImgList" ref="xuzhiViewer"/> -->
        <pic-viewer :pic-list="tiaokuanImgList" ref="tiaokuanViewer"/>
    </div>
</template>
<script>
    import xuzhiUrl from "@/assets/doc/toubaoxuzhi.pdf";
    import tiaokuanUrl from "@/assets/doc/baoxiantiaokuan.pdf";
    import picViewer from '@/components/pic-viewer.vue';
    
    var download = function(data, name) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name)

        document.body.appendChild(link)
        link.click()
    }
    export default {
        data: function() {
            return {
                currentValue: this.value,
                xuzhiUrl: xuzhiUrl,
                tiaokuanUrl: tiaokuanUrl,
                xuzhiImgList: [
                    {url: require('@/assets/doc/toubaoxuzhi/0_1.jpg')},
                    {url: require('@/assets/doc/toubaoxuzhi/0_2.jpg')},
                    {url: require('@/assets/doc/toubaoxuzhi/0_3.jpg')},
                ],
                tiaokuanImgList: [
                    {url: require('@/assets/doc/baoxiantiaokuan/0_01.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_02.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_03.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_04.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_05.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_06.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_07.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_08.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_09.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_10.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_11.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_12.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_13.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_14.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_15.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_16.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_17.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_18.jpg')},
                    {url: require('@/assets/doc/baoxiantiaokuan/0_19.jpg')},
                ],
            };
        },
        props: ["value"],
        methods: {
            handleInput(evt) {
                setTimeout(() => {
                    var value = evt.target.checked;
                    console.log(value);
                    this.$emit("input", value);
                });
            },
            downloadFile(url, name) {
                console.log(url);
                // v.$http.get(url).then(res => {
                //     downloadUrl(res.request.responseURL);
                // })

                this.axios({
                        method: "get",
                        url: url,
                        responseType: "blob"
                    })
                    .then(response => {
                        download(response.data, name);
                    })
                    .catch(error => {});
            },
            showImgViewer: function(viewer) {
                console.log(viewer)
                this.$refs[viewer].open();
            },
            toXuzhi(){
                  this.$switchTo('/xuzhi')
            }
        },
        components: {
            picViewer
        }
    };
</script>
<style scoped>
    .agree-group {
        /* background-color: #fff; */
        padding: 0.32rem 0.4rem;
        font-size: 0.373333rem;
    }
    
    label a {
        color: #74adff;
        text-decoration: none;
    }
    
    input {
        position: relative;
        top: -0.026667rem;
        width: 0.4rem;
        height: 0.4rem;
        vertical-align: middle;
        border: none;
    }
    
    input::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url("../assets/image/checkbox-off.png");
        background-size: 100%;
    }
    
    input::after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url("../assets/image/checkbox-on.png");
        background-size: 100%;
        opacity: 0;
    }
    
    input:checked::after {
        opacity: 1;
    }
</style>