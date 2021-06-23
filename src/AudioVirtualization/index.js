import reconciler from "react-reconciler";

function traceWrap(hostConfig) {
  let traceWrappedHostConfig = {};
  Object.keys(hostConfig).map((key) => {
    const func = hostConfig[key];
    traceWrappedHostConfig[key] = (...args) => {
      console.groupCollapsed(`${key} --->`);
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
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
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
    console.log([type, oldProps, newProps]);
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
  supportsMutation: true,
};

const ReactReconcilerInstance = reconciler(traceWrap(hostConfig));

export default {
  render: (reactElement, domElement, callback) => {
    // console.log(arguments);
    // create a root if doenst exists
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