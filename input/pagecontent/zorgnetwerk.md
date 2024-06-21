<div style="margin: 5px; padding: 10px; color: #3c763d; background-color: #dff0d8; border: 4px solid black;">
<b>Dit is een RIVO Architecten Overleg onderwerp en uitwerking.</b>
</div>

### Inzage zorgnetwerk?

Inzage in het zorgnetwerk van een patiënt/cliënt binnen het zorgdomein.

### Fasering

1. Doordat de arts in de informatie kijkt in de Zorgviewer
1. Overzicht afleiden en presenteren uit beschikbare informatie Zorgviewer
1. Zorgteam bijhouden irt Behandelplan

#### 1 Huidige situatie

#### 2 Afleiden uit beschikbare informatie

In onderstaande tabel staat een overzicht van gegevens die mogelijk het zorgnetwerk voor een patient vormen. 
Zowel de bron in de zib als de bron in FHIR, waar soms meer in staat dan in de zib.
De laatste 4 kolommen (Zorgviewer, Epic, Zorgplatform, Nexus) geeft per systeem aan of dat gegeven via FHIR beschikbaar is (Persoon, Zorginstelling, Contactdatums). De 3 legenda waarden gaan over beschikbaarheid van de gegevens. '111' betekent dat het gegeven in de kolom Persoon, Zorginstellen als Contactdatums beschikbaar is.

Legenda: '-' = nvt, '0' = gegeven niet beschikbaar, '1' gegeven beschikbaar, '?' = nog uitzoeken

<table border="1" cellpadding="5">
<tr><th>Zib / FHIR</th>
<th>Persoon</th>
<th>Zorginstelling</th>
<th>Contactdatums</th>
<th>Zorgviewer</th>
<th>Epic</th>
<th>Zorgplatform</th>
<th>Nexus</th></tr>
<tr><td>Patient / Patient</td>
<td></td>
<td></td>
<td></td>
<td>1--</td>
<td>1--</td>
<td>1--</td>
<td>1--</td></tr>
<tr><td>Relaties niet in Patient zib</td>
<td>Huisarts / Patient.generalPractitioner (Pract)</td>
<td>Houder van het dossier / Patient.managingOrganization (Org) 
</td>
<td>nvt</td>
<td>00-</td>
<td>11-</td>
<td>11-</td>
<td>11-</td></tr>
<tr><td>ContactPersoon / Patient.contact</td>
<td>e.g. wife / Patient.contact</td>
<td>nvt</td>
<td>nvt</td>
<td>0--</td>
<td>1--</td>
<td>1--</td>
<td>1--</td>
</tr><tr><td>
Problemen / Condition 
</td>
<td>
Diagnosesteller 

Condition.asserter (Practitioner) 
</td>
<td></td>
<td>
Diagnosestelling 

Condition.assertedDate 
</td>
<td>0-0</td>
<td>0-1</td>
<td>1-1</td>
<td>0-0</td></tr>
<tr><td>Verrichtingen / Procedure</td>
<td>Procedure.performer (Practitioner)</td>
<td>
Procedure.performer (Location) 

(N.B. Epic/ZP use Performer.location) 
</td>
<td>Procedure.performedDateTime</td>
<td>111</td>
<td>111</td>
<td>111</td>
<td>111</td></tr>
<tr><td>VG Procedure (special case)</td>
<td>Procedure.performer (Practitioner)</td>
<td>Procedure.performer (Location)</td>
<td>Procedure.performedDateTime</td>
<td>111</td>
<td>001</td>
<td>???</td>
<td>???</td></tr>
<tr><td>
Contact / Encounter 
</td>
<td>
Met 

Encounter.participant.individual (Practitioner) 
</td>
<td>
Locatie 

Encounter.serviceProvider (Organization) 

(Epic uses Encounter.location) 

UMCGheeft ook nog afdeling als 2de locatie! 
</td>
<td>Encounter.period</td>
<td>000</td>
<td>111</td>
<td>111</td>
<td>111</td></tr>
</table>