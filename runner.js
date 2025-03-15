import { BLOCKED_IP_RANGES } from './iplist.js';

export function isBrowserRequest(userAgent) {
    return userAgent && !/bot|crawl|slurp|spider|virus/i.test(userAgent);
}

export function ipToNumber(ip) {
    return ip.split('.').reduce((acc, part) => (acc << 8) + parseInt(part, 10), 0) >>> 0;
}

export function isIPBlocked(ipAddress) {
    const ipNum = ipToNumber(ipAddress);
    return BLOCKED_IP_RANGES.some(range => {
        const [rangeStart, rangeBits] = range.split('/');
        const rangeStartNum = ipToNumber(rangeStart);
        const mask = -1 << (32 - parseInt(rangeBits, 10));
        return (ipNum & mask) === (rangeStartNum & mask);
    });
}
  