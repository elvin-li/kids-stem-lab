# 开放数据源（已于 2026-07 验证 CORS: *，可在 file:// 下直接 fetch）

| 用途 | Endpoint | 说明 |
|---|---|---|
| 恐龙化石 | `https://paleobiodb.org/data1.2/occs/list.json?base_name=<名>&show=coords,attr&vocab=pbdb&limit=N` | 字段：accepted_name / max_ma / min_ma / early_interval / lat / lng。**必须带 `vocab=pbdb`** 才有可读字段名 |
| 恐龙分类树 | `https://paleobiodb.org/data1.2/taxa/list.json?base_name=Dinosauria&rank=family&vocab=pbdb&limit=N` | |
| 物种（昆虫/海洋/通用） | `https://api.inaturalist.org/v1/taxa?q=<名>&per_page=N` | 有 default_photo.medium_url（可直接显示）、wikipedia_summary、preferred_common_name |
| 物种分类 | `https://api.gbif.org/v1/species/search?q=<名>&limit=N` | |
| 海洋生物分布 | `https://api.obis.org/v3/taxon/<属名>` | |
| 地震（实时） | `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=N&minmagnitude=M&starttime=YYYY-MM-DD` | GeoJSON，properties.mag / place / time，geometry.coordinates=[lng,lat,depth_km] |
| NASA 每日天文图 | `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY` | media_type 可能是 image **或 video**，两种都要处理 |
| NASA 图像库 | `https://images-api.nasa.gov/search?q=<名>&media_type=image&page_size=N` | 无需 key，links[0].href 是缩略图 |

## 硬性要求
1. **必须先降级再联网**：页面内置一份 hardcoded 的样例数据，先渲染出完整内容；fetch 成功后再替换/追加。断网、超时、被限流时页面必须依然完整可读、可玩。
2. fetch 一律加 `AbortController` + 8 秒超时 + try/catch。失败时在角落显示一行「离线模式 · 显示内置数据」，不要弹错误、不要留空白。
3. DEMO_KEY 有速率限制，NASA 结果用 localStorage 按日期缓存。
4. 不要在 UI 上写「实时数据」这种绝对说法，写「数据来自 X，可能因网络不可用」。
5. 图片一律 `loading="lazy"` + `onerror` 兜底占位，绝不出现碎图标。
6. 数据来源与授权必须在页脚写清楚（PaleobioDB / iNaturalist / GBIF / OBIS / USGS / NASA）。
