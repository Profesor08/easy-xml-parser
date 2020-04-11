import { XmlDocument, XmlNode } from "xmldoc";

interface IJsonObject {
  [key: string]: any;
}

export const xmlToJson = (xmlString: string): any => {
  const document = new XmlDocument(xmlString);

  const parseType = (value: string): string | number | boolean | null => {
    const trimmedValue = value.trim().toLowerCase();

    if (trimmedValue === "null") {
      return null;
    }

    if (trimmedValue === "true") {
      return true;
    }

    if (trimmedValue === "false") {
      return false;
    }

    if (trimmedValue.match(/^\d+$/)) {
      return parseInt(trimmedValue, 10);
    }

    if (trimmedValue.match(/^\d+\.\d+$/)) {
      return parseFloat(trimmedValue);
    }

    return value;
  };

  const parseNodeValue = (node: XmlNode) => {
    const nodeObj: IJsonObject = {};

    if (node.type === "element") {
      if (node.val.trim().length > 0) {
        return node.val;
      }

      node.children.forEach((children) => {
        if (children.type === "element") {
          if (children.name in nodeObj) {
            if (Array.isArray(nodeObj[children.name]) === false) {
              nodeObj[children.name] = [nodeObj[children.name]];
            }
            nodeObj[children.name].push(parseNodeValue(children));
          } else {
            nodeObj[children.name] = parseNodeValue(children);
          }
        }
      });

      const attr: IJsonObject = {};

      if (node.attr) {
        Object.entries(node.attr).forEach(([key, value]) => {
          attr[key] = parseType(value);
        });
      }

      return Object.assign({}, attr, nodeObj);
    }

    return {};
  };

  const obj: IJsonObject = {};

  obj[document.name] = parseNodeValue(document);

  return obj;
};

// "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

type IObjectEntry = [string, any];

type IAttribute = [string, string];

interface INode {
  name: string;
  attr: IAttribute[];
  children: INode[];
}

const literalTypes = ["string", "number", "bigint", "boolean"];

export const jsonToXml = (obj: any): string => {
  function objEntries(entryObj: any) {
    return Object.entries<any>(entryObj).filter(
      ([key, value]) => typeof value !== "function" && typeof value !== "symbol",
    );
  }

  function escapeString(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function prepareEntries(entries: IObjectEntry[]) {
    return objEntries(entries).map(prepareEntry);
  }

  function prepareEntry([name, value]: IObjectEntry): string {
    const attr: IAttribute[] = [];
    const children: string[] = [];
    const type = typeof value;

    if (value === null || value === undefined) {
      return `<${name} />`;
    }

    if (literalTypes.includes(type)) {
      if (type === "string") {
        return `<${name}>${escapeString(value)}</${name}>`;
      } else {
        return `<${name}>${value}</${name}>`;
      }
    }

    if (Array.isArray(value)) {
      return value.map((val) => prepareEntry([name, val])).join("");
    }

    if (type === "object") {
      objEntries(value).forEach(([key, val]) => {
        if (literalTypes.includes(typeof val) || val === null || val === undefined) {
          attr.push([key, val + ""]);
        } else if (Array.isArray(val)) {
          val.forEach((v) => children.push(prepareEntry([key, v])));
        } else if (typeof val === "object") {
          // prepareEntries(val).forEach((str) => children.push(str));
          children.push(prepareEntry([key, val]));
        }
      });
    }

    const attributes = attr.map(([key, val]) => `${key}="${escapeString(val)}"`);

    if (children.length > 0) {
      return `<${[name, ...attributes].join(" ")}>${children.join("")}</${name}>`;
    } else {
      return `<${[name, ...attributes].join(" ")}/>`;
    }
  }

  return prepareEntries(obj).join("");
};
