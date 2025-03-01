import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse, AxiosError } from 'axios'; // axiosnode_modules/axios/index.ts
import { Decrypt, Encrypt } from '../utils/encryption';
// import i18n from "i18next";
import { Button, notification, Space } from 'antd';
import store from '../store';
import i18n from '../lang/i18n';
import { addMessage } from './tool';

class HttpRequest {
    // ，axios
    constructor(public baseUrl: string) {
        // ，
        this.baseUrl = baseUrl;
    }
    public request(options: AxiosRequestConfig): AxiosPromise {
        // ，AxiosPromise
        const instance: AxiosInstance = axios.create(); // axios.createaxios，，
        options = this.mergeConfig(options); // ，url、
        this.interceptors(instance, options.url); // interceptors
        return instance(options); // AxiosPromise
    }
    private interceptors(instance: AxiosInstance, url?: string) {
        // 
        // 
        instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // config.headers.lang = 'en'
                if ((config.method === 'POST' || config.method === 'post') && config?.data?.Encrypt) {
                    config.data = Encrypt(JSON.stringify(config.data));
                }
                // config.data=Encrypt(JSON.stringify(config.data))
                // ，config，AxiosRequestConfig，
                // ， axios.defaults 
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        instance.interceptors.response.use(
            (res: AxiosResponse) => {
                const { data } = res; // resAxiosResponse<any>，，data
                if (data.code === 500) {
                    addMessage(data.msg);
                }
                // const { code, msg } = data // 、、
                if (typeof res.data === 'string') {
                    console.log(Decrypt(res.data as unknown as string));
                    const _data = Decrypt(res.data as unknown as string);
                    if (_data?.code === 500) {
                        addMessage(_data?.msg);
                    }

                    return Decrypt(res.data as unknown as string); // 
                } else {
                    return res.data;
                }
            },
            (error: AxiosError) => {
                const originalRequest = error.config;
                const statusCode = error.response?.status;
                // 403,203
                if (statusCode === 403 || statusCode === 203) {
                    window.location.href = '/';
                } else if (statusCode === 429) {
                    // 
                    notification.info({
                        key: '429',
                        message: 'You are doing that too often.',
                    });
                } else if (statusCode === 500) {
                    addMessage(error.response?.data?.msg);
                }
                // 
                return Promise.reject(error);
            }
        );
    }
    private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
        // 
        let state = store.getState();
        return Object.assign(
            {
                baseURL: this.baseUrl,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    token: state.token,
                    lang: i18n.language ? i18n.language : 'en',
                },
            },
            options
        );
    }
}
export default HttpRequest;
