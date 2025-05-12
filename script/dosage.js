// /home/michael/eclipse-workspace/zorgviewer-ig/script/dosage.js

/**
 * Converts a FHIR Dosage resource into a human-readable string.
 * 
 * This function takes into account all cardinalities of the FHIR Dosage resource
 * and generates a comprehensive human-readable representation of the dosage.
 * It handles various properties such as `text`, `timing`, `doseAndRate`, `route`,
 * `method`, `additionalInstruction`, `patientInstruction`, `asNeededBoolean`,
 * `asNeededCodeableConcept`, and `site`. If no dosage information is available,
 * it returns a default message.
 * 
 * @param {Object} dosage - The FHIR Dosage resource.
 * @returns {string} - A human-readable representation of the dosage.
 * 
 * @throws {Error} Throws an error if the provided dosage object is invalid.
 * 
 * @example
 * const dosage = {
 *   text: "Take 1 tablet daily",
 *   timing: {
 *     repeat: {
 *       frequency: 1,
 *       period: 1,
 *       periodUnit: "d"
 *     }
 *   },
 *   doseAndRate: [
 *     {
 *       doseQuantity: {
 *         value: 1,
 *         unit: "tablet"
 *       }
 *     }
 *   ]
 * };
 * 
 * const result = dosageToHumanReadable(dosage);
 * console.log(result); // Output: "Take 1 tablet daily. Take 1 time(s) every 1 d(s). Dose 1: 1 tablet."
 * 
 * @note This code was generated based on the following prompt:
 * "generate code for a node.js module with a function that converts a FHIR Dosage into a human readable string. Take all cardinalities into account."
 */
function dosageToString(dosage) {
    if (!dosage || typeof dosage !== 'object') {
        throw new Error('Ongeldig doseringsobject');
    }

    let narrative = '';

    if (dosage.text) {
        narrative += dosage.text;
    } else {
        if (dosage.timing && dosage.timing.repeat) {
            const repeat = dosage.timing.repeat;
            if (repeat.frequency && repeat.period && repeat.periodUnit) {
                const periodeEenheidTekst = repeat.periodUnit === 's' ? 'seconde' + (repeat.period > 1 ? 'n' : '') :
                    repeat.periodUnit === 'min' ? 'minuut' + (repeat.period > 1 ? 'n' : '') :
                        repeat.periodUnit === 'h' ? 'uur' + (repeat.period > 1 ? 'n' : '') :
                            repeat.periodUnit === 'd' ? 'dag' + (repeat.period > 1 ? 'en' : '') :
                                repeat.periodUnit === 'wk' ? 'week' + (repeat.period > 1 ? 'en' : '') :
                                    repeat.periodUnit === 'mo' ? 'maand' + (repeat.period > 1 ? 'en' : '') :
                                        repeat.periodUnit === 'a' ? 'jaar' + (repeat.period > 1 ? 'en' : '') :
                                            repeat.periodUnit || "";
                narrative += `${repeat.frequency}x per ${repeat.period} ${periodeEenheidTekst}. `;
            }
            if (repeat.timeOfDay) {
                narrative += ` om ${repeat.timeOfDay.join(", ")}`;
            }
            // Nexus has empty boundsDurations which is not allowed; check for that
            if (repeat.boundsDuration && repeat.boundsDuration.value && repeat.boundsDuration.unit) {
                narrative += `Duur: ${repeat.boundsDuration.value} ${repeat.boundsDuration.unit}. `;
            }
            if (repeat.boundsRange) {
                narrative += `Van ${repeat.boundsRange.low.value} ${repeat.boundsRange.low.unit} tot ${repeat.boundsRange.high.value} ${repeat.boundsRange.high.unit}. `;
            }
            if (repeat.boundsPeriod) {
                narrative += `Van ${repeat.boundsPeriod.start} tot ${repeat.boundsPeriod.end}. `;
            }
        }

        if (dosage.doseAndRate && Array.isArray(dosage.doseAndRate)) {
            dosage.doseAndRate.forEach((dose, index) => {
                if (dose.doseQuantity) {
                    narrative += `Dosis ${index + 1}: ${dose.doseQuantity.value} ${dose.doseQuantity.unit}. `;
                }
                if (dose.rateQuantity) {
                    narrative += `Snelheid ${index + 1}: ${dose.rateQuantity.value} ${dose.rateQuantity.unit}. `;
                }
                if (dose.rateRange) {
                    narrative += `Snelheid ${index + 1}: Van ${dose.rateRange.low.value} ${dose.rateRange.low.unit} tot ${dose.rateRange.high.value} ${dose.rateRange.high.unit}. `;
                }
            });
        }

        // Is already separate column
        // if (dosage.route && dosage.route.coding && Array.isArray(dosage.route.coding)) {
        //     const route = dosage.route.coding[0];
        //     result += `Route: ${route.display || route.code}. `;
        // }

        if (dosage.method && dosage.method.coding && Array.isArray(dosage.method.coding)) {
            const method = dosage.method.coding[0];
            narrative += `Methode: ${method.display || method.code}. `;
        }

        if (dosage.additionalInstruction && Array.isArray(dosage.additionalInstruction)) {
            dosage.additionalInstruction.forEach((instruction, index) => {
                if (instruction.text) {
                    narrative += `\nAanvullende instructie ${index + 1}: ${instruction.text}. `;
                }
            });
        }

        if (dosage.patientInstruction) {
            narrative += `\nInstructie voor patiënt: ${dosage.patientInstruction}. `;
        }

        if (dosage.asNeededBoolean !== undefined) {
            narrative += `\nIndien nodig: ${dosage.asNeededBoolean ? 'Ja' : 'Nee'}. `;
        }

        if (dosage.asNeededCodeableConcept && dosage.asNeededCodeableConcept.coding && Array.isArray(dosage.asNeededCodeableConcept.coding)) {
            const asNeeded = dosage.asNeededCodeableConcept.coding[0];
            narrative += `\nIndien nodig voor: ${asNeeded.display || asNeeded.code}. `;
        }

        if (dosage.site && dosage.site.coding && Array.isArray(dosage.site.coding)) {
            const site = dosage.site.coding[0];
            narrative += `Toedieningsplaats: ${site.display || site.code}. `;
        }
    }

    return narrative.trim() || 'Geen doseringsinformatie beschikbaar.';
}

// Gemini code
function dosageToStringGemini(dosage) {
    if (!dosage) {
        return "Doseringinformatie niet beschikbaar.";
    }

    if (dosage.text) {
        return dosage.text;
    }

    let narrative = "";
    const doseAndRateBeschrijvingen = [];

    if (dosage.doseAndRate && dosage.doseAndRate.length > 0) {
        dosage.doseAndRate.forEach((dr) => {
            let drBeschrijving = "";
            if (dr.doseQuantity) {
                drBeschrijving += `${dr.doseQuantity.value} ${dr.doseQuantity.unit}`;
            } else if (dr.doseRange) {
                drBeschrijving += `${dr.doseRange.low.value} - ${dr.doseRange.high.value} ${dr.doseRange.low.unit}`;
            }

            if (dr.rateRatio) {
                drBeschrijving += ` met een snelheid van ${dr.rateRatio.numerator.value} ${dr.rateRatio.numerator.unit} per ${dr.rateRatio.denominator.value} ${dr.rateRatio.denominator.unit}`;
            } else if (dr.rateQuantity) {
                drBeschrijving += ` met een snelheid van ${dr.rateQuantity.value} ${dr.rateQuantity.unit}`;
            } else if (dr.rateRange) {
                drBeschrijving += ` met een snelheid van ${dr.rateRange.low.value} - ${dr.rateRange.high.value} ${dr.rateRange.low.unit}`;
            }
            doseAndRateBeschrijvingen.push(drBeschrijving);
        });
        narrative += doseAndRateBeschrijvingen.join(" en ");
    }

    // if (dosage.route && dosage.route.text) {
    //     beschrijving += ` via ${dosage.route.text}`;
    // } else
    if (dosage.site && dosage.site.text) {
        narrative += ` op de ${dosage.site.text}`;
    }

    if (dosage.method && dosage.method.text) {
        narrative += ` met behulp van ${dosage.method.text}`;
    }

    if (dosage.timing && dosage.timing.repeat) {
        const repeat = dosage.timing.repeat;
        const frequentieTekst = repeat.frequency ? `${repeat.frequency}x` : "";
        const periodeTekst = repeat.period ? `elke ${repeat.period}` : "";
        const periodeEenheidTekst = repeat.periodUnit === 's' ? 'seconde' + (repeat.period > 1 ? 'n' : '') :
            repeat.periodUnit === 'min' ? 'minuut' + (repeat.period > 1 ? 'n' : '') :
                repeat.periodUnit === 'h' ? 'uur' + (repeat.period > 1 ? 'n' : '') :
                    repeat.periodUnit === 'd' ? 'dag' + (repeat.period > 1 ? 'en' : '') :
                        repeat.periodUnit === 'wk' ? 'week' + (repeat.period > 1 ? 'en' : '') :
                            repeat.periodUnit === 'mo' ? 'maand' + (repeat.period > 1 ? 'en' : '') :
                                repeat.periodUnit === 'a' ? 'jaar' + (repeat.period > 1 ? 'en' : '') :
                                    repeat.periodUnit || "";

        let tijdstipTekst = "";
        if (repeat.timeOfDay && repeat.timeOfDay.length > 0) {
            tijdstipTekst = `om ${repeat.timeOfDay.join(" en ")}`;
        }

        let wanneerTekst = "";
        if (repeat.when && repeat.when.length > 0) {
            wanneerTekst = `(${repeat.when.join(", ")})`;
        }

        const herhaalTekstDelen = [frequentieTekst, periodeTekst, periodeEenheidTekst, tijdstipTekst, wanneerTekst].filter(Boolean).join(" ");
        if (herhaalTekstDelen) {
            narrative += ` ${herhaalTekstDelen}`;
        }
    }

    if (dosage.asNeededBoolean === true) {
        narrative += ", indien nodig";
    } else if (dosage.asNeededCodeableConcept && dosage.asNeededCodeableConcept.text) {
        narrative += `, indien nodig (${dosage.asNeededCodeableConcept.text})`;
    }

    const maxDosisTeksten = [];
    if (dosage.maxDosePerPeriod) {
        maxDosisTeksten.push(`maximaal ${dosage.maxDosePerPeriod.numerator.value} ${dosage.maxDosePerPeriod.numerator.unit} per ${dosage.maxDosePerPeriod.denominator.value} ${dosage.maxDosePerPeriod.denominator.unit}`);
    }
    if (dosage.maxDosePerAdministration) {
        maxDosisTeksten.push(`maximaal ${dosage.maxDosePerAdministration.value} ${dosage.maxDosePerAdministration.unit} per toediening`);
    }
    if (dosage.maxDosePerLifetime) {
        maxDosisTeksten.push(`maximaal ${dosage.maxDosePerLifetime.value} ${dosage.maxDosePerLifetime.unit} in totaal`);
    }
    if (maxDosisTeksten.length > 0) {
        narrative += `. Maximale dosering: ${maxDosisTeksten.join(", ")}`;
    }

    if (dosage.patientInstruction) {
        narrative += `\nInstructies voor de patiënt: ${dosage.patientInstruction}`;
    }

    if (dosage.additionalInstruction) {
        dosage.additionalInstruction.forEach((instruction, index) => {
            if (instruction.text) {
                narrative += `\nAanvullende instructie ${index + 1}: ${instruction.text}. `;
            }
        });
    }

    return narrative;
}

module.exports = {
    dosageToString,
    dosageToStringGemini
};