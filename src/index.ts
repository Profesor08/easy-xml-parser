import { XmlNode } from "xmldoc";

// tslint:disable-next-line: no-var-requires
const xmldoc = require("xmldoc");

interface IJsonObject {
  [key: string]: any;
}

export const xmlToJson = (xmlString: string): any => {
  const document = new xmldoc.XmlDocument(xmlString);

  const parseNodeValue = (node: XmlNode) => {
    const nodeObj: IJsonObject = {};

    if (node.type === "element") {
      if (node.val.trim().length > 0) {
        nodeObj.text = node.val;
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

      return Object.assign({}, node.attr || {}, nodeObj);
    }

    return {};
  };

  const obj: IJsonObject = {};

  obj[document.name] = parseNodeValue(document);

  return obj;
};
