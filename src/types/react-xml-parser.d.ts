declare module 'react-xml-parser' {
    interface XmlNode {
      name: string;
      value: string;
      attributes: { [key: string]: string };
      children: XmlNode[];
    }
  
    class XMLParser {
      parseFromString(xml: string): XmlNode;
    }
  
    export default XMLParser;
  }
  