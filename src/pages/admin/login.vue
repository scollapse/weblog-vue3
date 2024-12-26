<template>
    <!-- 使用 grid 网格布局，并指定列数为 2，高度占满全屏  -->
    <div class="grid grid-cols-2 h-screen bg-cyan-950 ">
        <!-- 左侧背景图片 -->
        <!-- 默认先适配移动端，占两列，order 用于指定排列顺序，md 用于适配非移动端（PC 端）-->
        <div class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 animate__animated animate__fadeInLeft">
            <div
                class="relative bg-cover bg-center flex bg-no-repeat justify-center items-center h-full rounded-xl bg-[url('@/assets/login-bg.png')]">
                <div class="relative w-full h-full">
                    <p class="font-mono absolute bottom-40 left-1/3 text-white text-center text-4xl">Capturing Moments
                    </p>
                    <p class="font-mono absolute bottom-20 left-1/3 text-white text-center text-4xl">Creating
                        &nbsp;Memories</p>
                </div>
            </div>
        </div>
        <div class="col-span-2 order-1 md:col-span-1 md:order-2  animate__animated animate__fadeInRight">
            <div class="flex justify-center items-center h-full flex-col">
                <!-- 登录表单 -->
                <div class="w-full">
                    <!-- 登录标题 -->
                    <h1 class="w-full text-center  text-4xl font-sans  mb-10 text-white"> Sign in to your account</h1>
                </div>
                <div class="w-full max-w-xl">
                    <form @submit.prevent="onSubmit">
                        <div class="mb-10">
                            <label for="email" class="font-mono block mb-5 text-lg text-white dark:text-white">Email
                                address</label>
                            <div class="relative mb-6">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path
                                            d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path
                                            d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                </div>
                                <input type="email" id="email" v-model="form.email"
                                    class="bg-cyan-900 border border-cyan-800 text-neutral-100  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@flowbite.com">

                            </div>
                            <p v-if="form.errors.email" class="text-pink-300  text-sm mt-2">{{ form.errors.email }}
                            </p>

                        </div>
                        <!-- 密码输入 -->
                        <div class="mb-10">
                            <label for="password" class="font-mono block mb-5 text-lg text-white dark:text-white">
                                Password
                            </label>
                            <div class="relative mb-6">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password"
                                    class="bg-cyan-900 border border-cyan-800 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                    placeholder="•••••••••">
                                <div class="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
                                    @click="togglePasswordVisibility">
                                    <svg v-if="showPassword" class="w-4 h-4 text-gray-500" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 3C5.633 3 2.062 6.043.883 9.952a.998.998 0 0 0 0 .095C2.062 13.957 5.633 17 10 17s7.938-3.043 9.117-6.952a.998.998 0 0 0 0-.095C17.938 6.043 14.367 3 10 3Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                    </svg>
                                    <svg v-else class="w-4 h-4 text-gray-500" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 3C5.633 3 2.062 6.043.883 9.952a.998.998 0 0 0 0 .095C2.062 13.957 5.633 17 10 17s7.938-3.043 9.117-6.952a.998.998 0 0 0 0-.095C17.938 6.043 14.367 3 10 3Zm-3 5a3 3 0 0 1 6 0 3 3 0 0 1-6 0Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <p v-if="form.errors.password" class="text-pink-300 text-sm mt-2">{{ form.errors.password }}
                            </p>
                        </div>
                        <!-- 确认密码输入 -->
                        <div class="mb-20">
                            <label for="confirm_password"
                                class="font-mono block mb-5 text-lg text-white dark:text-white">Confirm
                                password</label>
                            <div class="relative mb-6">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                </div>
                                <input :type="showConfirmPassword ? 'text' : 'password'" id="confirm_password" v-model="form.confirm_password"
                                    class="bg-cyan-900 border border-cyan-800 text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="•••••••••">
                                    <div class="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
                                    @click="toggleConfirmPasswordVisibility">
                                    <svg v-if="showConfirmPassword" class="w-4 h-4 text-gray-500" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 3C5.633 3 2.062 6.043.883 9.952a.998.998 0 0 0 0 .095C2.062 13.957 5.633 17 10 17s7.938-3.043 9.117-6.952a.998.998 0 0 0 0-.095C17.938 6.043 14.367 3 10 3Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                    </svg>
                                    <svg v-else class="w-4 h-4 text-gray-500" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 3C5.633 3 2.062 6.043.883 9.952a.998.998 0 0 0 0 .095C2.062 13.957 5.633 17 10 17s7.938-3.043 9.117-6.952a.998.998 0 0 0 0-.095C17.938 6.043 14.367 3 10 3Zm-3 5a3 3 0 0 1 6 0 3 3 0 0 1-6 0Z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <p v-if="form.errors.confirm_password" class="text-pink-300 text-sm mt-2">{{
                                form.errors.confirm_password }}</p>
                        </div>
                        <button type="submit"
                            class="font-mono font-bold leading-10 text-white bg-cyan-900 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-md w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click="onSubmit">Login</button>
                    </form>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

import { login } from '@/api/admin/user'
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import toast from '@/composables/utils/toast.js';
import { setToken } from '@/composables/utils/cookie'

const router = useRouter()

// 定义响应式的表单对象
const form = reactive({
    email: '',
    password: '',
    confirm_password: '',
    errors: {} // 用于存储错误信息
})

// 密码可见性切换
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
};

const validateForm = () => {
    // 清空之前的错误
    form.errors = {};

    // 验证邮箱
    if (!form.email) {
        form.errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        form.errors.email = 'Invalid email address.';
    }

    // 验证密码
    if (!form.password) {
        form.errors.password = 'Password is required.';
    }
    // else if (form.password.length < 8) {
    //     form.errors.password = 'Password must be at least 8 characters long.';
    // }

    // 验证确认密码
    if (!form.confirm_password) {
        form.errors.confirm_password = 'Please confirm your password.';
    } else if (form.password !== form.confirm_password) {
        form.errors.confirm_password = 'Passwords do not match.';
    }

    // 如果错误对象为空，则验证通过
    return Object.keys(form.errors).length === 0;
};

// 登录
const onSubmit = (e) => {
    e.preventDefault(); // 阻止默认表单提交

    // 验证表单
    if (!validateForm()) {
        // 如果验证失败，直接返回
        return;
    }

    // 验证通过后调用登录接口
    login(form.email, form.password).then((res) => {
        console.log(res);
        if (res.success) {
            toast.show('success', '登陆成功!');
            // 存储 token
            let token = res.data.token;
            setToken(token);
            router.push('/admin/index');
        }else{
            let message = res.errorMessage
            toast.show('error', message);
        }
    }).catch((error) => {
        console.error('Login failed:', error);
    });
};


</script>