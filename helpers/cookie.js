class Cookie {
    _readCookies() {
        const result = {},
            cookies = document.cookie ? document.cookie.split('; ') : [];

        for (let i = 0, l = cookies.length; i < l; i++) {
            const parts = cookies[i].split('='),
                name = this.decode(parts.shift());

            result[name] = this.decode(parts.join('='));
        }

        return result;
    }

    set(name, value, options = {}) {
        let str = `${this.encode(name)}=${this.encode(value)}`;

        if (value === null) options.maxage = -1;

        if (options.maxage) {
            options.expires = new Date(+new Date() + options.maxage);
        }

        if (options.path) str += `; path=${options.path}`;
        if (options.domain) str += `; domain=${options.domain}`;
        if (options.expires) str += `; expires=${options.expires.toUTCString()}`;
        if (options.secure) str += '; secure';

        document.cookie = str;
    }

    get(name) {
        const cookies = this._readCookies();
        return name ? cookies[name] : cookies;
    }

    remove(name, options = {}) {
        this.set(name, null, Object.assign({}, options, {expires: -1}));
    }

    encode(value) {
        try {
            let parsedValue;
            if (value && typeof value !== 'string') {
                parsedValue = JSON.stringify(value);
            }

            return encodeURIComponent(parsedValue || value);
        } catch (e) {
            return null;
        }
    }

    decode(value) {
        return decodeURIComponent(value);
    }
}

export default new Cookie;
