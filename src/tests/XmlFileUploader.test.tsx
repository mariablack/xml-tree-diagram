import XmlFileUploader from '../components/XmlFileUploader';
import { render, screen, prettyDOM } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'

const validXml = `<?xml version="1.0" encoding="UTF-8"?>
      <xacml3:policy xmlns:xacml3="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17" policyid="access-document" rulecombiningalgid="urn:oasis:names:tc:xacml:3.0:rule-combining-algorithm:deny-unless-permit" version="1">
        <xacml3:description>This Policy controls access to documents and makes sure only those managers at Axiomatics with the right level of clearance can view them.</xacml3:description>
        <xacml3:policydefaults>
          <xacml3:xpathversion>http://www.w3.org/TR/1999/REC-xpath-19991116</xacml3:xpathversion>
        </xacml3:policydefaults>
        <xacml3:target>
          <xacml3:anyof>
            <xacml3:allof>
              <xacml3:match matchid="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                <xacml3:attributevalue datatype="http://www.w3.org/2001/XMLSchema#string">manager</xacml3:attributevalue>
                <xacml3:attributedesignator attributeid="urn:org:apache:tomcat:user-role" category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" datatype="http://www.w3.org/2001/XMLSchema#string" mustbepresent="false"></xacml3:attributedesignator>
              </xacml3:match>
              <xacml3:match matchid="urn:oasis:names:tc:xacml:3.0:function:string-equal-ignore-case">
                <xacml3:attributevalue datatype="http://www.w3.org/2001/XMLSchema#string">Axiomatics</xacml3:attributevalue>
                <xacml3:attributedesignator attributeid="company" category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" datatype="http://www.w3.org/2001/XMLSchema#string" mustbepresent="false"></xacml3:attributedesignator>
              </xacml3:match>
              <xacml3:match matchid="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                <xacml3:attributevalue datatype="http://www.w3.org/2001/XMLSchema#string">view</xacml3:attributevalue>
                <xacml3:attributedesignator attributeid="urn:oasis:names:tc:xacml:1.0:action:action-id" category="urn:oasis:names:tc:xacml:3.0:attribute-category:action" datatype="http://www.w3.org/2001/XMLSchema#string" mustbepresent="false"></xacml3:attributedesignator>
              </xacml3:match>
              <xacml3:match matchid="urn:oasis:names:tc:xacml:1.0:function:string-equal">
                <xacml3:attributevalue datatype="http://www.w3.org/2001/XMLSchema#string">document</xacml3:attributevalue>
                <xacml3:attributedesignator attributeid="urn:oasis:names:tc:xacml:1.0:resource:resource-id" category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" datatype="http://www.w3.org/2001/XMLSchema#string" mustbepresent="false"></xacml3:attributedesignator>
              </xacml3:match>
            </xacml3:allof>
          </xacml3:anyof>
        </xacml3:target>
        <xacml3:rule effect="Permit" ruleid="permit-if-clearance-ok">
          <xacml3:description>grant if the subject clearance is greater than the document classification</xacml3:description>
          <xacml3:target>
            <xacml3:condition>
              <xacml3:apply functionid="urn:oasis:names:tc:xacml:1.0:function:string-greater-than-or-equal">
                <xacml3:apply functionid="urn:oasis:names:tc:xacml:1.0:function:string-one-and-only">
                  <xacml3:attributedesignator attributeid="urn:org:apache:tomcat:user-attr:clearance" category="urn:oasis:names:tc:xacml:1.0:subject-category:access-subject" datatype="http://www.w3.org/2001/XMLSchema#string" mustbepresent="false"></xacml3:attributedesignator>
                </xacml3:apply>
                <xacml3:apply functionid="urn:oasis:names:tc:xacml:1.0:function:string-one-and-only">
                  <xacml3:attributedesignator attributeid="classification" category="urn:oasis:names:tc:xacml:3.0:attribute-category:resource" datatype="http://www.w3.org/2001/XMLSchema#string" mustbepresent="false"></xacml3:attributedesignator>
                </xacml3:apply>
              </xacml3:apply>
            </xacml3:condition>
          </xacml3:target>
        </xacml3:rule>
      </xacml3:policy>`;

const invalidXml = `<xacml3:policy xmlns:xacml3="urn:oasis:names:tc:xacml:3.0:core:schema:wd-17">`;

describe('XmlFileUploader', () => {
  window.URL.createObjectURL = jest.fn();

  afterEach(() => {
    (window.URL.createObjectURL as jest.Mock).mockReset();
  });

  it('should render FileUpload component', () => {
    render(<XmlFileUploader />);
    expect(screen.getByText('Choose a file to upload')).toBeInTheDocument();
  });

  it('should handle valid XML file upload and display parsed XML as tree', async () => {


    const file = new File([validXml], 'test.xml', { type: 'text/xml' });
    render(<XmlFileUploader />);

    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toBeInTheDocument();
    // console.log(prettyDOM(fileInput))

    await userEvent.upload(fileInput, file);

    screen.debug()

    // expect((fileInput as HTMLInputElement).files).toHaveLength(1);

    // await new Promise((r) => setTimeout(r, 2000));
    expect(await screen.findByText('xacml3:apply')).toBeInTheDocument();
  });
});
