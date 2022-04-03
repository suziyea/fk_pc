/* eslint-disable no-unused-vars */
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/** ajax 请求模块 */
declare namespace MyHttp {
    /** 请求配置 */
    interface RequestConfig extends AxiosRequestConfig {
        /** 默认false,接口出错时，框架会自动弹出提示；该选项设置为true后，框架将不再弹出提示，由业务自行处理错误消息
         * (注意： axios 0.19.0 的版本有bug,自定义配置将不会生效)
         */
        silence?: boolean;
        /**
         * 请求时是否显示加载器,默认false
         */
        loading?: boolean;
    }

    interface Response<T = any> extends AxiosResponse {
        data: ServerResponseJSON<T>;
        config: RequestConfig;
    }

    /** 请求接口数据响应的文本数据结构 */
    interface ServerResponseJSON<T = any> {
        code: number;
        /** 提示信息 */
        msg: string;
        /** 服务器返回的业务数据,出错时不返回data */
        data: T;
    }

    /** 请求函数实例 */
    interface RequestInstance {
        <T = any, R = Promise<T>>(config: RequestConfig): R;
    }

    interface Error extends AxiosError {
        config: RequestConfig;
    }
}
export default MyHttp;
