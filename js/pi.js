let count = 0;

class PiView {
    constructor(el, klass) {
        this.$el = el;
        this.klass = klass;
        this.$basicEl = this.$el.cloneNode(true);
        this.subviews = [];

        this.$el.innerHTML = this.template;

        pijs.createViews(this.$el, this);
    }

    render() {
        // this.$el.innerHTML = this.template;
        return this.$el;
    }

    addSubview(view, viewEl) {
        viewEl.addAttribute("pi-id", ++count);

        this.subviews.push({
            view: view,
            id: count
        });
    }
}

class PiJS {
    constructor() {
        this.classes = {};
        this.viewInstances = [];
    }

    init(options) {
        this.$el = document.querySelector(options.el);

        this.createViews(this.$el);

        this.render();

        return this;
    }

    createViews(element, parentView) {
        let viewsToCreate = [];

        for (let klass in this.classes) {
            let els = element.querySelectorAll(this.classes[klass].tagName);

            els.forEach(el => {
                viewsToCreate.push({
                    el: el,
                    klass: this.classes[klass]
                });
            });
        }

        viewsToCreate.forEach(el => {
            let view = new PiView(el.el, el.klass);

            if (parentView) {
                parentView.addSubview(view);
            } else {
                this.viewInstances.push(view);
            }

            this.createViews(view.$el, view);
        });
    }

    register(options) {
        if (this.classes[options.name]) {
            throw new Error(`Class ${options.name} has already been registered!`);
        }

        this.classes[options.name] = options;
    }

    render() {
        this.viewInstances.forEach(view => view.render());
    }
}

let pijs = new PiJS();

export default pijs;
