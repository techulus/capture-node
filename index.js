/**
 * @summary Capture Node SDK
 * @author Arjun Komath <arjunkomath@gmail.com>
 *
 * Created at     : 2017-11-19 13:53:04 
 * Last modified  : 2017-11-19 14:17:53
 */

'use strict';

const qs = require('qs');
const md5 = require('md5');
const API_URL = 'https://cdn.capture.techulus.in';

module.exports = function (key, secret) {
    return {
        buildImageUrl: (url, options) => {
            if (!key || !secret) {
                throw new Error('Key and Secret is required');
            }
            if (typeof url !== 'string') {
                throw new Error('url should be of type string (something like www.google.com)');
            }
            if (url === null) {
                throw new Error('url is required');
            }
            let query = '';
            if (options) {
                options = Object.assign({}, options, {
                    url: url
                });
                query = toQueryString(options);
            } else {
                options = {
                    url: url
                };
                query = toQueryString(options);
            }
            const token = generateToken(secret, query);
            return `${API_URL}/${key}/${token}/image?${query}`;
        },
        buildPdfUrl: (url, options) => {
            if (!key || !secret) {
                throw new Error('Key and Secret is required');
            }
            if (typeof url !== 'string') {
                throw new Error('url should be of type string (something like www.google.com)');
            }
            if (url === null) {
                throw new Error('url is required');
            }
            let query = '';
            if (options) {
                options = Object.assign({}, options, {
                    url: url
                });
                query = toQueryString(options);
            } else {
                options = {
                    url: url
                };
                query = toQueryString(options);
            }
            const token = generateToken(secret, query);
            return `${API_URL}/${key}/${token}/pdf?${query}`;
        }
    }
};

const generateToken = (secret, url) => {
    return md5(secret + url);
}

const toQueryString = options => {
    // console.log(options);
    const filterFunc = (key, value) => {
        // console.log('in filter', key, value);
        if (key === 'format') {
            return;
        }
        if (!value) {
            return;
        }
        return value;
    };
    const fixedEncodeURIComponent = (str) =>
        encodeURIComponent(str).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16))
    return qs.stringify(options, {
        encoder: fixedEncodeURIComponent,
        filter: filterFunc,
        arrayFormat: 'repeat'
    });
};