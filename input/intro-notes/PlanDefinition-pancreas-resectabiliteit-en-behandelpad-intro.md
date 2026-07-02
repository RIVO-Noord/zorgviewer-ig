Dit zorgpad beschrijft een ECA-regel (Event-Condition-Action) voor de computable deelverzameling van het Regionaal Zorgpad Pancreastumoren: resectabiliteitsclassificatie, biliaire drainage-indicatie en doorlooptijd-streefnormen.
Zie de [zorgpad narratief pagina](zorgpad-pancreastumoren.html) voor een volledige beschrijving, inclusief de onderdelen die bewust buiten scope blijven.

### FHIR Resources

| Resource | Beschrijving |
|---|---|
| [PlanDefinition](PlanDefinition-pancreas-resectabiliteit-en-behandelpad.html) | ECA-regel met stappen en resectabiliteits-/drainageconditie |
| [Library](Library-pancreas-resectabiliteit-en-drainage.html) | CQL-logica voor resectabiliteitsclassificatie en ERCP-indicatie |
| [ActivityDefinition CT-abdomen](ActivityDefinition-pancreas-ct-abdomen-pancreasprotocol.html) | Radiologische stadiëring |
| [ActivityDefinition MRI](ActivityDefinition-pancreas-mri-pancreasprotocol.html) | Aanvullende MRI |
| [ActivityDefinition EUS-FNB](ActivityDefinition-pancreas-eus-fnb.html) | Pathologische bevestiging |
| [ActivityDefinition ERCP](ActivityDefinition-pancreas-ercp-biliaire-drainage.html) | Biliaire drainage |
| [ActivityDefinition PTCD](ActivityDefinition-pancreas-ptcd.html) | Biliaire drainage, alternatief bij falen ERCP |
| [ActivityDefinition EUS-galwegdrainage](ActivityDefinition-pancreas-eus-galwegdrainage.html) | Biliaire drainage, alternatief bij falen ERCP (palliatief, expertcentrum) |
| [ActivityDefinition systeemtherapie inductie](ActivityDefinition-pancreas-systeemtherapie-inductie.html) | Inductie-systeemtherapie |
| [ActivityDefinition systeemtherapie adjuvant](ActivityDefinition-pancreas-systeemtherapie-adjuvant.html) | Adjuvante systeemtherapie na resectie |
| [ActivityDefinition systeemtherapie palliatief](ActivityDefinition-pancreas-systeemtherapie-palliatief.html) | Systeemtherapie bij irresectabel/gemetastaseerd pancreascarcinoom (documentair) |
| [ActivityDefinition resectie](ActivityDefinition-pancreas-resectie.html) | Operatieve resectie |
| [ActivityDefinition postoperatieve follow-up](ActivityDefinition-pancreas-postoperatieve-follow-up.html) | Postoperatief follow-upschema |

### Resectabiliteitscategorieën

De categorisering (conform Tabel 4, Dutch Pancreatic Cancer Group) is gedefinieerd in [CQL](Library-pancreas-resectabiliteit-en-drainage.html):

* **Resectabel**: geen contact (arterieel) en ≤ 90° contact (veneus)
* **Borderline resectabel**: ≤ 90° contact (arterieel) of 90°-270° contact zonder occlusie (veneus)
* **Lokaal gevorderd**: > 90° contact (arterieel) of > 270° contact/occlusie (veneus)
