
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
        for (let klass in this.classes) {
            let els = element.querySelectorAll(this.classes[klass].tag);

            els.forEach(el => {
                this.viewInstances.push(
                    new PiView(el, this.classes[klass])
                );
            });
        }
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
