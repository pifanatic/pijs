
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

        this._processIf($template);

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
        if (typeof attribute === "object") {
            Object.assign(this._attributes, attribute);
        } else {
            this._attributes[attribute] = value;
        }

        this.render();
    }

    _processIf($el) {
        let el;

        while (el = $el.querySelector("[pi-if]")) {
            let attr = el.getAttribute("pi-if"),
                negated = false,
                negationMatch = attr.match(/^!(.*)$/);

            if (negationMatch) {
                attr = negationMatch[1];
                negated = true;
            }

            if (this.get(attr) && !negated || !this.get(attr) && negated) {
                el.removeAttribute("pi-if");
            } else {
                el.remove();
            }
        };
    }

    _fillPlaceholders($el) {
        let regex = /\{\{(.*?)\}\}/,
            match;

        while (match = $el.innerHTML.match(regex)) {
            let outerMatch = match[0],
                innerMatch = match[1],
                _f = new Function(`return ${innerMatch};`);

            $el.innerHTML = $el.innerHTML.replace(
                outerMatch,
                _f.call(this)
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

        viewsToCreate.forEach(viewToCreate => {
            let view = new PiView(viewToCreate.klass);

            parentView.addSubview({
                view: view,
                index: viewToCreate.index
            });
        });
    }

    _parseHTML($el) {
        let viewsToCreate = [];

        for (let klass in this.classes) {
            let els = $el.querySelectorAll(this.classes[klass].tagName);

            els.forEach((el, index) => {
                viewsToCreate.push({
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
