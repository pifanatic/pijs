
class PiView {
    constructor(klass) {
        this.klass = klass;
        this.$el = document.createElement(klass.tagName);
        this.subviews = [];
        this._attributes = {};

        pijs._createViews(this.klass.template.cloneNode(true), this);

        if (this.klass.init) {
            this.klass.init.call(this);
        }

        this.render();
    }

    render() {
        let $template = this.klass.template.cloneNode(true);

        this._fillPlaceholders($template);

        this.subviews.forEach(subview => {
            let $destEl = $template.querySelectorAll(subview.view.klass.tagName)[subview.index];
            $destEl.replaceWith(subview.view.$el);
        });

        this.$el.innerHTML = "";
        while ($template.childNodes.length > 0) {
            this.$el.appendChild($template.childNodes[0]);
        }

        return this.$el;
    }

    addSubview(opts) {
        this.subviews.push(opts);
    }

    get(attribute) {
        return this._attributes[attribute];
    }

    set(attribute, value) {
        this._attributes[attribute] = value;

        this.render();
    }

    _fillPlaceholders($el) {
        let regex = /\{\{\s*(\w*)\s*\}\}/,
            match;

        while (match = $el.innerHTML.match(regex)) {
            $el.innerHTML = $el.innerHTML.replace(
                match[0],
                this.get(match[1])
            );
        }
    }
}

class PiJS {
    constructor() {
        this.classes = {};
    }

    init(options) {
        if (!options) {
            throw new Error("PiJS - Initialization failed: no options given!");
        }

        if (!options.el) {
            throw new Error("PiJS - Initialization failed: no anchor element given!");
        }

        this.$el = document.querySelector(options.el);

        if (!this.$el) {
            throw new Error(`PiJS - Initialization failed: anchor element '${options.el}' not in DOM`);
        }

        this.register({
            name: "__main__",
            template: this.$el.innerHTML,
            tagName: "__main__"
        });

        this.mainView = new PiView(this.classes["__main__"]);

        this.$el.innerHTML = "";
        while (this.mainView.$el.childNodes.length > 0) {
            this.$el.appendChild(this.mainView.$el.childNodes[0]);
        }

        return this;
    }

    _createViews($el, parentView) {
        let viewsToCreate = this._parseHTML($el);

        viewsToCreate.forEach(el => {
            let view = new PiView(el.klass);

            parentView.addSubview({
                view: view,
                index: el.index
            });
        });
    }

    _parseHTML($el) {
        let viewsToCreate = [];

        for (let klass in this.classes) {
            let els = $el.querySelectorAll(this.classes[klass].tagName);

            els.forEach((el, index) => {
                viewsToCreate.push({
                    el: el,
                    klass: this.classes[klass],
                    index: index
                });
            });
        }

        return viewsToCreate;
    }

    register(options) {
        let $templateEl;

        if (!options.name) {
            throw new Error("PiJS - No 'name' given in view registration!");
        }

        if (!options.tagName) {
            throw new Error("PiJS - No 'tagName' given in view registration!");
        }

        if (typeof options.template === "undefined") {
            throw new Error("PiJS - No 'template' given in view registration!");
        }

        if (this.classes[options.name]) {
            throw new Error(`PiJS - '${options.name}' has already been registered!`);
        }

        this.classes[options.name] = options;

        $templateEl = document.createElement(options.tagName);
        $templateEl.innerHTML = options.template;

        this.classes[options.name].template = $templateEl;
    }

    unregister(view) {
        delete this.classes[view];
    }

    _unregisterAll() {
        for (let c in this.classes) {
            this.unregister(c);
        }
    }
}

let pijs = new PiJS();

export default pijs;
