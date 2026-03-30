<div class="dragon" markdown="1">
*TODO: uitleggen hoe de verschillende artifacten rondom practitioner role (ValueSet-RoleCodelist, ConceptMap-epic-rolcode, ConceptMap-rolcodenl, ConceptMap-sanday-rolcode) en designs (Autorisatie, Logging, Toestemming) samenhangen en worden gebruikt in autorisatie, toestemming en logging.*

[Internal Wiki](https://dev.azure.com/UMCG-MIT/Zorgviewer/_wiki/wikis/Zorgviewer.wiki/7884/Gebruikerscontext)
</div>

### Statements

* Binnen Zorgviewer hebben we bij voorkeur als codering voor PractitionerRole.code de SNOMED CT beroepen - [ValueSet-RoleCodelist](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/ValueSet-RoleCodelist.html)
    * en de (UZI) RolcodeNL erbij: [Nictiz R4 Zib2020 RoleCodeNLZorgverlenertypen](https://simplifier.net/nictiz-r4-zib2020/uzi-rolcode)
* Deze zijn niet altijd zo gecodeer in bronsystemen, daarom hier mappings:
    * [Epic Provider Type -> SNOMED CT beroepen](ConceptMap-epic-rolcode.html)
    * Zorgplatform doet al SNOMED CT beroepen
    * [Sanday functie omschrijvingen -> SNOMED CT beroepen](ConceptMap-sanday-rolcode.html)
    * [Nexus en CGM RolCodeNL -> SNOMED CT beroepen](ConceptMap-rolcodenl.html)
    * VIPLive?

<div>
{% include img.html img="gebruikerscontext.png" width="70%" %}
</div>

// TODO: plaatje toelichten