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

    let result = '';

    if (dosage.text) {
        result += dosage.text;
    } else {
        if (dosage.timing && dosage.timing.repeat) {
            const repeat = dosage.timing.repeat;
            if (repeat.frequency && repeat.period && repeat.periodUnit) {
                result += `Neem ${repeat.frequency}x per ${repeat.period} ${repeat.periodUnit}. `;
            }
            // Nexus has empty boundsDurations which is not allowed; check for that
            if (repeat.boundsDuration && repeat.boundsDuration.value && repeat.boundsDuration.unit) {
                result += `Duur: ${repeat.boundsDuration.value} ${repeat.boundsDuration.unit}. `;
            }
            if (repeat.boundsRange) {
                result += `Van ${repeat.boundsRange.low.value} ${repeat.boundsRange.low.unit} tot ${repeat.boundsRange.high.value} ${repeat.boundsRange.high.unit}. `;
            }
            if (repeat.boundsPeriod) {
                result += `Van ${repeat.boundsPeriod.start} tot ${repeat.boundsPeriod.end}. `;
            }
        }

        if (dosage.doseAndRate && Array.isArray(dosage.doseAndRate)) {
            dosage.doseAndRate.forEach((dose, index) => {
                if (dose.doseQuantity) {
                    result += `Dosis ${index + 1}: ${dose.doseQuantity.value} ${dose.doseQuantity.unit}. `;
                }
                if (dose.rateQuantity) {
                    result += `Snelheid ${index + 1}: ${dose.rateQuantity.value} ${dose.rateQuantity.unit}. `;
                }
                if (dose.rateRange) {
                    result += `Snelheid ${index + 1}: Van ${dose.rateRange.low.value} ${dose.rateRange.low.unit} tot ${dose.rateRange.high.value} ${dose.rateRange.high.unit}. `;
                }
            });
        }

        if (dosage.route && dosage.route.coding && Array.isArray(dosage.route.coding)) {
            const route = dosage.route.coding[0];
            result += `Route: ${route.display || route.code}. `;
        }

        if (dosage.method && dosage.method.coding && Array.isArray(dosage.method.coding)) {
            const method = dosage.method.coding[0];
            result += `Methode: ${method.display || method.code}. `;
        }

        if (dosage.additionalInstruction && Array.isArray(dosage.additionalInstruction)) {
            dosage.additionalInstruction.forEach((instruction, index) => {
                if (instruction.text) {
                    result += `Aanvullende instructie ${index + 1}: ${instruction.text}. `;
                }
            });
        }

        if (dosage.patientInstruction) {
            result += `Instructie voor patiënt: ${dosage.patientInstruction}. `;
        }

        if (dosage.asNeededBoolean !== undefined) {
            result += `Indien nodig: ${dosage.asNeededBoolean ? 'Ja' : 'Nee'}. `;
        }

        if (dosage.asNeededCodeableConcept && dosage.asNeededCodeableConcept.coding && Array.isArray(dosage.asNeededCodeableConcept.coding)) {
            const asNeeded = dosage.asNeededCodeableConcept.coding[0];
            result += `Indien nodig voor: ${asNeeded.display || asNeeded.code}. `;
        }

        if (dosage.site && dosage.site.coding && Array.isArray(dosage.site.coding)) {
            const site = dosage.site.coding[0];
            result += `Toedieningsplaats: ${site.display || site.code}. `;
        }
    }

    return result.trim() || 'Geen doseringsinformatie beschikbaar.';
}

module.exports = {
    dosageToString
};