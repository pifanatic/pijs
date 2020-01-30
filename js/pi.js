
class PiView {
    constructor(el, klass) {
        this.$el = el;
        this.klass = klass;
        this.subviews = [];
        this._attributes = {};

        pijs._createViews(this.klass.template, this);
    }

    render() {
        this.$el = this.klass.template.cloneNode(true);

        this._fillPlaceholders();

        this.subviews.forEach(subview => {
            let $destEl = this.$el.querySelectorAll(`${subview.view.klass.tagName}`)[subview.index];
            $destEl.replaceWith(subview.view.render());
        });

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
    }

    _fillPlaceholders() {
        let regex = /\{\{\s*(\w*)\s*\}\}/,
            match;

        while (match = this.$el.innerHTML.match(regex)) {
            this.$el.innerHTML = this.$el.innerHTML.replace(
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
        this.$el = document.querySelector(options.el);

        this.startView = new PiView(this.$el, this.classes[options.startView]);

        this.render();

        return this;
    }

    _createViews($el, parentView) {
        let viewsToCreate = this._parseHTML($el);

        viewsToCreate.forEach((el, index) => {
            let view = new PiView(el.el, el.klass);

            parentView.addSubview({
                view: view,
                index: index
            });

            this._createViews(view.$el, view);
        });
    }

    _parseHTML($el) {
        let viewsToCreate = [];

        for (let klass in this.classes) {
            let els = $el.querySelectorAll(this.classes[klass].tagName);

            els.forEach(el => {
                viewsToCreate.push({
                    el: el,
                    klass: this.classes[klass]
                });
            });
        }

        return viewsToCreate;
    }

    register(options) {
        let $templateEl;

        if (this.classes[options.name]) {
            throw new Error(`Class ${options.name} has already been registered!`);
        }

        this.classes[options.name] = options;

        $templateEl = document.createElement(options.tagName);
        $templateEl.innerHTML = options.template;

        this.classes[options.name].template = $templateEl;
    }

    render() {
        this.$el.append(this.startView.render());
    }
}

let pijs = new PiJS();

export default pijs;
