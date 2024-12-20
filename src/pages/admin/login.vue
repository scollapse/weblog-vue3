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
                    <h1 class="w-full text-center  text-6xl font-sans  mb-10 text-white">Login</h1>
                </div>
                <div class="w-full max-w-screen-md">
                    <form>
                        <div class="mb-10">
                            <label for="email"
                                class="font-mono block mb-5 text-lg text-white dark:text-white">Email
                                address</label>
                            <input type="email" id="email"
                                class="leading-10 bg-cyan-900 border border-cyan-800 text-neutral-100 placeholder-white text-lg rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="john.doe@company.com" required />
                        </div>
                        <div class="mb-10">
                            <label for="password"
                            class="font-mono block mb-5 text-lg text-white dark:text-white">Password</label>
                            <input type="password" id="password"
                               class="leading-10 bg-cyan-900 border border-cyan-800 text-neutral-100 placeholder-white text-lg rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••" required />
                        </div>
                        <div class="mb-20">
                            <label for="confirm_password"
                            class="font-mono block mb-5 text-lg text-white dark:text-white">Confirm
                                password</label>
                            <input type="password" id="confirm_password"
                                class="leading-10 bg-cyan-900 border border-cyan-800 text-neutral-100 placeholder-white text-lg rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="•••••••••" required />
                        </div>
                        <button type="submit"
                            class="font-mono leading-10 text-white bg-cyan-900 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-md w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>