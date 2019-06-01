
class PiView {
    constructor(el, klass) {
        this.$el = el;

        this.template = klass.template;
    }

    render() {
        this.$el.innerHTML = this.template;
    }
}

class PiJS {
    constructor() {
        this.classes = {};
        this.viewInstances = [];
    }

    init(options) {
        this.$el = document.querySelector(options.el);

        for (let klass in this.classes) {
            let els = this.$el.querySelectorAll(this.classes[klass].tag);

            els.forEach(el => {
                this.viewInstances.push(
                    new PiView(el, this.classes[klass])
                );
            });
        }

        this.render();

        return this;
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
