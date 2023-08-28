export class Vector {
    values = new Array(15);
    constructor(...values) {
        this.set(...values);
        for (var i = 0; i < this.values.length; i++) {
            this[i] = this.values[i];
        }
        // this.proxy = new Proxy(this, {
        //     get(target, prop) {
        //         if (target[prop]) return target[prop]
        //         if (!isNaN(prop.toString())) return target.values[prop]
        //         return prop.split("").map(p => {
        //             return target[p] || 0
        //         })
        //     },
        //     set(target, prop, value) {
        //         if (target[prop]) target[prop] = value;
        //         else if (!isNaN(prop.toString())) target.values[prop] = value;
        //         else prop.split("").forEach((p, i) => {
        //             target[p] = value[i] || 0
        //         })
        //     }
        // })
        // return this.proxy
    }

    [Symbol.iterator]() {
        var index = -1;
        var data = this.values;

        return {
            next: () => ({ value: data[++index], done: !(index in data) })
        };
    };
    set(...values) {
        this.values = (values ||[]).map(v=>parseFloat(v))
    }
    //Getters and Setters for x and r
    get x() {
        return this.values[0];
    }
    get r() {
        return this.x;
    }
    get 0() {
        return this.x;
    }

    set x(val) {
        this.values[0] = val;
    }
    set r(val) {
        this.x = val;
    }
    set 0(val) {
        this.x = val;
    }



    //Getters and Setters for y and g
    get y() {
        return this.values[1];
    }
    get g() {
        return this.y
    }
    get 1() {
        return this.y
    }

    set y(val) {
        this.values[1] = val
    }
    set g(val) {
        this.y = val;
    }
    set 1(val) {
        this.y = val;
    }


    //Getters and setters for z and b
    get z() {
        return this.values[2]
    }
    get b() {
        return this.z
    }
    get 2() {
        return this.z
    }

    set z(val) {
        this.values[2] = val;
    }
    set b(val) {
        this.z = val;
    }
    set 2(val) {
        this.z = val;
    }


    //Getters and setters for w and a
    get w() {
        return this.values[3];
    }
    get a() {
        return this.w;
    }
    get 3() {
        return history.w
    }

    set w(val) {
        this.values[3] = val
    }
    set a(val) {
        this.w = val
    }
    set 3(val) {
        this.w = val;
    }


    get size() {
        return this.values.length;
    }

    get length() {
        return Math.sqrt(this.reduce((val, current) => val + current * current, 0))
    }

    sub(vec) {
        if ( typeof vec =="number") vec = new Vector(vec);
        vec.forEach((_, index) => {
            this.values[index] -=  vec.values[index]
        })
        return this
    }

    add(vec) {
        if ( typeof vec =="number") vec = new Vector(vec);
        vec.forEach((_, index) => {
            this.values[index] +=  vec.values[index]
        })
        return this
    }

    mul(vec) {
        if ( typeof vec =="number") vec = new Vector(vec);
        vec.forEach((_, index) => {
            this.values[index] *=  vec.values[index]
        })
        return this
    }


    div(vec) {
        if ( typeof vec =="number") vec = new Vector(vec);
        vec.forEach((_, index) => {
            this.values[index] /= vec.values[index]
        })
        return this
    }


    dot(vec) {
        return this.map((_, i) => this[i] * vec[i]).reduce((m, n) => m + n);
    }

    cross(vec) {
        var result = [];
        const x = this.y * vec.z - this.z * vec.y
        const y = this.z * vec.x - this.x * vec.z
        const z = this.x * vec.y - this.y * vec.x
        return new Vector(x, y, z);
    }

    normalize() {
        this.forEach((value, index) => {
            this.values[index] = value / this.length;
        })
    }

    rotateX(b, rad, out) {
        out = out || this;
        const a = this.clone()
        var p = [],
            r = []; //Translate point to the origin

        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2]; //perform rotation

        r[0] = p[0];
        r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
        r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

        out.values[0] = r[0] + b[0];
        out.values[1] = r[1] + b[1];
        out.values[2] = r[2] + b[2];
        return out;
    }

    rotateY(b, rad, out) {
        out = out || this
        const a = this.clone()
        var p = [],
            r = []; //Translate point to the origin

        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2]; //perform rotation

        r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
        r[1] = p[1];
        r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

        out.values[0] = r[0] + b[0];
        out.values[1] = r[1] + b[1];
        out.values[2] = r[2] + b[2];
        return out;
    }

    rotateZ(b, rad, out) {
        out = out || this
        const a = this.clone()
        var p = [],
            r = []; //Translate point to the origin

        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2]; //perform rotation

        r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
        r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
        r[2] = p[2]; //translate to correct position

        out.values[0] = r[0] + b[0];
        out.values[1] = r[1] + b[1];
        out.values[2] = r[2] + b[2];
        return out;
    }

    forEach(func) {
        this.values.forEach(func);
    }

    map(func) {
        return this.values.map(func);
    }

    filter(func) {
        return this.values.filter(func);
    }

    reduce(func, init) {
        return this.values.reduce(func, init);
    }

    clone() {
        return new Vector(...this.values)
    }

    static clone(vec1) {
        return vec1.clone()
    }

    static add(a, b, out) {
        out = out || a.clone();
        return out.add(b)
    }

    static sub(a, b, out) {
        out = out || a.clone();
        return out.sub(b)
    }


    static mul(a, b, out) {
        out = out || a.clone();
        return out.mul(b)
    }


    static div(a, b, out) {
        out = out || a.clone();
        return out.div(b)
    }


    static add(a, b, out) {
        out = out || a.clone();
        return out.add(b)
    }

    static normalize(vec) {
        const new_vec = new Vector()
        for (var i = 0; i < vec.size; i++) {
            new_vec.values[i] = vec[i] / vec.length;
        }
        return new_vec
    }

    static dot(a, b) {
        return a.dot(b);
    }

    static cross(a, b) {
        return a.cross(b)
    }

    static rotateX(vec, a, rad, out) {
        out = out || vec.clone();
        out.rotateX(a, rad)
        return out;
    }


    static rotateY(vec, a, rad, out) {
        out = out || vec.clone();
        out.rotateY(a, rad)
        return out;
    }


    static rotateZ(vec, a, rad, out) {
        out = out || vec.clone();
        out.rotateZ(a, rad)
        return out;
    }

}

export class Vec2 extends Vector {
    constructor(x, y) {
        x = x || 0;
        y = y || 0;
        super(x, y)
    }
}

export class Vec3 extends Vector {
    constructor(x, y, z) {
        x = x || 0;
        y = y || 0;
        z = z || 0;
        super(x, y, z)
    }
}

export class Vec4 extends Vector {
    constructor(x, y, z, w) {
        x = x || 0;
        y = y || 0;
        z = z || 0;
        w = w || 0;
        super(x, y, z, w);
    }
}