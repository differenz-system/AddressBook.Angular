import { FormControl, Validators, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Observable } from 'rxjs';

export function matchValidator(fieldName: string) {
    let fcfirst: FormControl;
    let fcSecond: FormControl;
    return function matchValidator(control: FormControl) {

        if (!control.parent) {
            return null;
        }
        // INITIALIZING THE VALIDATOR.
        if (!fcfirst) {
            //INITIALIZING FormControl first
            fcfirst = control;
            fcSecond = control.parent.get(fieldName) as FormControl;

            //FormControl Second
            if (!fcSecond) {
                throw new Error('matchValidator(): Second control is not found in the parent group!');
            }

            fcSecond.valueChanges.subscribe(() => {
                fcfirst.updateValueAndValidity();
            });
        }
        if (!fcSecond) {
            return null;
        }
        if (fcSecond.value !== fcfirst.value) {
            return {
                matchOther: true
            };
        }

        return null;
    }
}

@Directive({
    selector: '[PasswordFormat]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordFormatValidatorDirective, multi: true }]
})
export class PasswordFormatValidatorDirective implements Validator {
    validate(c: FormControl): ValidationErrors {
        const isValid = /^(?=.*[A-z0-9])\S{8,}$/.test(c.value); // /^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@])(?!.*[iIoO])\S{6,12}$/
        const message = {
            'PasswordFormat': {
                'message': 'min 8 characters'
            }
        };
        return isValid ? null : message;
    }
}

export class EmailValidator {
    static mailFormat(control: FormControl): ValidationResult {
        var EMAIL_REGEXP = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (control.value != null && control.value != "") {
            if (!EMAIL_REGEXP.test(control.value)) {
                return { "IsInValid": true };
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
}

export class PhoneNumberValidator {
    static phoneFormat(control: FormControl): ValidationResult {
       // var PHONE_REGEXP = new RegExp(/([0-9]{10,16})|(\([0-9]{10,16}\)\s+[0-9]{3}\-[0-9]{4})/);
        //var PHONE_REGEXP = new RegExp(/^\+(?:[0-9]●?){9,15}[0-9]$/);
        var PHONE_REGEXP = new RegExp(/^[0-9\-\+]{10,15}$/);
        if (control.value != null && control.value != "") {
            if (!PHONE_REGEXP.test(control.value)) {
                return { "IsInValid": true };
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
}

export class PasswordValidator {
    static passwordFormat(control: FormControl): ValidationResult {
        //var PASSWORD_REGEXP = new RegExp(/^(?=.[A-z])\S{8,}$/);
        //if (control.value != null && control.value != "") {
        //    if (!PASSWORD_REGEXP.test(control.value)) {
        //        return { "IsInValid": true };
        //    }
        //    else {
        //        return null;
        //    }
        //}
        //else {
        //    return null;
        //}
        if (control.value != null && control.value != "") {
            if (control.value.trim() == "" || control.value.trim().length < 8) {
                return { "IsInValid": true };
            }
        }
        return null
    }
}


interface ValidationResult {
    [key: string]: boolean;
}
export function ValidateUrl(control: FormControl) {
    if (control.value.toString().trim() != "") {
        if (!control.value.startsWith('https') || !control.value.startsWith('http')) {
            return { validUrl: true };
        }
    }
    return null;
}

export class NumericValidator {
    static numberFormat(control: FormControl): ValidationResult {
        var NUMBER_REGEXP = new RegExp(/^([1-9][0-9]*)$/);
        if (control.value != null && control.value != "") {
            if (!NUMBER_REGEXP.test(control.value)) {
                return { "IsInValid": true };
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
}
export class DecimalValidatorPromise {
    static decimalFormat(control: FormControl) {
        return new Promise((resolve) => {
            setTimeout(() => {
                var NUMBER_REGEXP = new RegExp(/[1-9]+(\.[0-9][0-9]?)?/);
                if (control.value != null && control.value != '' && control.value != undefined && control.value.toString() != '') {
                    if (!NUMBER_REGEXP.test(control.value)) {
                        return resolve({ "IsDecimal": true });
                    }
                    else {
                        return resolve(null);
                    }
                }
                else {
                    return resolve(null);
                }
            }, 1000);
        })
    }
}
export class DecimalValidator {
    static decimalFormat(control: FormControl): ValidationResult {
        var NUMBER_REGEXP = new RegExp(/[1-9]+(\.[0-9][0-9]?)?/);
        if (control.value != null && control.value != '' && control.value != undefined && control.value.toString() != '') {
            if (!NUMBER_REGEXP.test(control.value)) {
                return { "IsDecimal": false };
            }
            else if (control.value.split != undefined && control.value.split(".").length > 2)
            {
                return { "IsDecimal": false };
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
}
export class WhitespaceValidatorPromise {
    static noWhitespaceValidator(control: FormControl) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (control.value != null && control.value != '' && control.value != undefined && control.value.toString() != '') {
                    let isWhitespace = (control.value || '').trim().length === 0;
                    let isValid = !isWhitespace;
                    return isValid ? null : { 'whitespace': true }
                }
                return null;
            }, 1000);
        })
    }
}

export class WhitespaceValidator {
    static noWhitespaceValidator(control: FormControl): ValidationResult {
        if (control.value != null && control.value != '' && control.value != undefined && control.value.toString() != '') {
            let isWhitespace = (control.value || '').trim().length === 0;
            let isValid = !isWhitespace;
            return isValid ? null : { 'whitespace': true }
        }
        return null;
    }
}