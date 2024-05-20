export const makeOptions = (method, body) => {
    let opts = {
        method: method,
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
        },
    };
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
};