(function () {
    // اگر کوڈ پہلے سے چل چکا ہو تو دوبارہ نہ چلے
    if (window.__islamicBrowserInjected) return;
    window.__islamicBrowserInjected = true;

    // 1. گوگل فونٹس (Noto Nastaliq Urdu) لوڈ کرنا
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap';
    document.head.appendChild(fontLink);

    // 2. جدید اسلامی تھیم اور ایڈز ہٹانے کی CSS
    const customCSS = `
        /* پیج کا بنیادی بیک گراؤنڈ اور فونٹ */
        body, html {
            background-color: #F8FAFC !important;
            color: #1E293B !important;
            font-family: 'Noto Nastaliq Urdu', system-ui, -apple-system, sans-serif !important;
        }

        /* گوگل کے اپنے اشتہارات (Sponsored Ads) اور ایپ پروموشنز چھپانا */
        #tads, #tadsb, #bottomads,
        [data-text-ad], .uEierd, .commercial-unit-mobile-top,
        .mobile-promo, [aria-label="Ads"], [aria-label="Sponsored"],
        div[data-hveid] > div > span:contains("Sponsored"),
        #gb, .gb_Pa, .mlo-c, .n692Zd {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            overflow: hidden !important;
        }

        /* گوگل کا لوگو چھپانا (تاکہ آپ کے براؤزر کا اپنا انداز لگے) */
        #hplogo, .lnXdpd, a[aria-label="Google"], .logocont, #logo {
            display: none !important;
        }

        /* سرچ بار کو جدید اور گول (Emerald Border) بنانا */
        form[role="search"] > div, .RNNXgb, .A8SBwf {
            border-radius: 24px !important;
            border: 1.5px solid #0B4F3A !important;
            background: #FFFFFF !important;
            box-shadow: 0 2px 8px rgba(11, 79, 58, 0.08) !important;
        }

        /* ہر سرچ رزلٹ کو ایک خوبصورت کارڈ کی شکل دینا */
        #rso > div, .MjjYud, .mnr-c {
            background-color: #FFFFFF !important;
            border-radius: 14px !important;
            padding: 12px 14px !important;
            margin-bottom: 12px !important;
            border: 1px solid #E2E8F0 !important;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03) !important;
        }

        /* لنکس (ہیڈنگز) کا رنگ اسلامی سبز (Emerald Green) */
        a h3, .LC20lb, .DKV0Md, a .MBeuO {
            color: #0B4F3A !important;
            font-weight: 700 !important;
            line-height: 1.7 !important;
        }

        /* وزٹ کیے ہوئے لنکس کا رنگ */
        a:visited h3, a:visited .LC20lb {
            color: #10B981 !important;
        }

        /* تفصیل (Description) کا رنگ اور صفائی */
        .VwiC3b, .yXK7lf, .MUxGbd {
            color: #475569 !important;
            line-height: 1.8 !important;
        }

        /* ٹاپ محفوظ سرچ بیج (Custom Header Badge) */
        #ib-safe-banner {
            background: linear-gradient(90deg, #0B4F3A, #10B981);
            color: #FFFFFF;
            text-align: center;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 0.3px;
            border-radius: 0 0 12px 12px;
            margin-bottom: 8px;
            box-shadow: 0 2px 6px rgba(11, 79, 58, 0.15);
            direction: rtl;
        }

        /* پردہ / بلر موڈ (Parda Mode) */
        body.parda-mode-active img,
        body.parda-mode-active video,
        body.parda-mode-active g-img {
            filter: blur(18px) !important;
            transition: filter 0.3s ease !important;
            cursor: pointer !important;
        }
        body.parda-mode-active img.parda-revealed,
        body.parda-mode-active video.parda-revealed {
            filter: none !important;
        }
    `;

    const styleEl = document.createElement('style');
    styleEl.type = 'text/css';
    styleEl.innerHTML = customCSS;
    document.head.appendChild(styleEl);

    // 3. اوپر محفوظ اسلامی سرچ کا خوبصورت بار شامل کرنا (صرف گوگل سرچ پر)
    if (window.location.hostname.includes('google.') && !document.getElementById('ib-safe-banner')) {
        const banner = document.createElement('div');
        banner.id = 'ib-safe-banner';
        banner.innerHTML = '🛡️ مدنی محفوظ سرچ — گندے اشتہارات سے پاک';
        document.body.insertBefore(banner, document.body.firstChild);
    }

    // 4. اسپانسرڈ ایڈز کو ڈائنامک طریقے سے ہٹانا (اگر اسکرول کرنے پر نئے آئیں)
    function removeSponsoredBlocks() {
        const spans = document.querySelectorAll('span, div');
        spans.forEach(el => {
            if (el.childNodes.length === 1 && el.textContent &&
                (el.textContent.trim() === 'Sponsored' || el.textContent.trim() === 'اسپانسرڈ' || el.textContent.trim() === 'Ad')) {
                const parentCard = el.closest('.uEierd, .mnr-c, .MjjYud, [data-hveid]');
                if (parentCard) parentCard.style.display = 'none';
            }
        });
    }

    removeSponsoredBlocks();
    const observer = new MutationObserver(removeSponsoredBlocks);
    observer.observe(document.body, { childList: true, subtree: true });

    // 5. بلر / پردہ موڈ آن یا آف کرنے کا فنکشن (Android ایپ سے کنٹرول ہوگا)
    window.togglePardaMode = function (enable) {
        if (enable) {
            document.body.classList.add('parda-mode-active');
        } else {
            document.body.classList.remove('parda-mode-active');
        }
    };

    // اگر پردہ موڈ آن ہو تو کسی بھی تصویر پر کلک کر کے صرف اس ایک تصویر کو صاف دیکھنا
    document.addEventListener('click', function (e) {
        if (document.body.classList.contains('parda-mode-active')) {
            if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
                e.preventDefault();
                e.stopPropagation();
                e.target.classList.toggle('parda-revealed');
            }
        }
    }, true);
})();
