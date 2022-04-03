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
    API_SERVER: "http://47.103.96.51", // 接口服务地址
  },
});
