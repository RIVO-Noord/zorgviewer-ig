<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2">
  <sch:ns prefix="f" uri="http://hl7.org/fhir"/>
  <sch:ns prefix="h" uri="http://www.w3.org/1999/xhtml"/>
  <!-- 
    This file contains just the constraints for the profile nl-core-patient
    It includes the base constraints for the resource as well.
    Because of the way that schematrons and containment work, 
    you may need to use this schematron fragment to build a, 
    single schematron that validates contained resources (if you have any) 
  -->
  <sch:pattern>
    <sch:title>f:Patient</sch:title>
    <sch:rule context="f:Patient">
      <sch:assert test="count(f:extension[@url = 'http://fhir.nl/fhir/StructureDefinition/nl-core-preferred-pharmacy']) &lt;= 1">extension with URL = 'http://fhir.nl/fhir/StructureDefinition/nl-core-preferred-pharmacy': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'http://nictiz.nl/fhir/StructureDefinition/zib-patient-legalstatus']) &lt;= 2">extension with URL = 'http://nictiz.nl/fhir/StructureDefinition/zib-patient-legalstatus': maximum cardinality of 'extension' is 2</sch:assert>
      <sch:assert test="count(f:name) &gt;= 1">name: minimum cardinality of 'name' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Patient/f:extension</sch:title>
    <sch:rule context="f:Patient/f:extension">
      <sch:assert test="count(f:extension[@url = 'code']) &lt;= 1">extension with URL = 'code': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'period']) &lt;= 1">extension with URL = 'period': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Patient/f:extension/f:value[x] 1</sch:title>
    <sch:rule context="f:Patient/f:extension/f:value[x]">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:coding) &gt;= 1">coding: minimum cardinality of 'coding' is 1</sch:assert>
      <sch:assert test="count(f:text) &lt;= 1">text: maximum cardinality of 'text' is 1</sch:assert>
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:coding) &gt;= 1">coding: minimum cardinality of 'coding' is 1</sch:assert>
      <sch:assert test="count(f:coding) &lt;= 1">coding: maximum cardinality of 'coding' is 1</sch:assert>
      <sch:assert test="count(f:text) &lt;= 1">text: maximum cardinality of 'text' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Patient/f:extension/f:value[x]/f:coding 1</sch:title>
    <sch:rule context="f:Patient/f:extension/f:value[x]/f:coding">
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:system) &gt;= 1">system: minimum cardinality of 'system' is 1</sch:assert>
      <sch:assert test="count(f:system) &lt;= 1">system: maximum cardinality of 'system' is 1</sch:assert>
      <sch:assert test="count(f:version) &lt;= 1">version: maximum cardinality of 'version' is 1</sch:assert>
      <sch:assert test="count(f:code) &gt;= 1">code: minimum cardinality of 'code' is 1</sch:assert>
      <sch:assert test="count(f:code) &lt;= 1">code: maximum cardinality of 'code' is 1</sch:assert>
      <sch:assert test="count(f:display) &lt;= 1">display: maximum cardinality of 'display' is 1</sch:assert>
      <sch:assert test="count(f:userSelected) &lt;= 1">userSelected: maximum cardinality of 'userSelected' is 1</sch:assert>
      <sch:assert test="count(f:id) &lt;= 1">id: maximum cardinality of 'id' is 1</sch:assert>
      <sch:assert test="count(f:system) &gt;= 1">system: minimum cardinality of 'system' is 1</sch:assert>
      <sch:assert test="count(f:system) &lt;= 1">system: maximum cardinality of 'system' is 1</sch:assert>
      <sch:assert test="count(f:version) &lt;= 1">version: maximum cardinality of 'version' is 1</sch:assert>
      <sch:assert test="count(f:code) &gt;= 1">code: minimum cardinality of 'code' is 1</sch:assert>
      <sch:assert test="count(f:code) &lt;= 1">code: maximum cardinality of 'code' is 1</sch:assert>
      <sch:assert test="count(f:display) &lt;= 1">display: maximum cardinality of 'display' is 1</sch:assert>
      <sch:assert test="count(f:userSelected) &lt;= 1">userSelected: maximum cardinality of 'userSelected' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Patient/f:name/f:family</sch:title>
    <sch:rule context="f:Patient/f:name/f:family">
      <sch:assert test="count(f:extension[@url = 'http://hl7.org/fhir/StructureDefinition/humanname-own-prefix']) &lt;= 1">extension with URL = 'http://hl7.org/fhir/StructureDefinition/humanname-own-prefix': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'http://hl7.org/fhir/StructureDefinition/humanname-own-name']) &lt;= 1">extension with URL = 'http://hl7.org/fhir/StructureDefinition/humanname-own-name': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'http://hl7.org/fhir/StructureDefinition/humanname-partner-prefix']) &lt;= 1">extension with URL = 'http://hl7.org/fhir/StructureDefinition/humanname-partner-prefix': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'http://hl7.org/fhir/StructureDefinition/humanname-partner-name']) &lt;= 1">extension with URL = 'http://hl7.org/fhir/StructureDefinition/humanname-partner-name': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Patient/f:name/f:given</sch:title>
    <sch:rule context="f:Patient/f:name/f:given">
      <sch:assert test="count(f:extension[@url = 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier']) &lt;= 1">extension with URL = 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Patient/f:gender</sch:title>
    <sch:rule context="f:Patient/f:gender">
      <sch:assert test="count(f:extension[@url = 'http://nictiz.nl/fhir/StructureDefinition/code-specification']) &lt;= 1">extension with URL = 'http://nictiz.nl/fhir/StructureDefinition/code-specification': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Patient/f:contact/f:name/f:family</sch:title>
    <sch:rule context="f:Patient/f:contact/f:name/f:family">
      <sch:assert test="count(f:extension[@url = 'http://hl7.org/fhir/StructureDefinition/humanname-own-prefix']) &lt;= 1">extension with URL = 'http://hl7.org/fhir/StructureDefinition/humanname-own-prefix': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'http://hl7.org/fhir/StructureDefinition/humanname-own-name']) &lt;= 1">extension with URL = 'http://hl7.org/fhir/StructureDefinition/humanname-own-name': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'http://hl7.org/fhir/StructureDefinition/humanname-partner-prefix']) &lt;= 1">extension with URL = 'http://hl7.org/fhir/StructureDefinition/humanname-partner-prefix': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'http://hl7.org/fhir/StructureDefinition/humanname-partner-name']) &lt;= 1">extension with URL = 'http://hl7.org/fhir/StructureDefinition/humanname-partner-name': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Patient/f:contact/f:name/f:given</sch:title>
    <sch:rule context="f:Patient/f:contact/f:name/f:given">
      <sch:assert test="count(f:extension[@url = 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier']) &lt;= 1">extension with URL = 'http://hl7.org/fhir/StructureDefinition/iso21090-EN-qualifier': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Patient/f:communication/f:extension</sch:title>
    <sch:rule context="f:Patient/f:communication/f:extension">
      <sch:assert test="count(f:extension[@url = 'type']) &gt;= 1">extension with URL = 'type': minimum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'type']) &lt;= 1">extension with URL = 'type': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'level']) &gt;= 1">extension with URL = 'level': minimum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'level']) &lt;= 1">extension with URL = 'level': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Patient/f:generalPractitioner</sch:title>
    <sch:rule context="f:Patient/f:generalPractitioner">
      <sch:assert test="count(f:extension[@url = 'http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference']) &lt;= 1">extension with URL = 'http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
</sch:schema>
