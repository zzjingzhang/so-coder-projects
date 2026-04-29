<template>
  <div
    class="min-h-screen flex items-center justify-center p-4"
    :style="{ backgroundColor: 'var(--bg-color)' }"
  >
    <Card class="w-full max-w-md shadow-lg" :bordered="false">
      <div class="text-center mb-8">
        <UserOutlined
          class="text-5xl mb-4"
          :style="{ color: 'var(--primary-color)' }"
        />
        <h1 class="text-2xl font-bold mb-2">在线简历编辑器</h1>
        <p :style="{ color: 'var(--text-tertiary)' }">登录以使用完整功能</p>
      </div>

      <Tabs v-model:activeKey="activeTab" centered>
        <TabPane key="login" tab="登录">
          <Form :model="loginForm" layout="vertical" @finish="handleLogin">
            <FormItem
              label="邮箱"
              name="email"
              :rules="[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入正确的邮箱格式' },
              ]"
            >
              <Input v-model:value="loginForm.email" placeholder="请输入邮箱">
                <template #prefix>
                  <MailOutlined />
                </template>
              </Input>
            </FormItem>
            <FormItem
              label="密码"
              name="password"
              :rules="[{ required: true, message: '请输入密码' }]"
            >
              <InputPassword
                v-model:value="loginForm.password"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </InputPassword>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                html-type="submit"
                :loading="loading"
                block
                size="large"
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </TabPane>

        <TabPane key="register" tab="注册">
          <Form
            :model="registerForm"
            layout="vertical"
            @finish="handleRegister"
          >
            <FormItem
              label="姓名"
              name="name"
              :rules="[{ required: true, message: '请输入姓名' }]"
            >
              <Input v-model:value="registerForm.name" placeholder="请输入姓名">
                <template #prefix>
                  <UserOutlined />
                </template>
              </Input>
            </FormItem>
            <FormItem
              label="邮箱"
              name="email"
              :rules="[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入正确的邮箱格式' },
              ]"
            >
              <Input
                v-model:value="registerForm.email"
                placeholder="请输入邮箱"
              >
                <template #prefix>
                  <MailOutlined />
                </template>
              </Input>
            </FormItem>
            <FormItem
              label="密码"
              name="password"
              :rules="[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6位' },
              ]"
            >
              <InputPassword
                v-model:value="registerForm.password"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </InputPassword>
            </FormItem>
            <FormItem
              label="确认密码"
              name="confirmPassword"
              :rules="[
                { required: true, message: '请确认密码' },
                { validator: validateConfirmPassword, trigger: 'blur' },
              ]"
            >
              <InputPassword
                v-model:value="registerForm.confirmPassword"
                placeholder="请再次输入密码"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </InputPassword>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                html-type="submit"
                :loading="loading"
                block
                size="large"
              >
                注册
              </Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>

      <Divider>或者</Divider>

      <div class="text-center">
        <Button type="dashed" block @click="skipLogin">
          <ThunderboltOutlined class="mr-2" />
          跳过登录（体验模式）
        </Button>
        <p class="text-xs mt-3" :style="{ color: 'var(--placeholder-color)' }">
          体验模式下部分功能可能无法使用
        </p>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  Card,
  Tabs,
  Form,
  FormItem,
  Input,
  Button,
  Divider,
} from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons-vue";
import { authService } from "@/api/auth";
import { useStore } from "@/store";

const router = useRouter();
const { addToast, setUser, setLoading: setStoreLoading } = useStore();

const InputPassword = Input.Password;
const TabPane = Tabs.TabPane;

const activeTab = ref("login");
const loading = ref(false);

const loginForm = ref({
  email: "",
  password: "",
});

const registerForm = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const validateConfirmPassword: Rule["validator"] = (_rule, value) => {
  if (value !== registerForm.value.password) {
    return Promise.reject("两次输入的密码不一致");
  }
  return Promise.resolve();
};

const handleLogin = async () => {
  loading.value = true;
  setStoreLoading(true);

  try {
    const result = await authService.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
    });

    setUser(result.user);
    addToast("success", "登录成功！");
    router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
    addToast("error", "登录失败，请检查邮箱和密码");
  } finally {
    loading.value = false;
    setStoreLoading(false);
  }
};

const handleRegister = async () => {
  loading.value = true;
  setStoreLoading(true);

  try {
    const result = await authService.register({
      name: registerForm.value.name,
      email: registerForm.value.email,
      password: registerForm.value.password,
    });

    setUser(result.user);
    addToast("success", "注册成功！");
    router.push("/");
  } catch (error) {
    console.error("Registration failed:", error);
    addToast("error", "注册失败，请稍后重试");
  } finally {
    loading.value = false;
    setStoreLoading(false);
  }
};

const skipLogin = () => {
  addToast("info", "已进入体验模式");
  router.push("/");
};
</script>
