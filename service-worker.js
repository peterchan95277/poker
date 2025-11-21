<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2685.2">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 13.0px Courier; -webkit-text-stroke: #000000}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 13.0px Courier; -webkit-text-stroke: #000000; min-height: 16.0px}
    span.s1 {font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1">const CACHE_NAME = 'holdem-calculator-v1';</span></p>
<p class="p1"><span class="s1">const urlsToCache = [</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>'./index.html',</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>'./manifest.json',</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// 快取外部資源以實現離線功能</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>'[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)',</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>'[https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;display=swap)'</span></p>
<p class="p1"><span class="s1">];</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// 安裝 Service Worker 並快取必要資源</span></p>
<p class="p1"><span class="s1">self.addEventListener('install', (event) =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>event.waitUntil(</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>caches.open(CACHE_NAME)</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>.then((cache) =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>console.log('[Service Worker] Caching essential files');</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>return cache.addAll(urlsToCache);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>})</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>);</span></p>
<p class="p1"><span class="s1">});</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// 攔截網路請求，嘗試從快取中回應</span></p>
<p class="p1"><span class="s1">self.addEventListener('fetch', (event) =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>event.respondWith(</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>caches.match(event.request)</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>.then((response) =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>// 如果快取中有資源，則直接返回</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>if (response) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                    </span>return response;</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>// 否則，從網路獲取</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>return fetch(event.request);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>})</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>);</span></p>
<p class="p1"><span class="s1">});</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// 啟用 Service Worker 時，清理舊的快取版本</span></p>
<p class="p1"><span class="s1">self.addEventListener('activate', (event) =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const cacheWhitelist = [CACHE_NAME];</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>event.waitUntil(</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>caches.keys().then((cacheNames) =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>return Promise.all(</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>cacheNames.map((cacheName) =&gt; {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                    </span>if (cacheWhitelist.indexOf(cacheName) === -1) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                        </span>// 刪除不在白名單中的快取</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                        </span>console.log('[Service Worker] Clearing old cache:', cacheName);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                        </span>return caches.delete(cacheName);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                    </span>}</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>})</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>})</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>);</span></p>
<p class="p1"><span class="s1">});</span></p>
</body>
</html>
