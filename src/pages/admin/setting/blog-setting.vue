<template>
    <div class="max-w-2xl mx-auto p-4">
        <div class="bg-white shadow-md rounded-lg p-6 w-4/5 mx-auto">
            <h2 class="text-2xl font-bold mb-4">博客设置</h2>
            <form @submit.prevent="saveSettings">
                <!-- 博客名称 -->
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">博客名称</label>
                    <input v-model="form.name" type="text" id="name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>

                <!-- 作者名 -->
                <div class="mb-4">
                    <label for="author" class="block text-sm font-medium text-gray-700">作者名</label>
                    <input v-model="form.author" type="text" id="author"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>

                <!-- 作者头像上传组件 -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">作者头像</label>
                    <div class="mt-2 flex items-center">
                        <input type="file" @change="handleAvatarUpload" class="hidden" ref="avatarInput" />
                        <img :src="form.avatar || placeholder" alt="作者头像" @click="triggerUpload"
                            class="w-24 h-24 rounded-full object-cover cursor-pointer border border-gray-300" />
                    </div>
                </div>

                <!-- 博客介绍 -->
                <div class="mb-4">
                    <label for="introduction" class="block text-sm font-medium text-gray-700">介绍</label>
                    <textarea v-model="form.introduction" id="introduction" rows="3"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                </div>

                <!-- Flowbite Switch 开启 GitHub 访问 -->
                <div class="mb-4 flex items-center">
                    <label for="enableGithub" class="block text-sm font-medium text-gray-700 mr-2">开启 GitHub 访问</label>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="enableGithub" v-model="form.enableGithub" class="sr-only peer" />
                        <div
                            class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300">
                        </div>
                        <span class="ml-3 text-sm font-medium text-gray-900"></span>
                    </label>
                </div>

                <!-- GitHub 地址 -->
                <div class="mb-4" v-if="form.enableGithub">
                    <label for="githubHomepage" class="block text-sm font-medium text-gray-700">GitHub 访问地址</label>
                    <input v-model="form.githubHomepage" type="text" id="githubHomepage"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>

                <!-- 保存按钮 -->
                <div class="flex justify-end">
                    <button type="submit"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">保存</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchSetting, updateSetting } from '@/api/admin/blogsettings';
import { uploadFile } from '@/api/admin/file';
import toast from '@/composables/utils/toast';

const form = ref({
    name: '',
    author: '',
    avatar: '',
    introduction: '',
    enableGithub: false,
    githubHomepage: ''
});

const avatarFile = ref(null); // 用于存储选择的文件
const placeholder = 'https://via.placeholder.com/150'; // 默认头像占位图

const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        avatarFile.value = file; // 保存文件对象
        form.value.avatar = URL.createObjectURL(file); // 生成预览 URL
    }
};

const triggerUpload = () => {
    const input = document.querySelector('input[type="file"]');
    if (input) {
        input.click();
    }
};

const saveSettings = async () => {
    console.log('保存设置:', form.value);

    if (!form.value.name) {
        toast.error('请填写博客名称');
        return;
    }

    if (!form.value.author) {
        toast.error('请填写作者名');
        return;
    }

    if (!form.value.introduction) {
        toast.error('请填写介绍');
        return;
    }

    // 头像必填
    if (!form.value.avatar && !avatarFile.value) {
        toast.error('请上传头像');
        return;
    }

    if(form.value.enableGithub && !form.value.githubHomepage) {
        toast.error('请填写 GitHub 访问地址');
        return;
    }

    if(!form.value.enableGithub) {
        form.value.githubHomepage = '';
    }


    // 如果有新的头像文件，上传文件
    if (avatarFile.value) {
        const formData = new FormData();
        formData.append('file', avatarFile.value); // 确保键名为 "file"
        const res = await uploadFile(formData);
        if (res.success) {
            form.value.avatar = res.data.url; // 使用返回的文件 URL
            console.log('头像上传成功:', res.data.url);
        } else {
            toast.error('头像上传失败');
            return;
        }
    }
   


    // 调用保存设置接口
    const res = await updateSetting(form.value);
    if (res.success) {
        toast.success('保存成功');
    } else {
        toast.error('保存失败');
    }
};

function initBlogSetting() {
    fetchSetting().then(res => {
        if (res.success) {
            form.value.name = res.data.name;
            form.value.author = res.data.author;
            form.value.avatar = res.data.avatar;
            form.value.introduction = res.data.introduction;

            if (res.data.githubHomepage) {
                form.value.enableGithub = true;
                form.value.githubHomepage = res.data.githubHomepage;
            }
        }
    });
}

onMounted(() => {
    initBlogSetting();
});
</script>

<style scoped>
/* 这里可以根据需要添加自定义样式 */
</style>
