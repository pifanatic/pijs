import PiView from "./piview.js";

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

export default new PiJS();
