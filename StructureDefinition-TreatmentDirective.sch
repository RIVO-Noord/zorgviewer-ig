<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron" queryBinding="xslt2">
  <sch:ns prefix="f" uri="http://hl7.org/fhir"/>
  <sch:ns prefix="h" uri="http://www.w3.org/1999/xhtml"/>
  <!-- 
    This file contains just the constraints for the profile Zib TreatmentDirective
    It includes the base constraints for the resource as well.
    Because of the way that schematrons and containment work, 
    you may need to use this schematron fragment to build a, 
    single schematron that validates contained resources (if you have any) 
  -->
  <sch:pattern>
    <sch:title>f:Consent</sch:title>
    <sch:rule context="f:Consent">
      <sch:assert test="count(f:extension[@url = 'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Verification']) &lt;= 1">extension with URL = 'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Verification': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'http://nictiz.nl/fhir/StructureDefinition/Comment']) &lt;= 1">extension with URL = 'http://nictiz.nl/fhir/StructureDefinition/Comment': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Treatment']) &lt;= 1">extension with URL = 'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Treatment': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Consent/f:extension</sch:title>
    <sch:rule context="f:Consent/f:extension">
      <sch:assert test="count(f:extension[@url = 'Verified']) &lt;= 1">extension with URL = 'Verified': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'VerifiedWith']) &lt;= 1">extension with URL = 'VerifiedWith': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:extension[@url = 'VerificationDate']) &lt;= 1">extension with URL = 'VerificationDate': maximum cardinality of 'extension' is 1</sch:assert>
      <sch:assert test="count(f:value[x]) &lt;= 1">value[x]: maximum cardinality of 'value[x]' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Consent/f:consentingParty</sch:title>
    <sch:rule context="f:Consent/f:consentingParty">
      <sch:assert test="count(f:extension[@url = 'http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference']) &lt;= 1">extension with URL = 'http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Consent/f:actor/f:reference</sch:title>
    <sch:rule context="f:Consent/f:actor/f:reference">
      <sch:assert test="count(f:extension[@url = 'http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference']) &lt;= 1">extension with URL = 'http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Consent/f:except</sch:title>
    <sch:rule context="f:Consent/f:except">
      <sch:assert test="count(f:extension[@url = 'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Restrictions']) &lt;= 1">extension with URL = 'http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective-Restrictions': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
  <sch:pattern>
    <sch:title>f:Consent/f:except/f:actor/f:reference</sch:title>
    <sch:rule context="f:Consent/f:except/f:actor/f:reference">
      <sch:assert test="count(f:extension[@url = 'http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference']) &lt;= 1">extension with URL = 'http://nictiz.nl/fhir/StructureDefinition/practitionerrole-reference': maximum cardinality of 'extension' is 1</sch:assert>
    </sch:rule>
  </sch:pattern>
</sch:schema>
