import {
  getValueOrDefault,
  isNullOrUndefinedOrEmpty,
  randomString
} from './utils.js';
import {callers} from './callers.js'; 


const randstring ='0123456789abcdefghijklmnopqrstuvwxyz';

export default {
  async fetch(request, env, ctx, newUrl) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const words = pathname.split(callers[1]);
    const words_get = getValueOrDefault(() => atob(words[1]), words[1]);
    const basedata = getValueOrDefault(() => atob(words_get), words_get);
     if (isNullOrUndefinedOrEmpty(basedata)) {
        return new Response('Not Found', { status: 404 });
    }
    const domains = basedata.split(callers[0])[5];
    const domainsname = domains.split(".")[0];

    
    if(newUrl.includes("workers")){
      const redirectUrl = `${newUrl}${randomString(20, randstring)}/${randomString(13, randstring)}${callers[2]}${btoa(words_get)}`;
      if (!redirectUrl) {
        return new Response('Bad', { status: 400 });
      } 
      return Response.redirect(redirectUrl);

  }else{
    const redirectUrl = `https://${domainsname}-${randomString(14, randstring)}${newUrl}${randomString(20, randstring)}/${randomString(13, randstring)}${callers[2]}${btoa(words_get)}`;
    if (!redirectUrl) {
      return new Response('Bad', { status: 400 });
    } 
    return Response.redirect(redirectUrl);

  }
    

  return new Response('Bad', { status: 400 });

  },
};  