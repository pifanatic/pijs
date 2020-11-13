import Utils from "./utils.js";
import PiJS  from "./pi.js";

export default class PiView {
    constructor(klass) {
        this.klass = klass;
        this.$el = document.createElement(klass.tagName);
        this.subviews = [];
        this._attributes = {};

        PiJS._createViews(this.klass.template.cloneNode(true), this);

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
                _f = new Function(`return ${attr};`);

            if (_f.call(this)) {
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
                Utils.escape(_f.call(this))
            );
        }
    }
}
