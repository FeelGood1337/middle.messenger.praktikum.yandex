"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Block = void 0;
var uuid_1 = require("uuid");
var EventBus_1 = require("../EventBus/EventBus");
var Block = /** @class */ (function () {
    function Block(tagName, props) {
        var _this = this;
        if (tagName === void 0) { tagName = 'div'; }
        if (props === void 0) { props = {}; }
        this._element = null;
        this._id = '';
        this.setProps = function (nextProps) {
            if (!nextProps) {
                return;
            }
            Object.assign(_this.props, nextProps);
        };
        var eventBus = new EventBus_1.EventBus();
        this._meta = {
            tagName: tagName,
            props: props
        };
        // Генерируем уникальный UUID V4
        this._id = (0, uuid_1.v4)();
        this.props = this._makePropsProxy(__assign(__assign({}, props), { __id: this._id }));
        this.eventBus = function () { return eventBus; };
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    Block.prototype._registerEvents = function (eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CMD, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    };
    Block.prototype._createResources = function () {
        var tagName = this._meta.tagName;
        this._element = this._createDocumentElement(tagName);
    };
    Block.prototype.init = function () {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    };
    Block.prototype._componentDidMount = function () {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    };
    Block.prototype.componentDidMount = function () { };
    Block.prototype.dispatchComponentDidMount = function () {
        this.eventBus().emit(Block.EVENTS.FLOW_CMD);
    };
    Block.prototype._componentDidUpdate = function (oldProps, newProps) {
        var response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    };
    Block.prototype.componentDidUpdate = function (oldProps, newProps) {
        console.log(oldProps);
        console.log(newProps);
        return true;
    };
    Object.defineProperty(Block.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Block.prototype._addEvents = function () {
        var _this = this;
        var _a = this.props.events, events = _a === void 0 ? {} : _a;
        Object.keys(events).forEach(function (eventName) {
            _this._element.addEventListener(eventName, events[eventName]);
        });
    };
    Block.prototype._render = function () {
        var block = this.render();
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу превращать в DOM-элементы и возвращать из compile DOM-ноду -
        // Удалить старые события через removeEventListener -
        this._element.innerHTML = block;
        // Навесить новые события через addEventListener +
        this._addEvents();
    };
    // Переопределяется пользователем. Необходимо вернуть разметку
    Block.prototype.render = function () { };
    Block.prototype.getContent = function () {
        return this.element;
    };
    Block.prototype._makePropsProxy = function (props) {
        var _this = this;
        var checkPrivateProp = function (prop) { return prop.startsWith('_'); };
        return new Proxy(props, {
            get: function (target, prop) {
                if (checkPrivateProp(prop)) {
                    throw new Error("Нет прав");
                }
                else {
                    var value = target[prop];
                    return (typeof value === 'function') ? value.bind(target) : value;
                }
            },
            set: function (target, prop, val) {
                if (checkPrivateProp(prop)) {
                    throw new Error("Нет прав");
                }
                else {
                    target[prop] = val;
                    _this.eventBus().emit(Block.EVENTS.FLOW_CDU, __assign({}, target), target);
                    return true;
                }
            },
            deleteProperty: function (target, prop) {
                if (checkPrivateProp(prop)) {
                    throw new Error("Нет прав");
                }
                else {
                    delete target[prop];
                    return true;
                }
            }
        });
    };
    Block.prototype._createDocumentElement = function (tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        var element = document.createElement(tagName);
        element.setAttribute('data-id', this._id);
        return element;
    };
    Block.prototype.show = function () {
        this.getContent().style.display = "block";
    };
    Block.prototype.hide = function () {
        this.getContent().style.display = "none";
    };
    Block.EVENTS = {
        INIT: 'init',
        FLOW_CMD: 'flow:component-did-mount',
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: 'flow:render'
    };
    return Block;
}());
exports.Block = Block;
//# sourceMappingURL=Block.js.map