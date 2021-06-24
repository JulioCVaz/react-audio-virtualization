import reconciler from "react-reconciler";

const keyTypes = {
  createInstance: "color: #FFF; font-size: 18px; background: #F2542D;",
  prepareUpdate: "color: #FFF; background: #fc1303;",
  prepareForCommit: "color: #000; background: #fcf803;",
  commitUpdate: "color: #FFF; background: #0ea800;",
};

function traceWrap(hostConfig) {
  let traceWrappedHostConfig = {};
  Object.keys(hostConfig).forEach((key) => {
    const func = hostConfig[key];
    traceWrappedHostConfig[key] = (...args) => {
      //   if (keyTypes[key]) {
      //     console.groupCollapsed(`%c ${key}`, keyTypes[key]);
      //     console.trace(key);
      //     console.groupEnd();
      //   }
      console.groupCollapsed(`${key}`);
      console.trace(key);
      console.groupEnd();
      return func(...args);
    };
  });
  return traceWrappedHostConfig;
}

const rootHostContext = {};
const childHostContext = {};
const hostConfig = {
  now: Date.now, // optional?
  getRootHostContext: () => rootHostContext,
  getChildHostContext: () => childHostContext,
  getPublicInstance: (instance) => {
    return instance;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  removeChildFromContainer: () => {},
  shouldSetTextContent: (type, props) => {
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },
  createInstance: (
    type,
    newProps,
    rootContainerInstance,
    _currentHostContext,
    workInProgress
  ) => {
    const domElement = document.createElement(type);
    Object.keys(newProps).forEach((propName) => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (typeof propValue === "string" || typeof propValue === "number") {
          domElement.textContent = propValue;
        }
      } else if (propName === "onClick") {
        domElement.addEventListener("click", propValue);
      } else if (propName === "className") {
        domElement.setAttribute("class", propValue);
      } else if (propName === "onChange") {
        domElement.addEventListener("change", propValue);
      } else if (propName === "onKeyUp") {
        domElement.addEventListener("keyup", propValue);
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });

    return domElement;
  },
  createTextInstance: () => {},
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendChildToContainer: (parent, child) => {
    parent.appendChild(child);
  },
  finalizeInitialChildren: (domElement, type, props) => {},
  prepareUpdate(domElement, prevProps, nextProps) {
    return true;
  },
  commitUpdate: (domElement, updatePayload, type, oldProps, newProps) => {
    Object.keys(newProps).forEach((propName) => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (typeof propValue === "string" || typeof propValue === "number") {
          domElement.textContent = propValue;
        }
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });
  },
  commitTextUpdate: (textInstance, prevText, nextText) => {
    textInstance.text = nextText;
  },
  removeChild: (parentInstance, child) => {
    parentInstance.removeChild(child);
  },
  clearContainer: () => {},
  supportsPersistence: true,
  supportsMutation: true,
};

const ReactReconcilerInstance = reconciler(traceWrap(hostConfig));

export default {
  render: (reactElement, domElement, callback) => {
    // console.log(arguments);
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInstance.createContainer(
        domElement,
        false
      );
    }

    return ReactReconcilerInstance.updateContainer(
      reactElement,
      domElement._rootContainer,
      null,
      callback
    );
  },
};
