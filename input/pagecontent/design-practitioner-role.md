<div class="dragon" markdown="1">
*TODO: uitleggen hoe de verschillende artifacten rondom practitioner role (ValueSet-SubjectRoleCodelist, ConceptMap-epic-rolcode, ConceptMap-rolcodenl, ConceptMap-sanday) en designs (Autorisatie, Logging, Toestemming) samenhangen en worden gebruikt in autorisatie, toestemming en logging.*

[Internal Wiki](https://dev.azure.com/UMCG-MIT/Zorgviewer/_wiki/wikis/Zorgviewer.wiki/7884/Gebruikerscontext)
</div>

Statements:
* Binnen Zorgviewer hebben we bij voorkeur als codering voor PractitionerRole.code de SNOMED CT beroepen - [ValueSet-SubjectRoleCodelist](https://build.fhir.org/ig/RIVO-Noord/zorgviewer-ig/ValueSet-SubjectRoleCodelist.html)
    * en de (UZI) RolcodeNL erbij: [Nictiz R4 Zib2020 | RoleCodeNLZorgverlenertypen - SIMPLIFIER.NET](https://simplifier.net/nictiz-r4-zib2020/uzi-rolcode)
* Deze zijn niet altijd zo gecodeer in bronsystemen, daarom hier mappings:
    * [Epic -> SCT](ConceptMap-epic-rolcode.html)
    * [Nexus -> SCT](ConceptMap-rolcodenl.html)
    * [Sanday -> SCT](ConceptMap-sanday.html)

<div>
{% include img.html img="gebruikerscontext.png" width="70%" %}
</div>