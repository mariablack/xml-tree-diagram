
import React, { useState } from 'react';
import  XMLParser   from 'react-xml-parser';
import Tree from 'react-d3-tree';
import { FileUpload } from 'primereact/fileupload';
import './XmlFileUploader.css'

interface Node {
  name: string;
  children?: Node[];
  attributes?: { [key: string]: string };
  value?: string;
}

const XmlFileUploader: React.FC = () => {
  const [treeData, setTreeData] = useState<Node | null>(null);

  const handleXmlFile = (event: any) => {
    const file = event.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const xml = e.target?.result as string;
        try {
          const parsedXml = new XMLParser().parseFromString(xml);
          setTreeData(convertToTreeData(parsedXml));
        } catch (error) {
          console.error("Failed to parse XML:", error);
          
        }
      };
        reader.readAsText(file);
     }
  }

    const convertToTreeData = (node: any): Node => {
     
      const treeNode: Node = {
        name: node.name,
      };

      if (Object.keys(node.attributes).length > 0) {
        treeNode.attributes = node.attributes;
      }
    
      if (node.value) {
        treeNode.value = node.value;
      }
    
      // Check if node has children
      //if it has call function again and add them to tree node
      if (node.children && node.children.length > 0) {
        treeNode.children = node.children.map(convertToTreeData);
      }
    
      return treeNode;
    };
    



  return (
    <div className="card">
      <FileUpload pt={{
          input: { "data-testid": "file-input"},
        }} 
        mode="basic" 
        accept=".xml"  
        onSelect={handleXmlFile} 
        chooseLabel="Choose a file to upload" 
      />
      {treeData && (
        <div style={{ width: '80em', height: '80em' }}>
          <Tree data={treeData} />
        </div>
      )}
    </div>
  );
};

export default XmlFileUploader;
