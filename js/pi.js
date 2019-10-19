
class PiView {
    constructor(el, klass) {
        this.$el = el;

        this.$el.innerHTML = klass.template;
    }

    render() {
        return this.$el;
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

    createViews(element) {
        let viewsToCreate = [];

        for (let klass in this.classes) {
            let els = element.querySelectorAll(this.classes[klass].tag);

            els.forEach(el => {
                viewsToCreate.push({
                    el: el,
                    klass: this.classes[klass]
                });
            });
        }

        viewsToCreate.forEach(el => {
            let view = new PiView(el.el, el.klass);

            this.viewInstances.push(view);

            this.createViews(view.$el);
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

export default new PiJS();
