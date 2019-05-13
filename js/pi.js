
class PiJS {
    constructor() {
        this.classes = {};
        this.viewInstances = [];
    }

    init(options) {
        this.$el = document.querySelector(options.el);

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
        for (let klass in this.classes) {
            let els = this.$el.querySelectorAll(this.classes[klass].tag);

            els.forEach(el => {
                el.innerHTML = this.classes[klass].template;
            });
        }
    }
}

export default new PiJS();
