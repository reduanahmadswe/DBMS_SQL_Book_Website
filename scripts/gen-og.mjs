// সোশ্যাল শেয়ারের ছবি (public/og-default.png, ১২০০×৬৩০) তৈরি করে।
// চালান: node scripts/gen-og.mjs
// লোকাল Chrome/Edge দিয়ে একটা HTML পাতার স্ক্রিনশট নেয়, তাই বাংলা যুক্তাক্ষর ঠিকঠাক আসে।
import { createServer } from 'vite';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import puppeteer from 'puppeteer-core';
import { existsSync, writeFileSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const CHROME = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((p) => p && existsSync(p));
if (!CHROME) throw new Error('Chrome/Edge পাওয়া যায়নি। CHROME_PATH সেট করুন।');

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { HeroScene } = await vite.ssrLoadModule('/src/components/characters/HeroScene.tsx');
const hero = renderToStaticMarkup(createElement(HeroScene));
await vite.close();

const font = (file) => pathToFileURL(join(process.cwd(), 'node_modules/@fontsource', file)).href;
const html = `<!doctype html><html lang="bn"><head><meta charset="utf-8"><style>
@font-face{font-family:H;font-weight:400;src:url(${font('hind-siliguri/files/hind-siliguri-bengali-400-normal.woff2')})}
@font-face{font-family:H;font-weight:700;src:url(${font('hind-siliguri/files/hind-siliguri-bengali-700-normal.woff2')})}
@font-face{font-family:H;font-weight:400;src:url(${font('hind-siliguri/files/hind-siliguri-latin-400-normal.woff2')});unicode-range:U+0000-00FF}
@font-face{font-family:H;font-weight:700;src:url(${font('hind-siliguri/files/hind-siliguri-latin-600-normal.woff2')});unicode-range:U+0000-00FF}
@font-face{font-family:T;src:url(${font('tiro-bangla/files/tiro-bangla-bengali-400-normal.woff2')})}
@font-face{font-family:T;src:url(${font('tiro-bangla/files/tiro-bangla-latin-400-normal.woff2')});unicode-range:U+0000-00FF}
:root{--font-display:T,H,serif;--font-body:H,sans-serif;--font-mono:monospace}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;position:relative;font-family:H,sans-serif;
 background:linear-gradient(135deg,#f5ecfd,#dff5f2)}
.b1{position:absolute;right:-90px;top:-220px;width:520px;height:520px;border-radius:50%;background:rgba(17,163,154,.12)}
.b2{position:absolute;left:-120px;bottom:-180px;width:480px;height:480px;border-radius:50%;background:rgba(110,20,169,.10)}
.tag{position:absolute;left:64px;top:62px;padding:8px 26px;border-radius:99px;background:#ffefb8;border:2px solid #e8c96a;font-weight:700;font-size:26px;color:#3b2a00}
h1{position:absolute;left:64px;top:128px;font-family:T,H,serif;font-weight:400;font-size:84px;line-height:1.2;color:#1b1330}
h1 span{color:#6e14a9;display:block;position:relative;width:max-content}
h1 span::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:11px;border-radius:6px;background:#ffc53d}
.sub{position:absolute;left:64px;top:372px;width:600px;font-size:32px;line-height:1.5;color:#473f5e}
.url{position:absolute;left:64px;top:508px;padding:12px 30px;border-radius:99px;color:#fff;font-weight:700;font-size:27px;
 background:linear-gradient(90deg,#6e14a9,#11a39a);font-family:H,sans-serif}
.hero{position:absolute;left:640px;top:66px;width:540px}
.hero svg{width:100%;height:auto;display:block}
</style></head><body>
<div class="b1"></div><div class="b2"></div>
<div class="tag">✦ বাংলায়, গল্পে গল্পে</div>
<h1>লেদুর ডাটাবেস<span>অভিযান</span></h1>
<p class="sub">গল্পে গল্পে DBMS আর SQL শেখার বাংলা সিরিজ</p>
<div class="url">ledur-database.bornosoft.bd</div>
<div class="hero">${hero}</div>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const file = join(dir, 'og.html');
writeFileSync(file, html);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: new URL('../public/og-default.png', import.meta.url).pathname.replace(/^\/(\w:)/, '$1'), type: 'png' });
await browser.close();
console.log('og-default.png তৈরি হয়েছে,', Math.round(readFileSync('public/og-default.png').length / 1024), 'KB');
