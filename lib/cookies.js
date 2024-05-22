import { parse, serialize } from 'cookie';

const COOKIE_NAME = 'session_id';

export function parseCookies(req) {
    if (!req.headers.cookie) {
        return {};
    }
    return parse(req.headers.cookie);
}

export function setCookie(res, name, value, options = {}) {
    const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

    if ('maxAge' in options) {
        options.expires = new Date(Date.now() + options.maxAge);
        options.maxAge /= 1000;
    }

    res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
}

export function getSessionId(req, res) {
    const cookies = parseCookies(req);
    let sessionId = cookies[COOKIE_NAME];

    if (!sessionId) {
        sessionId = require('uuid').v4();
        setCookie(res, COOKIE_NAME, sessionId, { httpOnly: true, path: '/' });
    }

    return sessionId;
}
