const fs = require('fs');
const path = require('path');

// 定义路由
const routes = {
  version: 3,
  basePath: "",
  redirects: [],
  rewrites: [],
  headers: [],
  dynamicRoutes: [
    {
      page: "/blog/[slug]",
      regex: "^/blog/([^/]+?)(?:/)?$",
      routeKeys: {
        slug: "slug"
      },
      namedRegex: "^/blog/(?<slug>[^/]+?)(?:/)?$"
    }
  ],
  staticRoutes: [
    {
      page: "/",
      regex: "^/(?:/)?$",
      routeKeys: {},
      namedRegex: "^/(?:/)?$"
    },
    {
      page: "/about",
      regex: "^/about(?:/)?$",
      routeKeys: {},
      namedRegex: "^/about(?:/)?$"
    },
    {
      page: "/blog",
      regex: "^/blog(?:/)?$",
      routeKeys: {},
      namedRegex: "^/blog(?:/)?$"
    },
    {
      page: "/friends",
      regex: "^/friends(?:/)?$",
      routeKeys: {},
      namedRegex: "^/friends(?:/)?$"
    }
  ],
  dataRoutes: []
};

// 输出目录
const outDir = path.join(process.cwd(), 'out');

// 确保输出目录存在
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 写入 routes-manifest.json 文件
fs.writeFileSync(
  path.join(outDir, 'routes-manifest.json'),
  JSON.stringify(routes, null, 2)
);

console.log('✅ routes-manifest.json 生成成功'); 