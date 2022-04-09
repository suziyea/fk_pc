// https://umijs.org/config/
import { defineConfig } from "umi";

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    "react-dev-inspector/plugins/umi/react-inspector",
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    API_SERVER: "https://api.shcwwl.cn", // 接口服务地址
  },
});
